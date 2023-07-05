import { Request, Response } from "express";
import { Invoice } from "../../models/Invoice";

const generateInvoice = async (req: Request, res: Response) => {
  try {
    const { invoiceNumber, invoiceDate, amount } = req.body;

    if (!invoiceNumber || !invoiceDate || !amount) {
      return res.status(400).json({
        success: false,
        error: "Missing fields!"
      });
    }

    // TODO Fix invoice date its currently written as 1970s date in the database

    const invoiceDoc = await Invoice.create({
      invoiceNumber,
      invoiceDate,
      amount
    });

    return res.status(201).json({
      success: true,
      data: invoiceDoc
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again later..."
    });
  }
};

const getInvoices = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.find();

    if (data.length < 0) {
      return res.status(404).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again later..."
    });
  }
};

const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoiceDoc = await Invoice.findOne({ _id: id });

    if (!invoiceDoc) {
      return res.status(404).json({
        success: false,
        error: "Not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: invoiceDoc
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again later..."
    });
  }
};

const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoiceDoc = await Invoice.findOne({ _id: id });

    if (!invoiceDoc) {
      return res.status(404).json({
        success: false,
        error: `Invoice ${id} is not found!`
      });
    }

    await Invoice.deleteOne({ _id: id });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again later..."
    });
  }
};

const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { id, invoiceNumber, invoiceDate, amount } = req.body;

    if (!invoiceNumber || !invoiceDate || !amount || !id) {
      return res.status(400).json({
        success: false,
        error: "Missing fields!"
      });
    }

    const invoiceDoc = await Invoice.findOne({ _id: id });

    if (!invoiceDoc) {
      return res.status(404).json({
        success: false,
        error: `Invoice ${id} is not found!`
      });
    }

    invoiceDoc.invoiceNumber = invoiceNumber ?? invoiceDoc.invoiceNumber;

    invoiceDoc.invoiceDate = invoiceDate ?? invoiceDoc.invoiceNumber;

    invoiceDoc.amount = amount ?? invoiceDoc.amount;

    await invoiceDoc.save();

    return res.status(200).json({
      success: true,
      data: invoiceDoc
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong please try again later..."
    });
  }
};

export default {
  generateInvoice,
  getInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice
};
