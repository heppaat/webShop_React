import express from "express";
import cors from "cors";
import { load, save } from "./util/db";
import { ItemSchema } from "./modell";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/items", async (req, res) => {
  const items = await load("items", ItemSchema.array());
  if (!items) return res.sendStatus(500);

  res.json(items);
});

server.get("/api/bag", async (req, res) => {
  const bagItems = await load("bag", ItemSchema.array());
  if (!bagItems) return res.sendStatus(500);

  res.json(bagItems);
});

server.post("/api/bag", async (req, res) => {
  const result = ItemSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error.issues);
  const validatedNewItem = result.data;

  const bagItems = await load("bag", ItemSchema.array());
  if (!bagItems) return res.sendStatus(500);

  const existingItem = bagItems.find((item) => item.id === validatedNewItem.id);

  if (existingItem) {
    const updatedBagItems = bagItems.map((item) => {
      if (item.id === existingItem.id) {
        item.counter++;
        item.price += item.originalPrice;
        return item;
      }
      return item;
    });

    const isSuccessfull = await save(
      "bag",
      updatedBagItems,
      ItemSchema.array()
    );
    if (!isSuccessfull) return res.sendStatus(500);
    res.json("added");
  } else {
    validatedNewItem.counter++;

    const isSuccessfull = await save(
      "bag",
      [...bagItems, validatedNewItem],
      ItemSchema.array()
    );
    if (!isSuccessfull) return res.sendStatus(500);
    res.json("added");
  }
});

server.listen(4001);
