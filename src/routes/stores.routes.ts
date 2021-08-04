import { Router } from "express";
import { getStores } from "../controllers/store.controllers";

const router = Router();

router.get("/stores", getStores);

export default router;
