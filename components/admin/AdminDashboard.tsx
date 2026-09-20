"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { DevisRecord } from "@/lib/calculator/types";
import { fmtDH, fmtInt, fmtPct } from "@/lib/format";

const STATUSES = ["nouveau", "en cours", "accepté", "refusé"] as const;

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [devis, setDevis] = useState<DevisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleUnauthorized = useCallback(
    (response: Response) => {
      if (response.status !== 401) return false;
      router.replace("/admin/login");
      router.refresh();
      return true;
    },
    [router],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/devis", { cache: "no-store" });
      if (handleUnauthorized(response)) return;
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chargement impossible.");
      setDevis(data.devis ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger les devis.");
    } finally {
      setLoading(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const count = devis.length;
    const revenue = devis.reduce((sum, item) => sum + (item.total_price || 0), 0);
    const units = devis.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return {
      count,
      revenue,
      units,
      average: count ? revenue / count : 0,
    };
  }, [devis]);

  const setStatus = async (id: string, status: string) => {
    setError("");
    try {
      const response = await fetch(`/api/devis/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (handleUnauthorized(response)) return;
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Mise à jour impossible.");
      setDevis((items) =>
        items.map((item) => (item.id === id ? data.devis : item)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mise à jour impossible.");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(`Supprimer le devis ${id} ?`)) return;
    setError("");
    try {
      const response = await fetch(`/api/devis/${id}`, { method: "DELETE" });
      if (handleUnauthorized(response)) return;
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Suppression impossible.");
      setDevis((items) => items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Suppression impossible.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream">Tableau de bord</h1>
          <p className="mt-1 text-xs text-cream/55">{adminEmail}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="self-start font-mono text-xs uppercase tracking-tech text-cream/60 transition-colors hover:text-gold"
        >
          Déconnexion
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Devis" value={fmtInt(stats.count)} />
        <StatTile label="Chiffre estimé" value={fmtDH(stats.revenue)} />
        <StatTile label="Unités" value={fmtInt(stats.units)} />
        <StatTile label="Panier moyen" value={fmtDH(stats.average)} />
      </div>

      {loading && <p className="text-cream/60">Chargement…</p>}
      {error && <p className="mb-4 text-error">{error}</p>}

      {!loading && !error && devis.length === 0 && (
        <p className="surface p-8 text-center text-cream/55">
          Aucun devis enregistré pour l'instant.
        </p>
      )}

      {devis.length > 0 && (
        <div className="surface overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-border text-cream/60">
                <TableHead>Réf.</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Ø×H (mm)</TableHead>
                <TableHead>Qté</TableHead>
                <TableHead>Remise</TableHead>
                <TableHead align="right">Total</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {devis.map((item) => (
                <tr key={item.id} className="border-b border-gold-border/30 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-gold">{item.id}</td>
                  <td className="px-4 py-3 text-cream">{item.product_type}</td>
                  <td className="px-4 py-3 text-cream/70">
                    {item.diameter_mm}×{item.height_mm}
                  </td>
                  <td className="px-4 py-3 text-cream/70">{fmtInt(item.quantity)}</td>
                  <td className="px-4 py-3 text-cream/70">
                    {item.discount_pct > 0 ? fmtPct(item.discount_pct) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gold-light">
                    {fmtDH(item.total_price)}
                  </td>
                  <td className="px-4 py-3 text-cream/70">
                    <span className="block">{item.client_name || "—"}</span>
                    {item.client_phone && (
                      <a href={`tel:${item.client_phone}`} className="text-xs hover:text-gold">
                        {item.client_phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(event) => setStatus(item.id, event.target.value)}
                      className="surface px-2 py-1 text-xs text-cream"
                      aria-label={`Statut du devis ${item.id}`}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
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

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-mono text-[0.65rem] uppercase tracking-tech text-gold/70 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-5">
      <div className="label-track text-cream/55">{label}</div>
      <div className="mt-1 font-display text-2xl text-gold-light">{value}</div>
    </div>
  );
}
