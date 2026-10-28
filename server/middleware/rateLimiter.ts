import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const windowMs = 60 * 1000; // 1 minute
const maxRequests = 120; // 120 requests/min per IP
const clients: Map<string, RateLimitRecord> = new Map();

// Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of clients.entries()) {
    if (now > record.resetTime) {
      clients.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = (req.ip || req.socket.remoteAddress || 'unknown') as string;
  const now = Date.now();

  let record = clients.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + windowMs };
    clients.set(ip, record);
    return next();
  }

  record.count += 1;
  if (record.count > maxRequests) {
    res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Industrial OT edge gateway protection active.',
      },
    });
  }

  next();
};
