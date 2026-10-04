import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected");

    const server = app.listen(config.port, () =>
      console.log(`Server on http://localhost:${config.port}`)
    );

    server.on("error", (err) => {
      console.error("Gagal menjalankan server:", err.message);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
  });

export default app;