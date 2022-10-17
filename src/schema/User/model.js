import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError, ForbiddenError } from "apollo-server-errors";
import config from "../../config";

const ROLES = {
  "": 0,
  ADMIN: 7, // read, write, exec
  CLIENT: 5 // read, exec
};
Object.freeze(ROLES);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    select: false
  },
  passwordModifiedAt: {
    type: String,
    default: Math.floor(Date.now() / 1000).toString(),
    select: false
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "CLIENT"],
    default: "CLIENT",
    set: (value) => value.toUpperCase()
  }
});

schema.virtual("passwordAgain");

/**
 * Hashes password on creation.
 */
schema.pre("save", async function (next) {
  const { password, passwordAgain } = this;
  if (password !== passwordAgain) {
    throw new AuthenticationError("Mismatching password/passwordAgain!");
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(password, 12);
    this.passwordModifiedAt = Math.floor(Date.now() / 1000).toString();
  }
  return next();
});

/**
 * Hashes password on update.
 */
schema.pre("findOneAndUpdate", async function (next) {
  const { newPassword, newPasswordAgain } = this._update;
  if (newPassword !== newPasswordAgain) {
    throw new AuthenticationError("Mismatching password/passwordAgain!");
  }
  this._update.password = await bcrypt.hash(newPassword, 12);
  this._update.passwordModifiedAt = Math.floor(Date.now() / 1000).toString();
  return next();
});

const _getTokenPayload = async (token) => {
  const payload = await jwt.verify(token, config.jwtSecret);
  if (!payload) throw new AuthenticationError("Invalid token signature!");
  return payload;
};

/**
 * Returns user or throws an `AuthenticationError` if:
 *   - `token` is falsy, invalid or expired
 *   - userId is different from token id
 */
schema.statics.authenticate = async function (token, userId) {
  if (!token) throw new AuthenticationError("Not logged in!");

  // is token valid?
  const { id, iat } = await _getTokenPayload(token);

  // is token id valid?
  const user = await this.findById(id).select("+passwordModifiedAt");
  if (!user) throw new AuthenticationError("Token belongs to nonexistent user!");

  // is token id same as userId?
  if (userId !== id) throw new AuthenticationError("Not logged in as owning user!");

  // is token password current?
  const tokenIssuedAt = new Date(parseInt(iat, 10) * 1000);
  const passwordModifiedAt = new Date(parseInt(user.passwordModifiedAt, 10) * 1000);
  const isTokenUpToDate = tokenIssuedAt.getTime() > passwordModifiedAt.getTime();
  if (!isTokenUpToDate) throw new AuthenticationError("Token expired!");

  return user;
};

/**
 * Throws a `ForbiddenError` if `userRole` does not meet `requiredRole`.
 */
schema.statics.authorize = async function (token, requiredRole) {
  if (!token) throw new AuthenticationError("Not logged in!");
  const { role } = await _getTokenPayload(token);
  if (ROLES[role] < ROLES[requiredRole.toUpperCase()]) {
    throw new ForbiddenError(`${requiredRole} privileges required!`);
  }
};

/**
 * Validates name/password combination and returns a jwt.
 *
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @param {string} expiresIn - Time until JWT expiration (e.g. 1h).
 * @returns {Promise<Object>} - JWT with `id` and `role` payload.
 */
schema.statics.login = async function (name, password, expiresIn = config.jwtExpiresIn) {
  const user = await this.findOne({ name }).select("+password");
  if (!user) throw new AuthenticationError("User does not exist!");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AuthenticationError("Invalid credentials!");
  const token = await jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn });
  return { user, token };
};

export default mongoose.model("User", schema);
