import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Shared admin credentials (client + server). Kept simple per product requirement.
export const ADMIN_USERNAME = "JEBASHOP02";
export const ADMIN_PASSWORD = "0987654321";

const tokenSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function assertAdmin(input: { username: string; password: string }) {
  if (input.username !== ADMIN_USERNAME || input.password !== ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export const adminListOrders = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    assertAdmin(data);
    const { data: rows, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    tokenSchema
      .extend({
        id: z.string().uuid(),
        status: z.enum(["pending", "confirmed", "delivered", "cancelled"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    assertAdmin(data);
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    tokenSchema.extend({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    assertAdmin(data);
    const { error } = await supabaseAdmin.from("orders").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
