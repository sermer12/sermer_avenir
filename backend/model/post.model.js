const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const postSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    place: {
      type: String,
      required: true,
      maxlength: 100,
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1500,
    },
    document_pdf: {
      type: String,
    },
    heure: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
