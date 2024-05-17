drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

alter table "public"."polls" drop constraint "polls_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_username_key";

drop table "public"."profiles";

create table "public"."users" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text not null,
    "full_name" text not null,
    "avatar_url" text,
    "billing_address" jsonb,
    "payment_method" jsonb,
    "country" text,
    "city" text,
    "gender" gender,
    "relationship_status" marital_status,
    "birthday_date" date,
    "instagram_username" text,
    "data_verified" boolean default false
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.users USING btree (username);

alter table "public"."users" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."users" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "profiles_id_fkey";

alter table "public"."users" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."users" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."users" validate constraint "username_length";

alter table "public"."polls" add constraint "polls_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."polls" validate constraint "polls_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_poll()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  subscription subscriptions%ROWTYPE;
  can_make_polls int;
begin
  select *
  into subscription
  from subscriptions
  where user_id = auth.uid();

  if (subscription is null or subscription.status != 'active') then
    raise exception 'user is not suscribed';
  end if;

  select can_make_poll
  into can_make_polls
  from rules
  where rules.product_id = (
    select prices.product_id
    from prices
    where prices.id = subscription.price_id
  );

  if (can_make_polls = 0) then
    raise exception 'This User can not make polls';
  end if; 

  return new;
end;$function$
;

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."users"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));



