import { Request, Response, NextFunction, RequestHandler } from 'express';

type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const ctrlWrapper = (ctrl: Controller): RequestHandler => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func as RequestHandler;
};

export default ctrlWrapper;
