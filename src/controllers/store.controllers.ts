import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entities/Store";

export const getStores = async (req: Request, res: Response): Promise<Response> => {
  const stores = await getRepository(Store).find();
  return res.json(stores);
};