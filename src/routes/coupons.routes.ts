import { Router } from "express";
import { getCoupon } from "../controllers/coupons.controller";

const router = Router();

router.get("/coupons", getCoupon);

// router.put("/coupons");
// router.delete("/coupons/:id");

export default router;
