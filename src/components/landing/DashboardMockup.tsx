import { motion } from "motion/react";
import { TrendingUp, Clock, ChefHat, CheckCircle2 } from "lucide-react";

const rows = [
  { id: "#021", status: "Ready", tone: "bg-primary/15 text-primary", icon: CheckCircle2 },
  { id: "#022", status: "Cooking", tone: "bg-amber-100 text-amber-700", icon: ChefHat },
  { id: "#023", status: "Waiting", tone: "bg-slate-100 text-slate-600", icon: Clock },
];

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl bg-white border border-border/80 shadow-[var(--shadow-card)] p-5 w-[280px]"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold">Today's Queue</p>
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-accent text-accent-foreground">LIVE</span>
      </div>

      <ul className="space-y-2 mb-5">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <li key={r.id} className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
              <span className="font-mono text-sm font-semibold">{r.id}</span>
              <span className={`text-[11px] font-medium px-2 py-1 rounded-md inline-flex items-center gap-1 ${r.tone}`}>
                <Icon className="h-3 w-3" /> {r.status}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-3">
        <p className="text-[10px] uppercase tracking-wider text-ink-soft">Revenue hari ini</p>
        <div className="flex items-end justify-between mt-1">
          <p className="text-xl font-extrabold tracking-tight">Rp3.450.000</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> +32%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
