
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'merchant', 'customer');
CREATE TYPE public.subscription_plan AS ENUM ('basic', 'pro', 'enterprise');
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'merchant') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

-- user_roles (created before trigger uses it)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- now trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- stores
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  wa_number TEXT NOT NULL,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stores TO authenticated;
GRANT SELECT ON public.stores TO anon;
GRANT ALL ON public.stores TO service_role;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner manage stores" ON public.stores FOR ALL TO authenticated
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "active stores public" ON public.stores FOR SELECT TO anon USING (is_active = true);
CREATE TRIGGER trg_stores_updated BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_stores_owner ON public.stores(owner_id);

-- products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT SELECT ON public.products TO anon;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner manage products" ON public.products FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "public read available products" ON public.products FOR SELECT TO anon
  USING (is_available = true AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.is_active = true));
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_products_store ON public.products(store_id);

-- subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan public.subscription_plan NOT NULL DEFAULT 'basic',
  status public.subscription_status NOT NULL DEFAULT 'trialing',
  current_period_end TIMESTAMPTZ,
  provider TEXT,
  provider_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own subscription" ON public.subscriptions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_subscriptions_updated BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
