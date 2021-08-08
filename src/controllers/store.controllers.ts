import { Request, Response } from "express";
import StoresService from "../services/stores.service";

export const getStores = async (req: Request, res: Response): Promise<Response> => {
  const { name, limit, offset } = req.query;
  let limitNumber;
  let offsetNumber;
  if (limit) {
    limitNumber = parseInt(limit as string);
  }

  if (offset) {
    offsetNumber = parseInt(offset as string);
  }
  const stores = await StoresService.getAll(name as string, limitNumber, offsetNumber);
  return res.json(stores);
};

export const getStoreById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!id) return res.status(400).send({ message: "You must have to provide an id" });

  const store = await StoresService.getById(id);
  if (!store) return res.status(404).send({ message: "Store not found" });

  return res.json(store);
};

export const createStore = async (req: Request, res: Response): Promise<Response> => {
  const { name, address } = req.body;
  if (!name) return res.status(400).send({ message: "Must provide a name" });
  if (!address) return res.status(400).send({ message: "Must provide an address" });

  const exists = await StoresService.getByName(name);
  if (exists) return res.status(400).send("Store already exists");

  const store = await StoresService.create(name, address);
  if (!store)
    return res.status(400).send({ message: "Something was wrong. Store could not be created" });

  return res.status(201).json(store);
};

export const deleteStore = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const store = await StoresService.getById(id);
  if (!store) return res.status(404).send({ message: "Stored not found" });

  const response = await StoresService.delete(id);

  if (response.affected == 1)
    return res.status(201).send({ message: "Store successfully deleted" });

  return res.status(404).send({ message: "Something was wrong, store could not be deleted" });
};
