import { Router } from "express";
import invoiceController from "../controller/invoices/invoices.controller";

const router = Router();

router.get("/", invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoice);
router.post("/", invoiceController.generateInvoice);
router.put("/", invoiceController.updateInvoice);
router.delete("/:id", invoiceController.deleteInvoice);

export default router;
