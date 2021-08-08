import { Router } from "express";
import { createStore, deleteStore, getStores } from "../controllers/store.controllers";

const router = Router();

router.get("/stores", getStores);
router.post("/stores", createStore);
router.delete("/stores/:id", deleteStore);

export default router;
