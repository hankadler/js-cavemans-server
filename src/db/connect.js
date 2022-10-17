import mongoose from "mongoose";

/**
 * Connects to mongoDB.
 *
 * @param {string} uri - A mongoDB connection string.
 * @returns {Promise} - A connection object.
 */
const connect = async (uri) => {
  const conn = await mongoose.connect(uri);
  const { host, port, name } = conn.connections[0];
  console.log(`mongodb://${host}:${port}/${name}`);
  return conn;
};

export default connect;
