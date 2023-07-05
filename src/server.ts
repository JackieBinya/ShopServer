import mongoose from "mongoose";
import "dotenv/config";
import app from "./app";

let server: any;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(`${MONGO_URI}`).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export default server;
