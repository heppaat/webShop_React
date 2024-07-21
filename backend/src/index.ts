import express from "express";
import cors from "cors";
import { load, save } from "./util/db";
import { ItemSchema } from "./modell";
import { z } from "zod";

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
        return {
          ...item,
          counter: item.counter + 1,
          price: item.price + item.originalPrice,
        };
      }
      return item;
    });

    const isSuccessfull = await save(
      "bag",
      updatedBagItems,
      ItemSchema.array()
    );
    if (!isSuccessfull) return res.sendStatus(500);
    res.json({ success: true });
  } else {
    validatedNewItem.counter = 1;

    const newBagItems = [...bagItems, { ...validatedNewItem }];

    const isSuccessfull = await save("bag", newBagItems, ItemSchema.array());
    if (!isSuccessfull) return res.sendStatus(500);
    res.json({ success: true });
  }
});

server.delete("/api/bag/:id", async (req, res) => {
  const id = req.params.id;
  const result = z.coerce.number().safeParse(id);

  if (!result.success) return res.sendStatus(400).json(result.error.issues);

  const itemToDeleteId = result.data;

  const bagItems = await load("bag", ItemSchema.array());
  if (!bagItems) return res.sendStatus(500);

  const existingItem = bagItems.find((item) => item.id === itemToDeleteId);

  if (existingItem) {
    if (existingItem.counter > 1) {
      const updatedBagItems = bagItems.map((item) => {
        if (item.id === existingItem.id) {
          return {
            ...item,
            counter: item.counter - 1,
            price: item.price - item.originalPrice,
          };
        }
        return item;
      });
      const isSuccessfull = await save(
        "bag",
        updatedBagItems,
        ItemSchema.array()
      );
      if (!isSuccessfull) return res.sendStatus(500);
      res.json({ success: true });
    } else {
      const filteredItems = bagItems.filter(
        (item) => item.id !== itemToDeleteId
      );

      const isSuccessfull = await save(
        "bag",
        filteredItems,
        ItemSchema.array()
      );
      if (!isSuccessfull) return res.sendStatus(500);
      res.json({ success: true });
    }
  } else {
    return res.sendStatus(500);
  }
});

server.listen(4001);
