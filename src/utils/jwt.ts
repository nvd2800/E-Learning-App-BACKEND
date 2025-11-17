import jwt, { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';
import { ENV } from '../config/env';

export const signJwt = (payload: string | object | Buffer): string => {
  // ✅ ép kiểu cho secret để TypeScript không báo lỗi
  return jwt.sign(
    payload,
    ENV.JWT_SECRET as Secret,
    { expiresIn: ENV.JWT_EXPIRES as string | number } as SignOptions
  );
};

export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET as string) as JwtPayload;
  } catch (error) {
    return null;
  }
};
