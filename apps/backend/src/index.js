import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.config.js";
import cors from "cors";

const app = express();
await connectDB();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://frontend.localhost",
    "http://admin.localhost",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get(`/api/${process.env.VERSION}/health`, (req, res) => {
  res.json({
    status: "OK",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    version: process.env.VERSION,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
