import { Request, Response } from "express";
import StatsService from "../services/stats.service";

export const getStats = async (req: Request, res: Response): Promise<Response> => {
  const response = await StatsService.getCouponsStats();
  return res.status(200).json(response);
};
