import mongoose from "mongoose";

/**
 * Drops active mongoDB.
 *
 * @param {Function} callback - Callback to execute on drop.
 * @returns {void}
 */
const drop = (callback = undefined) => mongoose.connection.db.dropDatabase(callback);

export default drop;
