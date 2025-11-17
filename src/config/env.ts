// src/config/env.ts
import * as dotenv from 'dotenv';
dotenv.config(); // <-- nạp .env

const required = ['JWT_SECRET', 'DATABASE_URL'] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required ENV: ${key}`);
  }
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',
  DATABASE_URL: process.env.DATABASE_URL!,
};
