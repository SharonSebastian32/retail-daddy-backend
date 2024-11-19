import {
  createInvoice,
  getAllInvoices,
  deleteInvoice,
} from "../controllers/invoice.controller.js"; // Ensure the path is correct
import { Router } from "express";

const router = Router();
router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.delete("/:id", deleteInvoice);

export default router;
