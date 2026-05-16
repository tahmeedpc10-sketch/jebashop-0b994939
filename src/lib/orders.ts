// Lightweight client-side order store (localStorage).
// Replace later with Lovable Cloud or SSLCommerz backend integration.

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

const KEY = "jeba:orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrder(o: Order) {
  const list = getOrders();
  list.unshift(o);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const list = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function deleteOrder(id: string) {
  const list = getOrders().filter((o) => o.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}
