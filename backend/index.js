import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/DB.js";
import userRoute from "./routers/user.router.js";
import companyRoute from "./routers/company.router.js";
import jobsRouter from "./routers/job.router.js";
import applicationRouter from "./routers/application.router.js";
import path from "path";


const app = express();

// ✅ __dirname fix for ES modules

const __dirname = path.resolve();

// ✅ CORS fix (localhost + deployed)
const corsOptions = {
  origin:  "https://job-portal-9-u2ls.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobsRouter);
app.use("/api/v1/application", applicationRouter);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server run on port ${PORT}`);
    });
  } catch (err) {
    console.log("❌ Error:", err);
    process.exit(1);
  }
};

startServer();
