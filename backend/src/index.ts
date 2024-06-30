import express from "express";
import cors from "cors";
import { load, save } from "./util/db";
import { ItemSchema } from "./modell";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/items", (req, res) => {
  const items = load("items", ItemSchema);
  if (!items) return res.sendStatus(500);

  res.json(items);
});

server.listen(4001);
