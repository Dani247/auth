import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export function generateAccessToken(user: IUser) {
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    if (!accessToken) return;
    // @ts-expect-error
    delete user.password;
    // Expiration time is optional
    return jwt.sign({ ...user }, accessToken, {expiresIn: "15m"});
}

export function generateRefreshToken(user: IUser) {
    const refreshToken = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshToken) return;
    // @ts-expect-error
    delete user.password;
    return jwt.sign({ ...user }, refreshToken);
}

export function validateToken(token: string) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) return;
    return jwt.verify(token, accessTokenSecret, {});
}
