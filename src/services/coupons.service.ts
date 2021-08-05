import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

export default class CouponsService {
  public static getCoupon = async (email?: string, code?: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({
      where: { customer_email: email, code: code },
    });

    return coupon;
  };
}
