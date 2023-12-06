import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export function generateAccessToken(user: IUser) {
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    if (!accessToken) return;
    // Expiration time is optional
    return jwt.sign({ username: user.username }, accessToken, { expiresIn: '15m' });
}

export function generateRefreshToken(user: IUser) {
    const refreshToken = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshToken) return;
    return jwt.sign({ username: user.username }, refreshToken);
}
