import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();
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
import { getAllInvoices } from "./controllers/invoice.controller.js";

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/invoices/create", invoiceRouter);
app.use("/api/v1/invoices/getall", getAllInvoices);

export { app };
