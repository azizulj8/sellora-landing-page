import { motion } from "motion/react";
import { Check, CheckCheck } from "lucide-react";

export function WhatsAppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="relative mx-auto w-full max-w-[340px]"
    >
      <div className="rounded-[2.2rem] border border-white/10 bg-deep p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <div className="rounded-[1.8rem] bg-[oklch(0.96_0.02_152)] overflow-hidden">
          {/* WA header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white font-bold">Q</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Sellora-AI — Ayam Bakar Pak Slamet</p>
              <p className="text-[11px] opacity-80">online · AI assistant</p>
            </div>
          </div>

          {/* Chat body */}
          <div
            className="p-4 space-y-2 min-h-[360px]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(37,211,102,0.08), transparent 40%), radial-gradient(circle at 70% 70%, rgba(37,211,102,0.06), transparent 50%)",
              backgroundColor: "oklch(0.96 0.02 152)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-whatsapp-bubble px-3 py-2 text-sm text-ink shadow-sm"
            >
              Halo kak, mau pesan ayam bakar 🍗
              <span className="block mt-1 text-[10px] text-ink-soft text-right flex items-center justify-end gap-1">
                14:02 <CheckCheck className="h-3 w-3 text-primary" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-ink shadow-sm"
            >
              Siap kak 😊 Mau berapa porsi?
              <span className="block mt-1 text-[10px] text-ink-soft">14:02</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="ml-auto max-w-[60%] rounded-2xl rounded-tr-sm bg-whatsapp-bubble px-3 py-2 text-sm text-ink shadow-sm"
            >
              2 porsi, pedes
              <span className="block mt-1 text-[10px] text-ink-soft text-right flex items-center justify-end gap-1">
                14:03 <CheckCheck className="h-3 w-3 text-primary" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
              className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-ink shadow-sm"
            >
              <p className="font-medium mb-2">Pesanan dikonfirmasi ✅</p>
              <div className="rounded-xl bg-accent/60 border border-primary/20 p-3 text-center">
                <p className="text-[11px] uppercase tracking-wider text-ink-soft">Nomor Antrean</p>
                <p className="text-3xl font-extrabold text-primary leading-none mt-1">#024</p>
                <p className="text-[11px] text-ink-soft mt-2">Estimasi selesai · 15 menit</p>
              </div>
              <span className="block mt-2 text-[10px] text-ink-soft">14:03</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
