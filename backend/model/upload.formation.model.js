const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const uploadFormationSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("upload_formation", uploadFormationSchema);
