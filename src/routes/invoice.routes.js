import {
  createInvoice,
  getAllInvoices,
  deleteInvoice,
  updateInvoice,
} from "../controllers/invoice.controller.js"; // Ensure the path is correct
import { Router } from "express";

const router = Router();
router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.delete("/", deleteInvoice);
router.put("/", updateInvoice);

export default router;
