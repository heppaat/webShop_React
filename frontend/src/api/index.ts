import { safeFetch } from "../lib/http";
import { ItemSchema } from "../modell";
import { Item } from "../modell";
import { z } from "zod";

export const getAllItems = () =>
  safeFetch({
    method: "GET",
    url: "http://localhost:4001/api/items",
    schema: ItemSchema.array(),
  });

export const getBagItems = () =>
  safeFetch({
    method: "GET",
    url: "http://localhost:4001/api/bag",
    schema: ItemSchema.array(),
  });

export const addToBag = (item: Item) =>
  safeFetch({
    method: "POST",
    url: "http://localhost:4001/api/bag",
    schema: z.object({ success: z.boolean() }),
    payload: item,
  });
