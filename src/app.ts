import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use(helmet());

routes(app);

export default app;
