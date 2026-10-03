
revoke execute on function public.has_role(uuid, app_role) from public, anon;
grant execute on function public.has_role(uuid, app_role) to authenticated;

drop policy "public read active rooms" on public.rooms;
create policy "anon read active rooms" on public.rooms for select to anon using (active);
create policy "auth read rooms" on public.rooms for select to authenticated using (active or public.has_role(auth.uid(),'admin'));

drop policy "public read services" on public.services;
create policy "anon read services" on public.services for select to anon using (active);
create policy "auth read services" on public.services for select to authenticated using (active or public.has_role(auth.uid(),'admin'));

drop policy "public read activities" on public.activities;
create policy "anon read activities" on public.activities for select to anon using (active);
create policy "auth read activities" on public.activities for select to authenticated using (active or public.has_role(auth.uid(),'admin'));

drop policy "public read testimonials" on public.testimonials;
create policy "anon read testimonials" on public.testimonials for select to anon using (active);
create policy "auth read testimonials" on public.testimonials for select to authenticated using (active or public.has_role(auth.uid(),'admin'));
