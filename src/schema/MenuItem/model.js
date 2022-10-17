import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["FOOD", "SIDE", "SAUCE", "DRINK", "DESSERT"],
    required: true,
    set: (value) => value?.toUpperCase()
  },

  image: {
    type: String,
    default: ""
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    maxLength: 300
  },

  price: {
    type: Number,
    required: true
  }
});

export default mongoose.model("MenuItem", schema);
