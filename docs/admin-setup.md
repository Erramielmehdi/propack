# Secure admin setup

The application code is ready for Supabase, but the external project and
secrets must be created in the owner's Supabase account before deployment.

## 1. Create the Supabase project

1. Create a project at https://supabase.com/dashboard.
2. Open **SQL Editor**.
3. Run `supabase/migrations/202609200001_create_devis.sql`.

The migration creates the quotation table, human-readable `DV-00001` IDs,
status validation, an index, and row-level security. Browser roles receive no
direct table access; all database operations stay on the server.

## 2. Create the administrator

1. Open **Authentication > Users**.
2. Choose **Add user**.
3. Create the administrator with an email address and strong password.
4. Keep email confirmation enabled for any future invited administrators.

## 3. Collect the project keys

Use the Supabase **Connect** dialog or **Project Settings > API** to obtain:

- Project URL
- Publishable key
- Service-role key

The service-role key is secret and must never use a `NEXT_PUBLIC_` name.

## 4. Configure the local project

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
ADMIN_EMAILS=admin@example.com
```

Multiple administrators can be allowed with comma-separated emails:

```env
ADMIN_EMAILS=owner@example.com,manager@example.com
```

## 5. Configure Vercel

In **Vercel > propack > Settings > Environment Variables**, add the same four
variables for Production, Preview, and Development. Redeploy after saving.

## 6. Verify

1. Submit a test quotation from `/calcule`.
2. Open `/admin/login` and sign in with the Supabase administrator.
3. Confirm the quotation appears in `/admin`.
4. Change its status, refresh, and confirm the change persists.
5. Log out and confirm `/api/devis` returns `401` outside the admin session.
