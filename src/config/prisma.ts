// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';

// Tạo 1 PrismaClient dùng chung
export const prisma = new PrismaClient();
