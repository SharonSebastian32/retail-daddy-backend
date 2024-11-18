import {
  createInvoice,
  getAllInvoices,
} from "../controllers/invoice.controller.js"; // Ensure the path is correct
import { Router } from "express";

const router = Router();
router.post("/", createInvoice);
router.get("/", getAllInvoices);

export default router;
