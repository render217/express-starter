import jwt from 'jsonwebtoken';
import Logger from '@libs/logger';

const SECRET_KEY = process.env.JWT_SECRET || '';

// Generate a JWT for a user
export const generateToken = () => {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign('', SECRET_KEY, { expiresIn: '1h' });
};

// Verify a JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    Logger.error(error);
    throw new Error('Invalid token');
  }
};
