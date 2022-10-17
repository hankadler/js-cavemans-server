import mongoose from "mongoose";

/**
 * Disconnects from mongoDB.
 *
 * @param {Function} callback - Callback to execute on disconnect.
 * @returns {void}
 */
const disconnect = (callback = undefined) => mongoose.disconnect(callback);

export default disconnect;
