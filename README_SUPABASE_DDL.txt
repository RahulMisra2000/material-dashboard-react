Database DDL

TABLES
create table
  public.authors (
    id uuid not null default extensions.uuid_generate_v4 (),
    name character varying(255) not null,
    image_url text not null,
    job_title character varying(255) not null,
    email character varying(255) not null,
    job_description text null,
    status boolean null default true,
    employed_date date not null,
    constraint authors_pkey primary key (id),
    constraint authors_email_key unique (email)
  ) tablespace pg_default;


  create table
  public.error_logs (
    id serial not null,
    error_message text null,
    error_time timestamp with time zone null default current_timestamp,
    constraint error_logs_pkey primary key (id)
  ) tablespace pg_default;


create table
  public.masterrequests (
    id bigint generated always as identity not null,
    auth_id uuid null,
    providercode text null,
    requestedby text null,
    requesttype text null,
    status text null,
    description text null,
    resolveddate date null,
    sessionid text null,
    orderseq integer null,
    ingesttab text null,
    runreport text null,
    uuid uuid null default gen_random_uuid (),
    emailsubjectline text null,
    emailbody1 text null,
    emailbody2 text null,
    actionlevel text null,
    actionrequired text null,
    sites text null,
    respondby date null,
    forentity text null,
    reportidsuffix text null,
    reporttitle text null,
    reportdescription text null,
    salutation text null,
    reportfooterpara1 text null,
    reportfooterpara2 text null,
    alertids text null,
    reportheaderpara1 text null,
    reportheaderpara2 text null,
    attachmentnamepdf text null,
    invalidsitemessage text null,
    command text null,
    recordtype text null,
    reminderdate date null,
    requestworksheetrownumber integer null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null,
    testdate timestamp with time zone null,
    active integer null default 1,
    executeon date null,
    priority integer null,
    duration integer null default 0,
    constraint masterrequests_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.requesterrors (
    id uuid not null default extensions.uuid_generate_v4 (),
    region text null,
    type text null,
    casenumber text null,
    sourcefilename text null,
    errormessage text null,
    created_at timestamp with time zone null default now(),
    active integer null default 1
  ) tablespace pg_default;

-- Enable Row Level Security (RLS)
ALTER TABLE requesterrors ENABLE ROW LEVEL SECURITY;


create trigger handle_updated_at before
update on masterrequests for each row
execute function moddatetime ('updated_at');

create trigger handle_updated_at before
update on masterrequests for each row
execute function moddatetime ('updated_at');

create trigger handle_updated_at before
update on masterrequests for each row
execute function moddatetime ('updated_at');


  create table
  public.users (
    id uuid not null,
    email text not null,
    full_name text null,
    phone_number text null,
    profile_picture_url text null,
    is_verified boolean null default false,
    role text null,
    created_at timestamp with time zone null default now(),
    constraint users_pkey primary key (id),
    constraint users_email_key unique (email)
  ) tablespace pg_default;


Under Authentication / Providers
Enable Sign in with Google

Enables Sign in with Google on the web using OAuth or One Tap, or in Android apps or Chrome extensions.
Client IDs
175514361728-mr4pk7jf347bnt30m231h79sogr70rcg.apps.googleusercontent.com
Comma-separated list of client IDs for Web, OAuth, Android apps, One Tap, and Chrome extensions.

Client Secret (for OAuth)
•••••••••••••••••••••••••••••••••••

Client Secret to use with the OAuth flow on the web.


Skip nonce checks
Allows ID tokens with any nonce to be accepted, which is less secure. Useful in situations where you don't have access to the nonce used to issue the ID token, such as with iOS.
Callback URL (for OAuth)
https://nigrueqspurslluqzqnh.supabase.co/auth/v1/callback

Copy
Register this callback URL when using Sign-in with Google on the web using OAuth. Learn more





Under Authentication / URL Configuration
Site URL
Configure the default redirect URL used when a redirect URL is not specified or doesn't match one from the allow list. This value is also exposed as a template variable in the email templates section. Wildcards cannot be used here.
Site URL
https://fir-proj-clearinsight.web.app

Cancel

Save
Redirect URLs
URLs that auth providers are permitted to redirect to post authentication. Wildcards are allowed, for example, https://*.domain.com
Docs

Add URL

https://fir-proj-clearinsight.web.app

http://localhost:3000
Total URLs: 2














FUNCTIONS
-- Assuming error_logs table exists already
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
BEGIN
  -- Try to insert the new user into the `users` table
  BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error into the error_logs table
      INSERT INTO error_logs (error_message)
      VALUES (SQLERRM);

      -- Optionally, re-raise the error if you want to propagate it
      RAISE;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_user_by_email(p_email text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
select * from users where email = p_email;
END
;$function$


CREATE OR REPLACE FUNCTION get_total_duration_by_providercode()
RETURNS TABLE (providercode TEXT, total_duration NUMERIC)
LANGUAGE sql
AS $$
    SELECT 
        providercode, 
        SUM(duration) AS total_duration
    FROM 
        masterrequests
    GROUP BY 
        providercode;
$$;






-- TRIGGERS
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();







POLICIES
CREATE POLICY "Allow access only for verified users"
ON public.masterrequests
FOR ALL USING (
auth.uid() IN (SELECT id FROM public.users WHERE is_verified = true)
);

CREATE POLICY "Allow access only for verified users"
ON public.authors
FOR ALL USING (
auth.uid() IN (SELECT id FROM public.users WHERE is_verified = true)
);

-- This is for public.users table. Only the user himself can access his own record. This is needed because in the above sql ...see that a select is 
-- being done on public.users table to check if the user is verified. So, we need to allow the user to access his own record.      

CREATE POLICY "Allow users to select their own record"
ON public.users
FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Allow authenticated users to select from requesterrors" 
ON requesterrors 
FOR SELECT 
TO authenticated 
USING (true);




-- Do this to enable the extension that provides a function that you can use to update the updated_at column in the masterrequests table
You will need a trigger also

Navigate to the Database section in your Supabase dashboard.
Click on Extensions.
Locate moddatetime in the list and click Enable.

Trigger
create trigger handle_updated_at
before update on masterrequests
for each row execute procedure moddatetime(updated_at);


