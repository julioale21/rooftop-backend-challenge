import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

export const getCoupons = async (req: Request, res: Response): Promise<Response> => {
  const coupons = await getRepository(Coupon).find();
  return res.json(coupons);
};

export const createCoupon = async (req: Request, res: Response): Promise<Response> => {
  const newCoupon = await getRepository(Coupon).create(req.body);
  const response = getRepository(Coupon).save(newCoupon);
  return res.json(response);
};
