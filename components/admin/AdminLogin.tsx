"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoldButton } from "@/components/ui/GoldButton";
import { Input } from "@/components/ui/Input";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Connexion impossible.");

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="mb-2 font-display text-3xl text-cream sm:text-4xl">Administration</h1>
      <p className="mb-6 text-sm text-cream/65">
        Accès sécurisé réservé à l'équipe ProPack.
      </p>

      {!configured && (
        <div className="mb-5 border border-error/40 bg-error/10 p-4 text-sm text-error">
          Supabase et l'adresse administrateur doivent être configurés dans les
          variables d'environnement avant la première connexion.
        </div>
      )}

      <form onSubmit={submit} className="surface space-y-4 rounded-lg p-4 sm:p-6">
        <Input
          id="admin-email"
          label="E-mail"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          id="admin-password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          error={error}
          onChange={(event) => setPassword(event.target.value)}
        />
        <GoldButton type="submit" block disabled={!configured || loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </GoldButton>
      </form>
    </div>
  );
}
