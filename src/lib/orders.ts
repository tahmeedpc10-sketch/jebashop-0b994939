// Order store backed by Lovable Cloud.
import { supabase } from "@/integrations/supabase/client";

export type Order = {
  id: string;
  createdAt: number;
  name: string;
  phone: string;
  jela: string;
  thana: string;
  union: string;
  gram: string;
  productId: string;
  productName: string;
  color: string;
  qty: number;
  payment: string;
  subtotal: number;
  delivery: number;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
};

type Row = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  jela: string;
  thana: string;
  union_name: string;
  gram: string;
  product_id: string;
  product_name: string;
  color: string;
  qty: number;
  payment: string;
  subtotal: number;
  delivery: number;
  total: number;
  status: Order["status"];
};

function fromRow(r: Row): Order {
  return {
    id: r.id,
    createdAt: new Date(r.created_at).getTime(),
    name: r.name,
    phone: r.phone,
    jela: r.jela,
    thana: r.thana,
    union: r.union_name,
    gram: r.gram,
    productId: r.product_id,
    productName: r.product_name,
    color: r.color,
    qty: r.qty,
    payment: r.payment,
    subtotal: r.subtotal,
    delivery: r.delivery,
    total: r.total,
    status: r.status,
  };
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(fromRow);
}

export async function saveOrder(o: Omit<Order, "id" | "createdAt" | "status"> & { status?: Order["status"] }): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      name: o.name,
      phone: o.phone,
      jela: o.jela,
      thana: o.thana,
      union_name: o.union,
      gram: o.gram,
      product_id: o.productId,
      product_name: o.productName,
      color: o.color,
      qty: o.qty,
      payment: o.payment,
      subtotal: o.subtotal,
      delivery: o.delivery,
      total: o.total,
      status: o.status ?? "pending",
    })
    .select()
    .single();
  if (error) throw error;
  return fromRow(data as Row);
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}
