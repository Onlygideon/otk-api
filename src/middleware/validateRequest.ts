import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
      return;
    }
    next();
  };
};

export default validateRequest;
