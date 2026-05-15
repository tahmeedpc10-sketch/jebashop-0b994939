# Jeba Shop — Premium Electronics Landing Page

A premium, high-conversion ecommerce landing page for **Jeba Shop**, built with TanStack Start, React, Tailwind CSS v4, and shadcn/ui.

## ✨ Features

- Dark-luxury "Royal Navy + Gold" design system
- Mobile-first responsive layout, sticky CTAs, floating WhatsApp
- Hero, Trust, 2× product showcases, Quick-order checkout, Warranty card, Reviews, Delivery, FAQ, Footer
- SSLCommerz-ready payment architecture with success / fail / cancel routes
- Bengali typography (Hind Siliguri) + English display (Playfair Display)
- SEO meta + canonical, Open Graph tags

## 🖼️ Where to upload images

All product/hero/warranty/logo images use the `<ImagePlaceholder>` component. To replace:

1. Drop your images into `src/assets/` (preferred) or `public/images/`.
2. Replace `<ImagePlaceholder label="..." />` calls in:
   - `src/components/site/Hero.tsx` (hero / speaker mockup)
   - `src/components/site/ProductShowcase.tsx` (gallery + thumbnails)
   - `src/components/site/Warranty.tsx` (QR / warranty card)
3. Use ES6 imports for assets: `import img from "@/assets/jbl-1.jpg"` then `<img src={img} alt="..." />`.

## 💳 SSLCommerz integration

Frontend is wired to call `/api/public/sslcommerz-init` when the user picks **SSLCommerz**. Config lives in:

- `src/payment/sslcommerz.config.ts`
- Routes: `/payment/success`, `/payment/fail`, `/payment/cancel`

Add these secrets later in **Lovable Cloud → Secrets** or your Vercel project:

```
SSLCZ_STORE_ID=xxx
SSLCZ_STORE_PASSWORD=xxx
SSLCZ_IS_LIVE=false
```

Then implement the server route at `src/routes/api/public/sslcommerz-init.ts` to POST to the SSLCommerz API and return a `GatewayPageURL` for the browser to redirect to.

## 🚀 Deploy

### GitHub
1. Connect this Lovable project to GitHub from the workspace settings.
2. Push to your repo.

### Vercel
1. Import the GitHub repo on [vercel.com](https://vercel.com).
2. Framework: **Other**. Build command: `bun run build`. Output: handled by the TanStack Start adapter.
3. Add the env vars listed above.
4. Deploy → connect your custom domain.

## 📞 Support
- Phone / WhatsApp: **01832-860787**
