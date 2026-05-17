
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "admins read roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  jela text NOT NULL,
  thana text NOT NULL,
  union_name text NOT NULL,
  gram text NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  color text NOT NULL,
  qty integer NOT NULL DEFAULT 1,
  subtotal integer NOT NULL,
  delivery integer NOT NULL,
  total integer NOT NULL,
  payment text NOT NULL,
  txn_id text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous customers) can place an order
CREATE POLICY "anyone can insert orders" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only admins can see / manage orders
CREATE POLICY "admins read orders" ON public.orders
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete orders" ON public.orders
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);

-- Seed the admin user (email maps to username JEBASHOP01)
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'jebashop01@jeba.shop',
  crypt('987654321', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"username":"JEBASHOP01"}'::jsonb,
  now(), now(), '', '', '', ''
);

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'jebashop01@jeba.shop';
