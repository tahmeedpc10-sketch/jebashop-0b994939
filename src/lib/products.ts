import type { Product } from "@/components/site/ProductShowcase";

export const products: Product[] = [
  {
    id: "jbl-xtreme-p192",
    name: "JBL Xtreme P192 Speaker",
    tagline: "ছোট সাইজ, কিন্তু সাউন্ডে পুরো আগুন!",
    description:
      "পার্টি, ট্রাভেল কিংবা আড্ডা — সবকিছুর জন্য পারফেক্ট স্পিকার। কম্প্যাক্ট ডিজাইনের সাথে পাওয়ারফুল সাউন্ড।",
    features: [
      "12W Dual Speaker",
      "Bluetooth 5.3 + TWS",
      "1500mAh Battery",
      "10–12 Hours Playback",
      "IPX6 Waterproof",
      "RGB LED Light",
      "USB / TF / FM / AUX",
      "Portable Design",
    ],
    badges: [
      { icon: "fire", label: "Best Seller" },
      { icon: "zap", label: "Limited Stock" },
      { icon: "truck", label: "Fast Delivery" },
    ],
  },
  {
    id: "et-312",
    name: "ET 312 Sound Box",
    tagline: "হেভি বেস + ক্লিয়ার সাউন্ড",
    description:
      "ট্রাভেল, পার্টি, আড্ডা — সব জায়গায় জমিয়ে দেবে আপনার মুড। ডাবল হর্ন আর ৪০০০mAh ব্যাটারি।",
    features: [
      "20W Powerful Sound",
      "RGB Party Light",
      "4000mAh Battery",
      "Type-C Fast Charge",
      "Double Horn + Diaphragm",
      "Bluetooth / USB / TF",
      "Portable Strap",
      "Long Playback",
    ],
    badges: [
      { icon: "fire", label: "Trending" },
      { icon: "zap", label: "Limited Stock" },
      { icon: "truck", label: "Fast Delivery" },
    ],
    colors: ["Red", "Blue", "Black", "Green"],
  },
];
