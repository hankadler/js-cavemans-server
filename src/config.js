import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// do not edit without looking at `../.env` first

const srcDir = dirname(fileURLToPath(import.meta.url));
const testDir = resolve(`${srcDir}/../test`);
const env = process.env.ENV || "development";
const app = process.env.APP || "app";
const db = {
  name: env.startsWith("prod")
    ? app
    : env.startsWith("dev")
      ? `${app}-dev`
      : `${app}-test`
};
db.uri = `${process.env.MONGO_DB_URI}/${db.name}?retryWrites=true&w=majority`;
const {
  JWT_SECRET: jwtSecret,
  JWT_EXPIRES_IN: jwtExpiresIn,
  ADMIN_PASS: adminPass,
  DOMAIN: domain
} = process.env;

export default {
  srcDir,
  testDir,
  env,
  app,
  db,
  jwtSecret,
  jwtExpiresIn,
  adminPass,
  domain
};
