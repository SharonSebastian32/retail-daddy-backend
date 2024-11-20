import Invoice from "../models/invoice.model.js";
//http://localhost:3000/api/v1/invoices/create
//add stock to table
export const createInvoice = async (req, res, next) => {
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
        message: "An item with this ItemCode already exists.",
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
      message: "Stock Added successfully",
      data: savedInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the stock",
      error: error.message,
    });
  }
};
//http://localhost:3000/api/v1/invoices/getall
//getall stock
export const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({
        message: "No invoices found.",
      });
    }

    res.status(200).json({
      message: "Stock retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving stock",
      error: error.message,
    });
  }
};

//http://localhost:3000/api/v1/invoices/​67399c7e484867c102a12405
//delete stock by id
export const deleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Item not found on stock." });
    }
    res.status(200).json({
      message: "Iteme deleted from Stock",
      data: deletedInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the item",
      error: error.message,
    });
  }
};
//http://localhost:3000/api/v1/invoices/update/673d4731dd4e841c06a2becd
//update stock by id
export const updateInvoice = async (req, res, next) => {
  try {
    const { itemCode, itemName, category, quantity, rate, location } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Stock ID is required." });
    }

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
    const existingInvoice = await Invoice.findOne({
      itemCode,
      _id: { $ne: id },
    });

    if (existingInvoice) {
      return res
        .status(400)
        .json({ message: "Item code already exists in another Stock." });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { itemCode, itemName, category, quantity, rate, location },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res.status(200).json({
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the invoice",
      error: error.message,
    });
  }
};
