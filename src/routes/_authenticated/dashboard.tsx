import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Route as AuthRoute } from "./route";
import { Card } from "@/components/ui/card";
import { Store, Package, CreditCard, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sellora-AI" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = AuthRoute.useRouteContext();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", user.id],
    queryFn: async () => {
      const [stores, products, sub] = await Promise.all([
        supabase.from("stores").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("subscriptions").select("plan,status").eq("user_id", user.id).maybeSingle(),
      ]);
      return {
        stores: stores.count ?? 0,
        products: products.count ?? 0,
        plan: sub.data?.plan ?? "basic",
        status: sub.data?.status ?? "trialing",
      };
    },
  });

  const greet = user.user_metadata?.full_name?.split(" ")[0] || "Pemilik UMKM";

  const cards = [
    { icon: Store, label: "Toko", value: stats?.stores ?? "—", to: "/store", tone: "bg-primary/10 text-primary" },
    { icon: Package, label: "Produk", value: stats?.products ?? "—", to: "/store", tone: "bg-amber-500/10 text-amber-600" },
    { icon: CreditCard, label: "Paket", value: stats?.plan.toUpperCase() ?? "—", to: "/subscription", tone: "bg-emerald-500/10 text-emerald-600" },
    { icon: TrendingUp, label: "Status", value: stats?.status === "active" ? "Aktif" : "Uji Coba", to: "/subscription", tone: "bg-sky-500/10 text-sky-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Halo, {greet} 👋</h1>
        <p className="text-muted-foreground mt-1">Selamat datang di dashboard Sellora-AI kamu.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} to={c.to}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.tone}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">{c.label}</p>
                <p className="text-xl font-bold mt-0.5">{c.value}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="font-bold text-lg mb-2">Mulai dari sini</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Setup toko kamu dalam 3 langkah cepat agar Sellora-AI siap menerima pesanan WhatsApp.
        </p>
        <div className="space-y-2">
          {[
            { step: "1", label: "Buat toko & atur nomor WhatsApp", to: "/store" },
            { step: "2", label: "Tambahkan menu / produk pertama", to: "/store" },
            { step: "3", label: "Pilih paket langganan yang sesuai", to: "/subscription" },
          ].map((s) => (
            <Link
              key={s.step}
              to={s.to}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {s.step}
              </span>
              <span className="flex-1 text-sm font-medium">{s.label}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
