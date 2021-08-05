import { Request, Response } from "express";
import CouponsService from "../services/coupons.service";
// import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

export const getCoupon = async (req: Request, res: Response): Promise<Response> => {
  if (!req.query.email) return res.send("falta el email");
  if (!req.query.code) return res.send("falta el codigo");

  const coupon: Coupon = await CouponsService.getCoupon(
    String(req.query.email),
    String(req.query.code),
  );

  if (!coupon) return res.status(404).send({ message: "Not coupon found" });

  return res.status(200).json(coupon);
};
