/**
 * SSLCommerz integration config — placeholder.
 * Replace with real env vars when wiring up the gateway.
 *
 * Required env vars (set later in Lovable Cloud / Vercel):
 *  - SSLCZ_STORE_ID
 *  - SSLCZ_STORE_PASSWORD
 *  - SSLCZ_IS_LIVE = "false" | "true"
 */

export const sslcommerzConfig = {
  store_id: process.env.SSLCZ_STORE_ID ?? "",
  store_password: process.env.SSLCZ_STORE_PASSWORD ?? "",
  is_live: process.env.SSLCZ_IS_LIVE === "true",
  endpoints: {
    sandbox: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    live: "https://securepay.sslcommerz.com/gwprocess/v4/api.php",
  },
  callback: {
    success_url: "/payment/success",
    fail_url: "/payment/fail",
    cancel_url: "/payment/cancel",
    ipn_url: "/api/public/sslcommerz-ipn",
  },
};

export type CheckoutPayload = {
  total_amount: number;
  currency: "BDT";
  tran_id: string;
  product_name: string;
  product_category: string;
  cus_name: string;
  cus_email?: string;
  cus_phone: string;
  cus_add1: string;
  cus_city?: string;
  cus_country?: "Bangladesh";
};
