"use client";

import { LogOut, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";
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
      <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-center">
        <div className="min-w-0">
          <p className="label-track mb-1 text-cream/50">Administration</p>
          <h1 className="font-display text-3xl leading-none text-cream sm:text-4xl">
            Tableau de bord
          </h1>
          <p className="mt-2 break-all text-xs text-cream/55">{adminEmail}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            aria-label="Actualiser les devis"
            title="Actualiser"
            className="grid h-11 w-11 place-items-center rounded-md border border-gold-border text-cream/65 transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={logout}
            aria-label="Se déconnecter"
            title="Déconnexion"
            className="grid h-11 w-11 place-items-center rounded-md border border-gold-border text-cream/65 transition-colors hover:border-gold hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-2 sm:mb-8 sm:gap-4 lg:grid-cols-4">
        <StatTile label="Devis" value={fmtInt(stats.count)} />
        <StatTile label="Chiffre estimé" value={fmtDH(stats.revenue)} />
        <StatTile label="Unités" value={fmtInt(stats.units)} />
        <StatTile label="Panier moyen" value={fmtDH(stats.average)} />
      </div>

      {loading && devis.length === 0 && (
        <div className="surface p-6 text-center text-sm text-cream/60" role="status">
          Chargement…
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-error/40 bg-error/10 p-4">
          <p className="text-sm text-error">{error}</p>
          <button
            type="button"
            onClick={() => void load()}
            className="shrink-0 text-xs font-semibold text-error underline underline-offset-4"
          >
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && devis.length === 0 && (
        <p className="surface p-8 text-center text-cream/55">
          Aucun devis enregistré pour l'instant.
        </p>
      )}

      {devis.length > 0 && (
        <section aria-labelledby="quotes-heading">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 id="quotes-heading" className="font-display text-2xl text-cream">
              Demandes récentes
            </h2>
            <span className="font-mono text-[0.65rem] uppercase tracking-tech text-gold/70">
              {fmtInt(devis.length)} devis
            </span>
          </div>

          <div className="space-y-3 md:hidden">
            {devis.map((item) => (
              <MobileQuoteCard
                key={item.id}
                item={item}
                onStatus={setStatus}
                onRemove={remove}
              />
            ))}
          </div>

          <div className="surface hidden overflow-x-auto md:block">
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
                    {item.client_email && (
                      <a
                        href={`mailto:${item.client_email}`}
                        className="block max-w-40 truncate text-xs hover:text-gold"
                        title={item.client_email}
                      >
                        {item.client_email}
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
        </section>
      )}
    </div>
  );
}

function MobileQuoteCard({
  item,
  onStatus,
  onRemove,
}: {
  item: DevisRecord;
  onStatus: (id: string, status: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  return (
    <article className="surface overflow-hidden rounded-lg">
      <div className="flex items-start justify-between gap-3 border-b border-gold-border/50 p-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-semibold text-gold" title={item.id}>
            {item.id}
          </p>
          <p className="mt-1 text-xs text-cream/45">{formatDate(item.created_at)}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[0.65rem] uppercase text-cream/45">Total HT</p>
          <p className="font-display text-xl font-semibold text-gold-light">
            {fmtDH(item.total_price)}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 text-sm">
        <QuoteDetail label="Produit" value={item.product_type} />
        <QuoteDetail label="Dimensions" value={`Ø ${item.diameter_mm} × ${item.height_mm} mm`} />
        <QuoteDetail label="Quantité" value={fmtInt(item.quantity)} />
        <QuoteDetail
          label="Remise"
          value={item.discount_pct > 0 ? fmtPct(item.discount_pct) : "—"}
        />
      </dl>

      <div className="border-t border-gold-border/40 px-4 py-3">
        <p className="text-[0.65rem] uppercase text-cream/45">Client</p>
        <p className="mt-1 font-semibold text-cream">{item.client_name || "Non renseigné"}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.client_phone && (
            <a
              href={`tel:${item.client_phone}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-gold-border px-3 py-2 text-xs text-cream/75"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              {item.client_phone}
            </a>
          )}
          {item.client_email && (
            <a
              href={`mailto:${item.client_email}`}
              className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-md border border-gold-border px-3 py-2 text-xs text-cream/75"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="break-all">{item.client_email}</span>
            </a>
          )}
        </div>
      </div>

      <div className="flex items-end gap-3 border-t border-gold-border/40 p-4">
        <label className="min-w-0 flex-1">
          <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-tech text-gold/70">
            Statut
          </span>
          <select
            value={item.status}
            onChange={(event) => void onStatus(item.id, event.target.value)}
            className="h-11 w-full rounded-md border border-gold-border bg-noir-800 px-3 text-sm text-cream outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/30"
            aria-label={`Statut du devis ${item.id}`}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => void onRemove(item.id)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-error/40 text-error transition-colors hover:bg-error/10"
          aria-label={`Supprimer le devis ${item.id}`}
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function QuoteDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.65rem] uppercase text-cream/45">{label}</dt>
      <dd className="mt-0.5 break-words text-cream/80">{value}</dd>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-MA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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
    <div className="surface min-w-0 p-3 sm:p-5">
      <div className="min-h-8 font-mono text-[0.58rem] font-medium uppercase leading-4 tracking-tech text-cream/55 sm:min-h-0 sm:text-[0.7rem]">
        {label}
      </div>
      <div className="mt-1 break-words font-display text-lg leading-tight text-gold-light sm:text-2xl">
        {value}
      </div>
    </div>
  );
}
