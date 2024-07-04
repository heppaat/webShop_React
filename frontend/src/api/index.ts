import { safeFetch } from "../lib/http";
import { ItemSchema } from "../modell";

export const getAllItems = async () => {
  return safeFetch({
    method: "GET",
    url: "http://localhost:4001/api/items",
    schema: ItemSchema.array(),
  });
};

export const getBagItems = async () =>
  safeFetch({
    method: "GET",
    url: "http://localhost:4001/api/bag",
    schema: ItemSchema.array(),
  });
