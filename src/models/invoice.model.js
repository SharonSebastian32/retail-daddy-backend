import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Fruits", "Vegetables", "Stationaries"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: ["Calicut", "Malappuram", "Thrissur"],
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
