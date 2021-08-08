import { Request, Response } from "express";
import CouponsService from "../services/coupons.service";
// import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

const codeRegExp = new RegExp("^[A-Za-z0-9]{8}$");
const mailFormat =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

export const getCouponById = async (req: Request, res: Response): Promise<Response> => {
  const coupon = await CouponsService.findById(req.params.id as string);

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

export const updateCoupon = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const coupon = { ...req.body };

  const validEmail = String(coupon.customer_email).match(mailFormat);
  if (!validEmail) return res.status(422).send({ message: "Invalid Email" });

  const exists = await CouponsService.findById(id);

  if (!exists) return res.status(422).send({ message: "Coupon do not exist on database" });

  const isEmailInUse = await CouponsService.findByCustomerEmail(coupon.customer_email);
  if (isEmailInUse) return res.status(422).send({ message: "Email has already a coupon assigned" });

  const updatedCoupon = await CouponsService.update(coupon);

  return res.status(201).json(updatedCoupon);
};

export const deleteCoupon = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  if (!id) return res.status(404).send({ message: "No id provided " });

  const coupon = await CouponsService.findById(id);

  if (!coupon) return res.status(404).send({ message: "Not coupon found" });

  if (coupon.customer_email) {
    return res.status(404).send({ message: "Coupon is assigned to a customer, cannot delete it" });
  }

  const response = await CouponsService.softDelete(coupon.id);
  if (response.affected == 1)
    return res.status(201).send({ message: "Coupon successfully deleted" });

  return res.status(404).send({ message: "Something was wrong, coupon could not be deleted" });
};
