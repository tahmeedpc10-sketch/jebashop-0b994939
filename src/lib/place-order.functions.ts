import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  PRODUCT_CATALOG,
  DELIVERY_FEE,
  ALLOWED_PAYMENTS,
} from "./product-catalog.server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone"),
  jela: z.string().trim().min(1).max(80),
  thana: z.string().trim().min(1).max(80),
  union: z.string().trim().max(80).optional().default(""),
  gram: z.string().trim().min(1).max(300),
  productId: z.enum(
    Object.keys(PRODUCT_CATALOG) as [string, ...string[]],
  ),
  color: z.string().trim().min(1).max(40),
  qty: z.number().int().min(1).max(10),
  payment: z.enum(ALLOWED_PAYMENTS),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const product =
      PRODUCT_CATALOG[data.productId as keyof typeof PRODUCT_CATALOG];
    if (!product) throw new Error("Invalid product");
    if (!(product.colors as readonly string[]).includes(data.color)) {
      throw new Error("Invalid color for this product");
    }

    const subtotal = product.price * data.qty;
    const delivery = DELIVERY_FEE;
    const total = subtotal + delivery;

    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert({
        name: data.name,
        phone: data.phone,
        jela: data.jela,
        thana: data.thana,
        union_name: data.union || null,
        gram: data.gram,
        product_id: data.productId,
        product_name: product.name,
        color: data.color,
        qty: data.qty,
        payment: data.payment,
        subtotal,
        delivery,
        total,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });
