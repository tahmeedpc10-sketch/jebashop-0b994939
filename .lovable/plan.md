# Harden Admin Access (Server-Side Verification)

## Context

The scanner flagged the admin panel as bypassable via a `sessionStorage` flag. The current code in `src/routes/admin.tsx` actually already uses real Supabase auth (`signInWithPassword`) and the `orders` / `order_audit_log` tables are protected by RLS policies that require `has_role(auth.uid(), 'admin')`. So data is already safe from non-admins — even a tampered client cannot read orders.

However, the UI gate is still purely client-side: it only checks "is there a session?", not "is this user an admin?". A signed-in non-admin would see an empty dashboard shell. We'll close that gap by verifying the admin role on the server before rendering anything.

Order visibility across devices already works (orders live in the shared Lovable Cloud DB, and any signed-in admin reads them via RLS), so no change is needed there.

## Changes

1. **New server function** `src/lib/admin.functions.ts` — `verifyAdmin()` using `requireSupabaseAuth` middleware; calls `has_role(auth.uid(), 'admin')` and returns `{ isAdmin, email }`. Throws on no session.

2. **`src/routes/admin.tsx`** — replace the `useEffect` session check with:
   - Call `verifyAdmin` after sign-in / on mount via `useServerFn`.
   - If not admin → sign out and show "এই অ্যাকাউন্টে অ্যাডমিন অনুমতি নেই" on the login screen.
   - Keep the existing `signInWithPassword` login form.
   - No `sessionStorage` anywhere.

3. **Mark security finding `admin_auth_bypass` as fixed** with explanation that auth is now Supabase-session + server-verified admin role + RLS on all tables.

## Not changed

- DB schema, RLS policies, audit log trigger — already correct.
- Order list / audit panel UI.
- Checkout flow.

## Technical notes

- `verifyAdmin` runs server-side, so a tampered client cannot fake `isAdmin: true`.
- Even without the UI gate, `getOrders()` / `getAuditLog()` would return empty for non-admins because of RLS — this change is defense-in-depth + a cleaner UX (explicit "no permission" message instead of a blank dashboard).
