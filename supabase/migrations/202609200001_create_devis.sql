create sequence if not exists public.devis_number_seq start 1;

create table if not exists public.devis (
  id text primary key default ('DV-' || lpad(nextval('public.devis_number_seq')::text, 5, '0')),
  product_type text not null,
  diameter_mm integer not null check (diameter_mm > 0),
  height_mm integer not null check (height_mm > 0),
  quantity integer not null check (quantity > 0),
  diameter_rate double precision not null,
  body_area double precision not null,
  lid_area double precision not null,
  total_area double precision not null,
  extras_json text not null default '[]',
  extras_cost double precision not null default 0,
  unit_price double precision not null,
  discount_pct double precision not null default 0,
  unit_discounted double precision not null,
  total_price double precision not null,
  client_date text not null default '',
  client_code text not null default '',
  client_name text not null default '',
  client_phone text not null default '',
  client_email text not null default '',
  client_address text not null default '',
  notes text not null default '',
  status text not null default 'nouveau'
    check (status in ('nouveau', 'en cours', 'accepté', 'refusé')),
  created_at timestamptz not null default now()
);

create index if not exists devis_created_at_idx
  on public.devis (created_at desc);

alter table public.devis enable row level security;

revoke all on table public.devis from anon, authenticated;
revoke all on sequence public.devis_number_seq from anon, authenticated;
grant all on table public.devis to service_role;
grant usage, select on sequence public.devis_number_seq to service_role;
