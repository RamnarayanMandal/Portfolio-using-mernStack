import JWT from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.user = { userId: payload.userId };
    next();
  } catch {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default userAuth;
