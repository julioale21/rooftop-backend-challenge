import { Router } from "express";
import { getStats } from "../controllers/stasts.controller";

const router = Router();

router.get("/stats", getStats);

export default router;
