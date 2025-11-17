// src/modules/auth/auth.service.ts
import { prisma } from '../../config/prisma.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { signJwt } from '../../utils/jwt.js';
import type { RegisterInput } from './auth.schema.js';
import { Prisma } from '@prisma/client';            // ✅ Dùng namespace Prisma
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Import error class
import { AppError } from '../../utils/appError.js'; // ✅ AppError

export async function register(input: RegisterInput) {
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await prisma.user.create({
      data: { name: input.name, email: input.email, passwordHash },
      select: { id: true, name: true, email: true }, // ❗ Không chọn role nếu schema không có
    });

    console.log(`✅ [REGISTER] User created: ${user.email} (${user.id})`);
  } catch (err: unknown) {
    // Bắt lỗi unique (email trùng)
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      console.warn(`⚠️ [REGISTER] Duplicate email: ${input.email}`);
      throw new AppError(409, 'Email đã tồn tại');
    }
    console.error('❌ [REGISTER] Unknown error:', err);
    throw err;
  }
  }

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, passwordHash: true }, // cần passwordHash để so sánh
  });

  if (!user) {
    console.warn(`❌ [LOGIN] Email not found: ${email}`);
    throw new AppError(401, 'Email hoặc mật khẩu không đúng');
  }

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) {
    console.warn(`❌ [LOGIN] Wrong password for: ${email}`);
    throw new AppError(401, 'Email hoặc mật khẩu không đúng');
  }

  // Nếu schema không có 'role', chỉ ký sub
  const token = signJwt({ sub: user.id });

  console.log(`✅ [LOGIN] ${email} logged in`);
  return {
    user: { id: user.id, name: user.name, email: user.email }, // không trả passwordHash
    token,
  };
}
