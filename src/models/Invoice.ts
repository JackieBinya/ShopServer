import { Schema, model } from "mongoose";
import { InvoiceInterface } from "../interfaces/invoice.interface";
// 2. Create a Schema corresponding to the document interface.
const invoiceSchema = new Schema<InvoiceInterface>({
  amount: { type: Number, required: true },
  invoiceNumber: { type: Number, required: true },
  invoiceDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

const Invoice = model<InvoiceInterface>("Invoice", invoiceSchema);

export { Invoice };
