import { Request, Response, NextFunction } from 'express';

const errHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {},
    });
};

export default {errHandler};