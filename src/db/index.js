import mongoose from "mongoose";
import connect from "./connect";
import disconnect from "./disconnect";
import drop from "./drop";

mongoose.set("runValidators", true);
mongoose.set("returnOriginal", false);

export default { connect, disconnect, drop };
