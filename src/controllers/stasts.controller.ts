import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response): Promise<Response> => {
  return res.send({ message: "enviado" });
};
