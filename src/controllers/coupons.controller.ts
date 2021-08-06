import { Request, Response } from "express";
import CouponsService from "../services/coupons.service";
// import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

const codeRegExp = new RegExp("^[A-Za-z0-9]{8}$");

export const getCoupon = async (req: Request, res: Response): Promise<Response> => {
  if (!req.query.email) return res.status(400).send({ message: "You must provide an email." });
  if (!req.query.code) return res.status(400).send({ message: "You must provide coupon code" });

  const coupon: Coupon = await CouponsService.getByEmailAndCode(
    String(req.query.email),
    String(req.query.code),
  );

  if (!coupon) return res.status(404).send({ message: "Not coupon found" });

  return res.status(200).json(coupon);
};

export const createCoupon = async (req: Request, res: Response): Promise<Response> => {
  const code = req.body.code;
  const match = codeRegExp.test(code);

  if (!match)
    return res.status(400).send({
      message: "Missing or wrong code. Code must be 8 characters and contains chars and numbers",
    });

  const existedCoupon = await CouponsService.findByCode(code);

  if (existedCoupon) return res.status(409).send({ message: "Code already in use" });

  const newCoupon = await CouponsService.create(code);

  if (!newCoupon) return res.status(422).send({ message: "Coupon could not be created" });

  return res.status(201).send({ message: "Coupon successfully created" });
};
