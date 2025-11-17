// src/modules/auth/auth.controller.ts
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { AppError } from '../../utils/appError.js';

// ĐĂNG KÝ
export async function registerHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError(400, 'Name, email, password are required');
  }

  const existed = await prisma.user.findUnique({ where: { email } });
  if (existed) {
    throw new AppError(409, 'Email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true },
  });

  console.log(`✅ [REGISTER] ${email} (${user.id})`);
  return res.status(201).json({ user });
}

// ĐĂNG NHẬP
export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, 'Email or password is incorrect');
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError(401, 'Email or password is incorrect');
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );

  console.log(`✅ [LOGIN] ${email}`);
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

// LẤY USER HIỆN TẠI
export async function meHandler(req: Request, res: Response) {
  if (!req.userId) throw new AppError(401, 'Unauthenticated');

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true },
  });

  return res.json(user);
}
