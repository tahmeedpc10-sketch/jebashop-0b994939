CREATE TABLE public.order_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  action text NOT NULL,
  actor_user_id uuid,
  actor_email text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_audit_log_order_id ON public.order_audit_log(order_id);
CREATE INDEX idx_order_audit_log_created_at ON public.order_audit_log(created_at DESC);

ALTER TABLE public.order_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins read audit log"
  ON public.order_audit_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.log_order_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_email text := NULLIF(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email';
  v_action text;
  v_old jsonb;
  v_new jsonb;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action := 'created';
    v_new := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      v_action := 'status_changed';
    ELSE
      v_action := 'updated';
    END IF;
    v_old := to_jsonb(OLD);
    v_new := to_jsonb(NEW);
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'deleted';
    v_old := to_jsonb(OLD);
  END IF;

  INSERT INTO public.order_audit_log (order_id, action, actor_user_id, actor_email, old_data, new_data)
  VALUES (COALESCE(NEW.id, OLD.id), v_action, v_user, v_email, v_old, v_new);

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.log_order_changes();