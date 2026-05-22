-- Make union_name optional and enable realtime for orders + audit log
ALTER TABLE public.orders ALTER COLUMN union_name DROP NOT NULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_audit_log;

-- Attach audit trigger to orders if not present
DROP TRIGGER IF EXISTS trg_log_order_changes ON public.orders;
CREATE TRIGGER trg_log_order_changes
AFTER INSERT OR UPDATE OR DELETE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.log_order_changes();