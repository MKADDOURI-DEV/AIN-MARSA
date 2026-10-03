
create type public.app_role as enum ('admin');
create type public.booking_status as enum ('nouvelle','en_attente','confirmee','refusee','annulee','terminee');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  images text[] not null default '{}',
  bed_type text,
  capacity int not null default 2,
  surface_m2 int,
  view text,
  amenities text[] not null default '{}',
  price_mad numeric,
  quantity int not null default 1,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.rooms to anon, authenticated;
grant insert, update, delete on public.rooms to authenticated;
grant all on public.rooms to service_role;
alter table public.rooms enable row level security;
create policy "public read active rooms" on public.rooms for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin manage rooms" on public.rooms for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  active boolean not null default true,
  sort_order int not null default 0
);
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
create policy "public read services" on public.services for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin manage services" on public.services for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text,
  duration text,
  level text,
  price_mad numeric,
  location text,
  category text,
  active boolean not null default false,
  sort_order int not null default 0
);
grant select on public.activities to anon, authenticated;
grant insert, update, delete on public.activities to authenticated;
grant all on public.activities to service_role;
alter table public.activities enable row level security;
create policy "public read activities" on public.activities for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin manage activities" on public.activities for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  first_name text not null,
  country text,
  platform text,
  rating int,
  review_date date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "public read testimonials" on public.testimonials for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin manage testimonials" on public.testimonials for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default ('AM-' || upper(substr(md5(random()::text),1,6))),
  guest_name text not null,
  phone text not null,
  email text not null,
  check_in date not null,
  check_out date not null,
  adults int not null default 2,
  children int not null default 0,
  rooms_count int not null default 1,
  room_id uuid references public.rooms(id) on delete set null,
  estimated_price numeric,
  notes text,
  status booking_status not null default 'nouvelle',
  created_at timestamptz not null default now()
);
grant insert on public.bookings to anon, authenticated;
grant select, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
create policy "anyone can request booking" on public.bookings for insert to anon, authenticated with check (status = 'nouvelle' and check_out > check_in);
create policy "admin read bookings" on public.bookings for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update bookings" on public.bookings for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete bookings" on public.bookings for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can send message" on public.contact_messages for insert to anon, authenticated with check (read = false);
create policy "admin read messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.services (title, description, icon, sort_order) values
('Wi-Fi gratuit','Connexion sans fil offerte dans l''établissement.','wifi',1),
('Parking privé gratuit','Stationnement privé sur place, sans frais.','car',2),
('Chambres familiales','Des chambres adaptées aux séjours en famille.','users',3),
('Chambres non-fumeurs','Un air pur, à l''intérieur comme à l''extérieur.','wind',4),
('Climatisation','Confort thermique selon les chambres.','snowflake',5),
('Jardin','Un espace vert pour se reposer au calme.','trees',6),
('Terrasse','Profiter du grand air et de la vue.','sun',7),
('Petit-déjeuner','Pour bien commencer la journée dans le Moyen Atlas.','coffee',8),
('Vue montagne','Selon les chambres, une vue sur les reliefs.','mountain',9);
