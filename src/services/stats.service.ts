import { getRepository } from "typeorm";
import { Coupon } from "../entities/Coupon";
import ICouponsStats from "../interfaces/ICouponsStats";
import { IsNull, Not } from "typeorm";

export default class StatsService {
  static async getCouponsStats(): Promise<ICouponsStats> {
    const builder = getRepository(Coupon).createQueryBuilder("coupons");

    const totalExistingCoupons = await builder.where({ deleted_at: null }).getCount();

    const totalAssignedCoupons = await builder
      .where({ customer_email: Not(IsNull()), deleted_at: IsNull() })
      .getCount();

    const totalUnassigned = await builder
      .where({ customer_email: IsNull(), deleted_at: IsNull() })
      .getCount();

    const totalCreatedByDay = await builder
      .where({ deleted_at: IsNull() })
      .select("coupons.created_at")
      .addSelect("SUM(coupons.count)", "sum")
      .groupBy("coupons.created_at")
      .execute();

    const totalAssignedByDay = await builder
      .where({ deleted_at: IsNull() })
      .select("coupons.assigned_at")
      .addSelect("SUM(coupons.count)", "sum")
      .groupBy("coupons.assigned_at")
      .execute();

    return {
      totalExistingCoupons,
      totalAssignedCoupons,
      totalUnassigned,
      totalCreatedByDay,
      totalAssignedByDay,
    };
  }
}
