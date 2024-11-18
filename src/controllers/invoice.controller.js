import Invoice from "../models/invoice.model.js";

export const createInvoice = async (req, res) => {
  try {
    const { itemCode, itemName, category, quantity, rate, location } = req.body;

    if (
      !itemCode ||
      !itemName ||
      !category ||
      !quantity ||
      !rate ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if itemCode already exists
    const existingInvoice = await Invoice.findOne({ itemCode });
    if (existingInvoice) {
      return res.status(400).json({
        message: "An invoice with this ItemCode already exists.",
      });
    }

    // Create a new invoice document
    const invoice = new Invoice({
      itemCode,
      itemName,
      category,
      quantity,
      rate,
      location,
    });

    const savedInvoice = await invoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      data: savedInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the invoice",
      error: error.message,
    });
  }
};

//getall products

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({
        message: "No invoices found.",
      });
    }

    res.status(200).json({
      message: "Invoices retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving invoices",
      error: error.message,
    });
  }
};
