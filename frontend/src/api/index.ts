import { safeFetch } from "../lib/http";
import { ItemSchema } from "../modell";
import { Item } from "../modell";

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

export const addToBag = async (item: Item) => {
  return safeFetch({
    method: "POST",
    url: "http://localhost:4001/api/bag",
    schema: ItemSchema,
    payload: item,
  });
};
