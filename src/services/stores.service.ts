import { getRepository, Like } from "typeorm";
import { Store } from "../entities/Store";

export default class StoresService {
  public static getAll = async (
    name?: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<any> => {
    // paginar los resultados
    const builder = getRepository(Store).createQueryBuilder("stores");
    const total = await builder
      .where({ name: Like(`%${name || ""}%`), deleted_at: null })
      .getCount();

    const stores = await getRepository(Store).find({
      withDeleted: false,
      skip: offset,
      take: limit,
      where: { name: Like(`%${name || ""}%`) },
    });

    const totalPages = Math.ceil(total / limit);
    const page = Math.ceil(offset / limit);
    return {
      page,
      total,
      totalPages,
      offset,
      limit,
      data: stores,
    };
  };

  public static getById = async (id: string): Promise<any> => {
    const store = await getRepository(Store).find({ withDeleted: false, where: { id } });
    return store;
  };

  public static getByName = async (name?: string): Promise<any> => {
    const store = await getRepository(Store).find({ withDeleted: false, where: { name } });
    return store;
  };

  public static create = async (name: string, address: string): Promise<any> => {
    const repository = getRepository(Store);

    const newStore = repository.create();
    newStore.name = name;
    newStore.address = address;
    newStore.created_at = new Date();

    const response = await repository.save(newStore);
    return response;
  };

  public static delete = async (id: string): Promise<any> => {
    const response = getRepository(Store).softDelete(id);
    return response;
  };
}
