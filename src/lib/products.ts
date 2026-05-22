import type { Product } from "@/components/site/ProductShowcase";

import p192_1 from "@/assets/products/p192-1.jpg";
import p192_2 from "@/assets/products/p192-2.jpg";
import p192_3 from "@/assets/products/p192-3.jpg";
import p192_4 from "@/assets/products/p192-4.jpg";
import p192_5 from "@/assets/products/p192-5.jpg";
import p192_6 from "@/assets/products/p192-6.jpg";

import et312_1 from "@/assets/products/et312-1.jpg";
import et312_2 from "@/assets/products/et312-2.jpg";
import et312_3 from "@/assets/products/et312-3.jpg";
import et312_4 from "@/assets/products/et312-4.jpg";

export const products: Product[] = [
  {
    id: "jbl-xtreme-p192",
    name: "JBL Xtreme P192 Speaker",
    tagline: "ছোট সাইজ, কিন্তু সাউন্ডে পুরো আগুন!",
    description:
      "পার্টি, ট্রাভেল কিংবা আড্ডা — সবকিছুর জন্য পারফেক্ট স্পিকার। কম্প্যাক্ট ডিজাইনের সাথে পাওয়ারফুল সাউন্ড।",
    price: 1590,
    oldPrice: 2500,
    images: [p192_1, p192_2, p192_3, p192_4, p192_5, p192_6],
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
    colors: ["Military", "Classic Navy Blue", "Black", "Red"],
  },
  {
    id: "et-312",
    name: "ET 312 Sound Box",
    tagline: "হেভি বেস + ক্লিয়ার সাউন্ড",
    description:
      "ট্রাভেল, পার্টি, আড্ডা — সব জায়গায় জমিয়ে দেবে আপনার মুড। ডাবল হর্ন আর ৪০০০mAh ব্যাটারি।",
    price: 1290,
    oldPrice: 1600,
    images: [et312_1, et312_2, et312_3, et312_4],
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
