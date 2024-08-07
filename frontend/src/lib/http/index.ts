import { z } from "zod";

type Response<Type> =
  | {
      success: true;
      status: number;
      data: Type;
    }
  | {
      success: false;
      status: number | null;
    };

type Method = "GET" | "POST" | "DELETE" | "PATCH";

export const safeFetch = async <Schema extends z.ZodTypeAny>(config: {
  method: Method;
  url: string;
  schema: Schema;
  payload?: unknown;
}): Promise<Response<z.infer<typeof schema>>> => {
  const { method, url, schema, payload } = config;
  try {
    const response = await fetch(url, {
      method,
      headers: payload ? { "Content-Type": "application/JSON" } : {},
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (response.status >= 500)
      return { success: false, status: response.status };

    if (response.status >= 400)
      return { success: false, status: response.status };

    const data = await response.json();
    const result = schema.safeParse(data);

    if (!result.success) {
      console.log(result.error.issues);
      return { success: false, status: response.status };
    }

    return { data: result.data, success: true, status: response.status };
  } catch (error) {
    return { success: false, status: null };
  }
};
