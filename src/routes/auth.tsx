import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk / Daftar — Sellora-AI" },
      { name: "description", content: "Masuk atau daftar akun Sellora-AI dengan Google atau email untuk mulai mengelola toko, pesanan, dan langganan." },
      { property: "og:title", content: "Masuk / Daftar — Sellora-AI" },
      { property: "og:url", content: "https://queit.vercel.app/auth" },
    ],
    links: [{ rel: "canonical", href: "https://queit.vercel.app/auth" }],
  }),
  component: AuthPage,
});

const emailSchema = z.object({
  email: z.string().trim().email("Email tidak valid").max(255),
  password: z.string().min(8, "Minimal 8 karakter").max(72),
  fullName: z.string().trim().min(2, "Nama minimal 2 karakter").max(100).optional(),
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function signInWithGoogle() {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + "/dashboard",
      }
    });

    if (error) {
      toast.error("Gagal masuk dengan Google");
      setGoogleLoading(false);
    }
    // Note: Jika sukses, Supabase akan otomatis melakukan redirect ke halaman Google, 
    // jadi tidak perlu memanggil navigate() secara manual di sini.
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = emailSchema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast.error("Email atau kata sandi salah");
      return;
    }
    toast.success("Selamat datang kembali!");
    navigate({ to: "/dashboard" });
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = emailSchema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
      fullName: fd.get("fullName"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message.includes("registered") ? "Email sudah terdaftar" : "Gagal mendaftar");
      return;
    }
    toast.success("Akun berhasil dibuat!");
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 font-extrabold mb-6 justify-center">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-xl">Sellora-AI</span>
        </Link>

        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-1">Selamat datang</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Kelola toko & pesanan WhatsApp dengan mudah
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 h-11"
            onClick={signInWithGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
                Lanjutkan dengan Google
              </>
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">atau</span></div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Masuk</TabsTrigger>
              <TabsTrigger value="signup">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-3 mt-4">
                <div className="space-y-1.5">
                  <Label htmlFor="si-email">Email</Label>
                  <Input id="si-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="si-password">Kata Sandi</Label>
                  <Input id="si-password" name="password" type="password" required autoComplete="current-password" />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Masuk"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-3 mt-4">
                <div className="space-y-1.5">
                  <Label htmlFor="su-name">Nama Lengkap</Label>
                  <Input id="su-name" name="fullName" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-email">Email</Label>
                  <Input id="su-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-password">Kata Sandi</Label>
                  <Input id="su-password" name="password" type="password" required minLength={8} autoComplete="new-password" />
                  <p className="text-xs text-muted-foreground">Minimal 8 karakter</p>
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buat Akun"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Dengan mendaftar, kamu menyetujui Ketentuan & Kebijakan Privasi kami.
        </p>
      </div>
    </main>
  );
}
