// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { prisma } from "./config/db";          // nếu bạn có file db.ts thì import để nó init
import authRoutes from "./modules/auth/auth.routes";
import courseRoutes from "./modules/courses/course.routes";
import lessonRoutes from "./modules/lessons/lesson.routes";
import enrollmentRoutes from "./modules/enrollments/enrollment.routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// test route
app.get("/", (_req, res) => {
  res.json({ message: "E-Learning API" });
});

// ⚠️ TẤT CẢ API ĐỀU ĐI QUA PREFIX /api
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ E-Learning backend running on http://localhost:${PORT}`);
});
