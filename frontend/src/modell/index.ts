import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  counter: z.number(),
  ordered: z.number(),
  originalPrice: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;
