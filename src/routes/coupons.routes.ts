import { Router } from "express";
import { createCoupon, getCoupon, updateCoupon } from "../controllers/coupons.controller";

const router = Router();

router.get("/coupons", getCoupon);
router.post("/coupons", createCoupon);
router.patch("/coupons/:id", updateCoupon);
// router.delete("/coupons/:id");

export default router;
