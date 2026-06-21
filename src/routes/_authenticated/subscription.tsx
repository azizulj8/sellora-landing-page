import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Route as AuthRoute } from "./route";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/subscription")({
  head: () => ({ meta: [{ title: "Langganan — Sellora-AI" }] }),
  component: SubscriptionPage,
});

type Plan = "basic" | "pro" | "enterprise";

const plans: { id: Plan; name: string; price: string; desc: string; features: string[]; popular?: boolean }[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 0",
    desc: "Cocok untuk memulai",
    features: ["1 toko aktif", "Hingga 20 produk", "Auto-reply WhatsApp dasar", "Antrean otomatis"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 99.000",
    desc: "Untuk UMKM yang berkembang",
    features: ["3 toko aktif", "Produk tanpa batas", "Notifikasi status real-time", "Dashboard pendapatan", "Prioritas dukungan"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Rp 299.000",
    desc: "Skala bisnis penuh",
    features: ["Toko tanpa batas", "Multi-admin & staff", "Integrasi POS & pembayaran", "Laporan lanjutan", "Dukungan dedicated"],
  },
];

function SubscriptionPage() {
  const { user } = AuthRoute.useRouteContext();
  const qc = useQueryClient();

  const subQ = useQuery({
    queryKey: ["my-subscription", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const changePlan = useMutation({
    mutationFn: async (plan: Plan) => {
      const payload = {
        user_id: user.id,
        plan,
        status: "active" as const,
        provider: "manual",
      };
      if (subQ.data) {
        const { error } = await supabase.from("subscriptions").update(payload).eq("id", subQ.data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("subscriptions").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Paket berhasil diubah");
      qc.invalidateQueries({ queryKey: ["my-subscription"] });
    },
    onError: (e: any) => toast.error(e.message || "Gagal mengubah paket"),
  });

  const cancel = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("subscriptions").update({ status: "canceled" }).eq("id", subQ.data!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Langganan dibatalkan");
      qc.invalidateQueries({ queryKey: ["my-subscription"] });
    },
  });

  const current = subQ.data?.plan ?? "basic";
  const status = subQ.data?.status ?? "trialing";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Langganan</h1>
        <p className="text-muted-foreground mt-1">Pilih paket yang paling sesuai dengan kebutuhan bisnis kamu.</p>
      </div>

      {subQ.data && (
        <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Paket saat ini</p>
            <p className="text-xl font-bold">
              {current.toUpperCase()}{" "}
              <span className={cn(
                "ml-2 text-xs font-medium px-2 py-1 rounded-full",
                status === "active" ? "bg-emerald-500/15 text-emerald-700" : "bg-amber-500/15 text-amber-700"
              )}>
                {status === "active" ? "Aktif" : status === "canceled" ? "Dibatalkan" : "Uji Coba"}
              </span>
            </p>
          </div>
          {status === "active" && (
            <Button variant="outline" onClick={() => { if (confirm("Batalkan langganan?")) cancel.mutate(); }}>
              Batalkan Langganan
            </Button>
          )}
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => {
          const isCurrent = current === p.id && status === "active";
          return (
            <Card
              key={p.id}
              className={cn(
                "p-6 flex flex-col relative",
                p.popular && "border-primary shadow-lg"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  PALING POPULER
                </span>
              )}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="my-4">
                <span className="text-3xl font-extrabold">{p.price}</span>
                <span className="text-muted-foreground text-sm">/bulan</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={p.popular ? "default" : "outline"}
                disabled={isCurrent || changePlan.isPending}
                onClick={() => changePlan.mutate(p.id)}
              >
                {changePlan.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isCurrent ? (
                  "Paket Aktif"
                ) : current === "basic" ? (
                  "Berlangganan"
                ) : (
                  "Pilih Paket Ini"
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Integrasi pembayaran (Stripe/Midtrans) akan diaktifkan pada tahap berikutnya. Saat ini perubahan paket berlaku langsung untuk demo.
      </p>
    </div>
  );
}
