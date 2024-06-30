import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string().url(),
  counter: z.number(),
  ordered: z.number(),
  originalPrice: z.number(),
});
