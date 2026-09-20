import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <section className="w-full px-5 pb-16 pt-28 sm:px-6 md:pt-24 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <AdminDashboard adminEmail={user.email ?? ""} />
      </div>
    </section>
  );
}
