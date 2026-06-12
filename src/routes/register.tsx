import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationPicker, type LatLng } from "@/components/landing/LocationPicker";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Daftar Gratis – QueueIt" },
      {
        name: "description",
        content:
          "Daftar gratis QueueIt dan mulai kelola antrean pesanan WhatsApp untuk toko kamu dalam 5 menit.",
      },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(80),
  store: z.string().trim().min(2, "Nama toko minimal 2 karakter").max(80),
  wa: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Hanya angka, +, -, dan spasi"),
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [wa, setWa] = useState("");
  const [location, setLocation] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reverse geocode whenever the pin changes (debounced)
  useEffect(() => {
    if (!location) {
      setAddress("");
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setAddressLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}&accept-language=id`,
          { signal: ctrl.signal, headers: { Accept: "application/json" } },
        );
        const data = await res.json();
        setAddress(data?.display_name ?? "");
      } catch (err) {
        if ((err as any)?.name !== "AbortError") setAddress("");
      } finally {
        setAddressLoading(false);
      }
    }, 500);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [location?.lat, location?.lng]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, store, wa });
    const nextErrors: Record<string, string> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        nextErrors[issue.path[0] as string] = issue.message;
      }
    }
    if (!location) {
      nextErrors.location = "Tentukan lokasi toko pada peta";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    // Demo submit — wire to your backend / server fn later
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success("Pendaftaran berhasil dikirim!");
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background grid place-items-center px-5 py-16">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 grid place-items-center">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Pendaftaran terkirim 🎉</h1>
          <p className="mt-2 text-muted-foreground">
            Tim kami akan menghubungi <strong>{name}</strong> via WhatsApp dalam 1×24 jam untuk
            aktivasi toko <strong>{store}</strong>.
          </p>
          {(address || location) && (
            <div className="mt-5 text-left bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <MapPin className="h-3.5 w-3.5" /> Lokasi Toko
              </div>
              {address && <p className="mt-1.5 text-sm">{address}</p>}
              {location && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </p>
              )}
            </div>
          )}
          <Link to="/" className="inline-block mt-6">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 px-5">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>

        <div className="mt-6 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Daftar Gratis QueueIt</h1>
          <p className="mt-2 text-muted-foreground">
            Isi data toko kamu. Aktivasi gratis, tanpa kartu kredit.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Nama
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap kamu"
                maxLength={80}
                required
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="store" className="flex items-center gap-2">
                <Store className="h-4 w-4" /> Nama Toko
              </Label>
              <Input
                id="store"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder="Contoh: Warung Bu Sari"
                maxLength={80}
                required
              />
              {errors.store && <p className="text-xs text-destructive">{errors.store}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wa" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Nomor WhatsApp
              </Label>
              <Input
                id="wa"
                type="tel"
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                placeholder="08xxxxxxxxxx"
                maxLength={20}
                required
              />
              {errors.wa && <p className="text-xs text-destructive">{errors.wa}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Lokasi Toko
              </Label>
              <LocationPicker value={location} onChange={setLocation} />
              {(address || addressLoading) && (
                <p className="text-xs text-muted-foreground">
                  {addressLoading ? "Mencari alamat..." : `📍 ${address}`}
                </p>
              )}
              {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "🚀 Daftar Sekarang"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Dengan mendaftar, kamu setuju dengan syarat & ketentuan QueueIt.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
