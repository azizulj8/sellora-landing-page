import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  Zap,
  Smartphone,
  MessageCircle,
  UserX,
  ClipboardX,
  BarChart3,
  X,
  Check,
  QrCode,
  Bot,
  Bell,
  Sparkles,
  Coffee,
  Utensils,
  Store,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { WhatsAppMockup } from "@/components/landing/WhatsAppMockup";
import { DashboardMockup } from "@/components/landing/DashboardMockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QueueIt — Antrean WhatsApp Otomatis untuk UMKM" },
      {
        name: "description",
        content:
          "QueueIt membantu UMKM menerima pesanan, mengatur antrean, dan memberi notifikasi otomatis lewat WhatsApp. Tanpa install app. Setup 5 menit.",
      },
      { property: "og:title", content: "QueueIt — Antrean WhatsApp Otomatis untuk UMKM" },
      {
        property: "og:description",
        content:
          "Pesanan ramai tidak lagi berarti antrean berantakan. AI order assistant + smart queue lewat WhatsApp.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "QueueIt",
          description:
            "QueueIt membantu UMKM menerima pesanan, mengatur antrean, dan memberi notifikasi otomatis lewat WhatsApp.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, WhatsApp",
          offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
        }),
      },
    ],
  }),
  component: LandingPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

function EyebrowChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground antialiased pb-20 md:pb-0">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute inset-0 gradient-radial-primary" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div {...fadeUp}>
            <EyebrowChip>AI WhatsApp Queue · untuk UMKM</EyebrowChip>
            <h1 className="mt-5 text-[40px] leading-[1.05] sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-balance">
              Pesanan ramai tidak lagi berarti{" "}
              <span className="relative inline-block text-primary">
                antrean berantakan
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 5 Q 50 1, 100 4 T 198 3"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    className="text-primary/60"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-soft max-w-xl text-pretty">
              QueueIt membantu UMKM menerima pesanan, mengatur antrean, dan memberi notifikasi
              otomatis langsung lewat WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta">
                <Button variant="hero" size="xl" className="rounded-full">
                  🚀 Mulai Gratis <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="#demo" aria-label="Lihat demo QueueIt">
                <Button variant="outline" size="xl" className="rounded-full" aria-label="Lihat demo QueueIt">
                  <Play className="h-4 w-4" /> Lihat Demo
                </Button>
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              {[
                { icon: Smartphone, label: "Tanpa Install App" },
                { icon: Zap, label: "Setup 5 Menit" },
                { icon: MessageCircle, label: "WhatsApp First" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right mockups */}
          <div className="relative h-[520px] sm:h-[580px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 animate-float">
              <WhatsAppMockup />
            </div>
            <div className="hidden sm:block absolute -right-2 lg:right-0 bottom-0 animate-float [animation-delay:1.5s]">
              <DashboardMockup />
            </div>
            {/* glow */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-50">
              <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <Section className="!py-16">
        <motion.div {...fadeUp} className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
            Dirancang untuk bisnis yang ingin melayani lebih cepat
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Store, label: "Warung" },
              { icon: Coffee, label: "Coffee Shop" },
              { icon: Utensils, label: "Catering" },
              { icon: Building2, label: "Food Court" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 py-6 rounded-2xl border border-border bg-surface"
              >
                <Icon className="h-5 w-5 text-ink-soft" />
                <span className="font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" className="bg-surface">
        <motion.div {...fadeUp} className="max-w-2xl">
          <EyebrowChip>Masalah</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Revenue bocor karena antrean manual.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Setiap menit pelanggan menunggu, peluang penjualan menghilang.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: UserX,
              title: "Pelanggan pergi sebelum membeli",
              desc: "Antrean panjang membuat customer mencari tempat lain dan tidak pernah kembali.",
            },
            {
              icon: ClipboardX,
              title: "Pesanan sering salah",
              desc: "Catatan manual menyebabkan error, komplain, dan refund yang merugikan margin.",
            },
            {
              icon: BarChart3,
              title: "Tidak ada data bisnis",
              desc: "Owner sulit mengetahui jam sibuk, menu terlaris, dan performa harian outlet.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl bg-card border border-border/80 p-7 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* BEFORE VS AFTER */}
      <Section>
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <EyebrowChip>Before vs After</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Dari kacau jadi otomatis.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {/* Manual */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-border bg-surface p-7"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive">
                <X className="h-4 w-4" />
              </span>
              <h3 className="text-xl font-bold">Manual Process</h3>
            </div>
            <ol className="mt-6 space-y-3">
              {["Customer datang", "Menunggu di antrean", "Kasir mencatat manual", "Dapur bingung & lambat"].map(
                (step) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl bg-white border border-border/70 px-4 py-3 text-ink"
                  >
                    <X className="h-4 w-4 text-destructive shrink-0" />
                    <span className="font-medium">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </motion.div>

          {/* QueueIt */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-7 shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <h3 className="text-xl font-bold">QueueIt Process</h3>
            </div>
            <ol className="mt-6 space-y-3">
              {["Customer scan QR → WhatsApp", "AI memahami pesanan", "Smart queue otomatis", "Notifikasi siap diambil"].map(
                (step) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl bg-white border border-primary/20 px-4 py-3 text-ink"
                  >
                    <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={3} />
                    <span className="font-medium">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </motion.div>
        </div>
      </Section>

      {/* SOLUTION */}
      <Section id="solution" className="bg-surface">
        <motion.div {...fadeUp} className="max-w-2xl">
          <EyebrowChip>Solusi</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Satu WhatsApp untuk mengatur semua pesanan.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Tidak ada app baru, tidak ada training panjang. Langsung jalan di hari pertama.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Bot,
              title: "AI Order Assistant",
              desc: "AI memahami menu, jumlah, variasi, dan menjawab pertanyaan customer 24/7.",
              tag: "AI Powered",
            },
            {
              icon: MessageCircle,
              title: "Smart Queue",
              desc: "Generate nomor antrean otomatis, track status, dan distribusi ke dapur secara real-time.",
              tag: "Real-time",
            },
            {
              icon: Bell,
              title: "Customer Notification",
              desc: "Update progres pesanan langsung ke WhatsApp customer — tanpa harus bertanya.",
              tag: "Otomatis",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-7 hover:border-primary/40 transition-all"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <span className="mt-5 inline-block text-[10px] font-bold uppercase tracking-wider text-primary">
                  {f.tag}
                </span>
                <h3 className="mt-1 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-ink-soft leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* DEMO */}
      <Section id="demo">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <EyebrowChip>Demo Interaktif</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Lihat QueueIt bekerja dalam 30 detik.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Dari customer scan QR sampai notifikasi pesanan siap diambil.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-14 relative rounded-3xl border border-border bg-gradient-to-br from-surface to-card p-6 sm:p-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <div className="flex justify-center">
              <WhatsAppMockup />
            </div>

            <div className="hidden lg:flex flex-col items-center gap-4 text-primary">
              <ArrowRight className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-wider rotate-0">Sync Real-time</span>
              <ArrowRight className="h-6 w-6" />
            </div>

            <div className="flex justify-center">
              <DashboardMockup />
            </div>
          </div>

          <div className="relative mt-10 grid sm:grid-cols-4 gap-3 text-sm">
            {[
              "Customer order",
              "AI understands order",
              "Queue created",
              "Customer notified",
            ].map((label, i) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl bg-white border border-border px-4 py-3"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="bg-surface">
        <motion.div {...fadeUp} className="max-w-2xl">
          <EyebrowChip>Cara Kerja</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            3 langkah. Selesai.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { n: "01", icon: QrCode, title: "Scan QR", desc: "Customer scan QR di meja atau outlet kamu." },
            { n: "02", icon: MessageCircle, title: "Chat WhatsApp", desc: "AI bantu pilih menu dan konfirmasi pesanan otomatis." },
            { n: "03", icon: Bell, title: "Pickup Order", desc: "Customer terima notifikasi saat pesanan siap diambil." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative rounded-3xl bg-card border border-border p-8"
            >
              <span className="text-7xl font-extrabold tracking-tighter text-primary/20">{s.n}</span>
              <div className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <EyebrowChip>Pricing</EyebrowChip>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            Mulai gratis. Upgrade saat siap.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Tanpa kartu kredit. Tanpa kontrak panjang.</p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-5 items-stretch">
          {[
            {
              name: "FREE",
              price: "Rp0",
              suffix: "selamanya",
              desc: "Cocok untuk warung baru mulai.",
              features: ["Basic Queue Management", "QR ordering", "Hingga 30 order/hari"],
              cta: "Mulai Gratis",
              variant: "outline" as const,
              highlight: false,
            },
            {
              name: "BASIC",
              price: "Rp49K",
              suffix: "/bulan",
              desc: "Untuk UMKM yang ingin otomatis.",
              features: ["Semua fitur Free", "AI Order Assistant", "WhatsApp Notification", "Unlimited order"],
              cta: "Coba 14 Hari Gratis",
              variant: "hero" as const,
              highlight: true,
            },
            {
              name: "PRO",
              price: "Rp99K",
              suffix: "/bulan",
              desc: "Untuk bisnis multi-outlet.",
              features: ["Semua fitur Basic", "Analytics & Reporting", "Multi outlet", "Priority support"],
              cta: "Pilih Pro",
              variant: "outline" as const,
              highlight: false,
            },
          ].map((p) => (
            <motion.div
              key={p.name}
              {...fadeUp}
              className={
                "relative rounded-3xl p-8 flex flex-col " +
                (p.highlight
                  ? "bg-deep text-deep-foreground border border-primary/40 shadow-[var(--shadow-glow)] scale-[1.02]"
                  : "bg-card text-foreground border border-border")
              }
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                  Most Popular
                </span>
              )}
              <p className={"text-sm font-bold tracking-wider " + (p.highlight ? "text-primary" : "text-ink-soft")}>
                {p.name}
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-5xl font-extrabold tracking-tight">{p.price}</span>
                <span className={"pb-2 text-sm " + (p.highlight ? "text-white/60" : "text-ink-soft")}>
                  {p.suffix}
                </span>
              </div>
              <p className={"mt-2 text-sm " + (p.highlight ? "text-white/70" : "text-ink-soft")}>{p.desc}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full mt-0.5 " +
                        (p.highlight ? "bg-primary/20 text-primary" : "bg-primary/15 text-primary")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={p.highlight ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#cta" className="mt-8">
                <Button
                  variant={p.variant}
                  size="lg"
                  className={"w-full rounded-full " + (!p.highlight ? "" : "")}
                >
                  {p.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
              <span className="relative grid place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>
              Live & ready
            </span>
            <h2 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance">
              Jangan kehilangan pelanggan karena antrean.
            </h2>
            <p className="mt-5 text-lg text-white/70 text-pretty">
              Mulai gunakan QueueIt hari ini dan rasakan bedanya di jam sibuk pertama.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="xl" className="rounded-full">
                🚀 Mulai Gratis Sekarang <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="heroOutline" size="xl" className="rounded-full">
                Hubungi Tim Kami
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/50">
              Gratis selamanya · Tanpa kartu kredit · Setup 5 menit
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-extrabold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
              </span>
              QueueIt
            </div>
            <p className="mt-3 text-sm text-ink-soft max-w-xs">
              AI WhatsApp Queue Management untuk UMKM Indonesia.
            </p>
          </div>
          {[
            { title: "Produk", items: ["Fitur", "Pricing", "Demo", "Roadmap"] },
            { title: "Perusahaan", items: ["Tentang", "Blog", "Karir", "Kontak"] },
            { title: "Legal", items: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {col.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-foreground transition-colors">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-xs text-ink-soft flex flex-wrap justify-between gap-2">
            <p>© {new Date().getFullYear()} QueueIt. Dibuat untuk UMKM Indonesia.</p>
            <p>Made with WhatsApp 💚</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
