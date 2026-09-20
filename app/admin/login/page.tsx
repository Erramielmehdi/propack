import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getAdminUser } from "@/lib/admin-auth";
import { isAdminConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return (
    <section className="w-full px-5 pb-16 pt-28 sm:px-6 md:pt-24 lg:px-10">
      <AdminLogin configured={isAdminConfigured()} />
    </section>
  );
}
