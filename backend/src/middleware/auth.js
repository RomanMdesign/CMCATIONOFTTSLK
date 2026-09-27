import { verifyAccessToken, getTokenFromHeader } from '../utils/auth.js';
import prisma from '../utils/prisma.js';

export async function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const decoded = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        status: true,
        statusMessage: true,
      },
    });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function optionalAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = verifyAccessToken(token);
    prisma.user.findUnique({ where: { id: decoded.userId } }).then((user) => {
      req.user = user;
      next();
    }).catch(() => {
      req.user = null;
      next();
    });
  } catch {
    req.user = null;
    next();
  }
}
