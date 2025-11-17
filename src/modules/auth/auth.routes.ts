// src/modules/auth/auth.routes.ts
import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  meHandler,
} from "./auth.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

// POST /api/auth/register
router.post("/register", registerHandler);

// POST /api/auth/login
router.post("/login", loginHandler);

// GET /api/auth/me  (cần header Authorization: Bearer <token>)
router.get("/me", requireAuth, meHandler);

export default router;
