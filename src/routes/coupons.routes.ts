import { Router } from "express";
import { getCoupon, createCoupon } from "../controllers/coupons.controller";

const router = Router();

router.get("/coupons", getCoupon);

router.post("/coupons", createCoupon);
// router.delete("/coupons/:id");

export default router;
