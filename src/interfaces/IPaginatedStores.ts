import { Store } from "./../entities/Store";

export default interface IPaginatedStores {
  page: number;
  total: number;
  totalPages: number;
  offset: number;
  limit: number;
  data: Store[];
}
