import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

export default class CouponsService {
  public static getByEmailAndCode = async (email?: string, code?: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({
      where: { customer_email: email, code: code },
    });

    return coupon;
  };

  public static findByCode = async (code: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({ where: { code: code } });
    return coupon;
  };

  public static create = async (code: string): Promise<Coupon> => {
    const newCoupon = await getRepository(Coupon).create();
    const today = new Date();
    var newDate = new Date(today.setMonth(today.getMonth() + 1));
    newCoupon.code = code;
    newCoupon.expires_at = newDate;

    await getRepository(Coupon).save(newCoupon);
    return newCoupon;
  };
}
