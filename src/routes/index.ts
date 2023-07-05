import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import invoiceRoutes from "./invoice.route";
import swaggerDocument from "../../swagger/config.json";

const Routes = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/invoices", invoiceRoutes);
};

export default Routes;
