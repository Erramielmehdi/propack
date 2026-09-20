import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getAdminUser } from "@/lib/admin-auth";
import { isAdminConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return (
    <section className="w-full">
      <AdminLogin configured={isAdminConfigured()} />
    </section>
  );
}
