import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
let app = express();
app.use(
  cors({
    origin: "*", // Allows all origins
    credentials: true, // Optional, enables credentials sharing (cookies, Authorization headers, etc.)
  })
);
app.use(morgan("dev"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import healthcheckRouter from "./routes/healthcheck.routes.js";
import invoiceRouter from "./routes/invoice.routes.js";
import {
  getAllInvoices,
  deleteInvoice,
  createInvoice,
  updateInvoice,
} from "./controllers/invoice.controller.js";

//routes declaration
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/invoices/create", createInvoice);
app.use("/api/v1/invoices/getall", getAllInvoices);
app.use("/api/v1/invoices/delete/:id", deleteInvoice);
app.use("/api/v1/invoices/update/:id", updateInvoice);

export { app };
