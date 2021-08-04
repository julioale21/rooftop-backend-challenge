import { Router } from "express";
import { createCoupon, getCoupons } from "../controllers/coupons.controller";

const router = Router();

router.get("/coupons", getCoupons);
// router.get("/coupons/:id");
router.post("/coupons", createCoupon);
// router.put("/coupons");
// router.delete("/coupons/:id");

export default router;
