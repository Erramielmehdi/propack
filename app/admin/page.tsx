"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DevisRecord } from "@/lib/calculator/types";
import { fmtDH, fmtInt, fmtPct } from "@/lib/format";
import { GoldButton } from "@/components/ui/GoldButton";
import { Input } from "@/components/ui/Input";

/**
 * Admin panel (stretch scaffold).
 *
 * Auth here is a lightweight client-side gate for demonstration only — it is
 * NOT a security boundary. Replace with real server-side auth (NextAuth,
 * middleware + session cookie) before exposing real data.
 */

const DEMO_PASSWORD = "propack2026";
const AUTH_KEY = "propack:admin-auth";
const STATUSES = ["nouveau", "en cours", "accepté", "refusé"] as const;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === DEMO_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-2 font-display text-3xl text-cream">Administration</h1>
      <p className="mb-6 text-sm text-cream/65">Accès réservé à l'équipe ProPack.</p>
      <form onSubmit={submit} className="surface rounded-2xl p-6">
        <Input
          id="admin-pw"
          label="Mot de passe"
          type="password"
          value={pw}
          error={error}
          onChange={(e) => setPw(e.target.value)}
        />
        <div className="mt-5">
          <GoldButton type="submit" block>
            Se connecter
          </GoldButton>
        </div>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [devis, setDevis] = useState<DevisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/devis");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDevis(data.devis ?? []);
    } catch {
      setError("Impossible de charger les devis.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const count = devis.length;
    const revenue = devis.reduce((sum, d) => sum + (d.total_price || 0), 0);
    const units = devis.reduce((sum, d) => sum + (d.quantity || 0), 0);
    const avg = count ? revenue / count : 0;
    return { count, revenue, units, avg };
  }, [devis]);

  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/devis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm(`Supprimer le devis ${id} ?`)) return;
    await fetch(`/api/devis/${id}`, { method: "DELETE" });
    load();
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    onLogout();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-cream">Tableau de bord</h1>
        <button
          onClick={logout}
          className="font-mono text-xs uppercase tracking-tech text-cream/60 transition-colors hover:text-gold"
        >
          Déconnexion
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Devis" value={fmtInt(stats.count)} />
        <StatTile label="Chiffre estimé" value={fmtDH(stats.revenue)} />
        <StatTile label="Unités" value={fmtInt(stats.units)} />
        <StatTile label="Panier moyen" value={fmtDH(stats.avg)} />
      </div>

      {loading && <p className="text-cream/60">Chargement…</p>}
      {error && <p className="text-error">{error}</p>}

      {!loading && !error && devis.length === 0 && (
        <p className="surface rounded-xl p-8 text-center text-cream/55">
          Aucun devis enregistré pour l'instant.
        </p>
      )}

      {devis.length > 0 && (
        <div className="surface overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-border text-cream/60">
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Réf.</th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Type</th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Ø×H (mm)</th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Qté</th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Remise</th>
                <th className="px-4 py-3 text-right font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">
                  Total
                </th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Client</th>
                <th className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {devis.map((d) => (
                <tr key={d.id} className="border-b border-gold-border/30 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-gold">{d.id}</td>
                  <td className="px-4 py-3 text-cream">{d.product_type}</td>
                  <td className="px-4 py-3 text-cream/70">
                    {d.diameter_mm}×{d.height_mm}
                  </td>
                  <td className="px-4 py-3 text-cream/70">{fmtInt(d.quantity)}</td>
                  <td className="px-4 py-3 text-cream/70">
                    {d.discount_pct > 0 ? fmtPct(d.discount_pct) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gold-light">
                    {fmtDH(d.total_price)}
                  </td>
                  <td className="px-4 py-3 text-cream/70">
                    {d.client_name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={d.status}
                      onChange={(e) => setStatus(d.id, e.target.value)}
                      className="surface rounded-md px-2 py-1 text-xs text-cream"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => remove(d.id)}
                      className="text-xs text-error hover:underline"
                    >
                      Suppr.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface rounded-xl p-5">
      <div className="label-track text-cream/55">{label}</div>
      <div className="mt-1 font-display text-2xl text-gold-light">{value}</div>
    </div>
  );
}
