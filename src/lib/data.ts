import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const roomsQuery = queryOptions({
  queryKey: ["rooms"],
  queryFn: async () => {
    const { data, error } = await supabase.from("rooms").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const roomQuery = (slug: string) =>
  queryOptions({
    queryKey: ["room", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("rooms").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async () => {
    const { data, error } = await supabase.from("services").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const activitiesQuery = queryOptions({
  queryKey: ["activities"],
  queryFn: async () => {
    const { data, error } = await supabase.from("activities").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: async () => {
    const { data, error } = await supabase.from("testimonials").select("*").eq("active", true).order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});
