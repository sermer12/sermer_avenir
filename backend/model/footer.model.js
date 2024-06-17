const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const footer_editSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    adresse: {
      type: String,
    },
    postal_ville: {
      type: String,
    },
    name_contact: {
      type: String,
    },
    contact_role: {
      type: String,
    },
    phone: {
      type: String,
    },
    mail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("footer_edit", footer_editSchema);
