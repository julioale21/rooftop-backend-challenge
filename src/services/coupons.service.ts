import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";

export default class CouponsService {
  public static getByEmailAndCode = async (email?: string, code?: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({
      withDeleted: false,
      where: { customer_email: email, code: code },
    });

    return coupon;
  };

  public static findByCode = async (code: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({ withDeleted: false, where: { code } });
    return coupon;
  };

  public static findByCustomerEmail = async (email: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({
      withDeleted: false,
      where: { customer_email: email },
    });
    return coupon;
  };

  public static findById = async (id: string): Promise<any> => {
    const coupon = await getRepository(Coupon).findOne({ withDeleted: false, where: { id } });
    return coupon;
  };

  public static create = async (code: string): Promise<Coupon> => {
    const newCoupon = getRepository(Coupon).create();
    const today = new Date();
    var newDate = new Date(today.setMonth(today.getMonth() + 1));
    newCoupon.code = code;
    newCoupon.created_at = today;
    newCoupon.expires_at = newDate;

    await getRepository(Coupon).save(newCoupon);
    return newCoupon;
  };

  public static update = async (coupon: Coupon): Promise<Coupon> => {
    if (!coupon.expires_at) {
      const today = new Date();
      var newDate = new Date(today.setMonth(today.getMonth() + 1));
      coupon.expires_at = newDate;
    }
    const updatedCoupon = await getRepository(Coupon).save(coupon);
    return updatedCoupon;
  };

  public static delete = async (id: string) => {
    const response = await getRepository(Coupon).delete(id);
    return response;
  };

  public static softDelete = async (id: string) => {
    const response = await getRepository(Coupon).softDelete(id);
    return response;
  };
}
