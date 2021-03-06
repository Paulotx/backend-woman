import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    perfil: string;
    regions: Array<string>;
}

export default function onlyAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { perfil, regions } = decoded as TokenPayload;

    if (perfil === 'operator') {
        throw new AppError('Access denied.', 401);
    }

    request.regions = regions;

    return next();
}
