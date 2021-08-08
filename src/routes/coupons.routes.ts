import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCouponById,
  updateCoupon,
} from "../controllers/coupons.controller";

const router = Router();

router.get("/coupons", getCoupon);
router.get("/coupons/:id", getCouponById);
router.post("/coupons", createCoupon);
router.patch("/coupons/:id", updateCoupon);
router.delete("/coupons/:id", deleteCoupon);

export default router;
