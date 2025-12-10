const mongoose = require("mongoose");

const freeTicketSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FreeTicket", freeTicketSchema);
