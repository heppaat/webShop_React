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

server.listen(4001);
