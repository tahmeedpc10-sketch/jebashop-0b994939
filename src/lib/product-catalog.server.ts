// Server-only authoritative product catalog used to recompute prices on the
// server so order totals cannot be manipulated by the client.
export const PRODUCT_CATALOG = {
  "jbl-xtreme-p192": {
    name: "JBL Xtreme P192 Speaker",
    price: 1690,
    colors: ["Military", "Classic Navy Blue", "Black", "Red"] as const,
  },
  "et-312": {
    name: "ET 312 Sound Box",
    price: 1390,
    colors: ["Red", "Blue", "Black", "Green"] as const,
  },
} as const;

export const DELIVERY_FEE = 80;
export const ALLOWED_PAYMENTS = ["cod", "bkash", "nagad"] as const;
export type ProductId = keyof typeof PRODUCT_CATALOG;
