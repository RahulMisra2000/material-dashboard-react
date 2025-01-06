# Database DDL

## Tables

### Authors Table
```sql
create table
  public.authors (
    id uuid not null default extensions.uuid_generate_v4(),
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
```

### Error Logs Table
```sql
create table
  public.error_logs (
    id serial not null,
    error_message text null,
    error_time timestamp with time zone null default current_timestamp,
    constraint error_logs_pkey primary key (id)
  ) tablespace pg_default;
```

### Master Requests Table
```sql
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
    uuid uuid null default gen_random_uuid(),
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
    constraint masterrequests_pkey primary key (id)
  ) tablespace pg_default;
```

### Users Table
```sql
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
```

## Authentication / Providers

### Enable Sign-in with Google
Enables Sign-in with Google on the web using OAuth or One Tap, or in Android apps or Chrome extensions.

- **Client IDs**:  
  `175514361728-mr4pk7jf347bnt30m231h79sogr70rcg.apps.googleusercontent.com`  
  (Comma-separated list of client IDs for Web, OAuth, Android apps, One Tap, and Chrome extensions)

- **Client Secret (for OAuth)**:  
  `•••••••••••••••••••••••••••••••••••`

- **Skip nonce checks**:  
  Allows ID tokens with any nonce to be accepted. Useful in cases where you don't have access to the nonce used to issue the ID token.

- **Callback URL (for OAuth)**:  
  `https://nigrueqspurslluqzqnh.supabase.co/auth/v1/callback`

### URL Configuration
- **Site URL**:  
  `https://fir-proj-clearinsight.web.app`

- **Redirect URLs**:  
  - `https://fir-proj-clearinsight.web.app`  
  - `http://localhost:3000`

---

## Functions

### Handle New User
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
BEGIN
  BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      INSERT INTO error_logs (error_message)
      VALUES (SQLERRM);
      RAISE;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Get User by Email
```sql
CREATE OR REPLACE FUNCTION public.get_user_by_email(p_email text)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  SELECT * FROM users WHERE email = p_email;
END;
$function$;
```

---

## Triggers

### On Auth User Created
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## Policies

### Master Requests Policy
```sql
CREATE POLICY "Allow access only for verified users"
ON public.masterrequests
FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.users WHERE is_verified = true)
);
```

### Authors Policy
```sql
CREATE POLICY "Allow access only for verified users"
ON public.authors
FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.users WHERE is_verified = true)
);
```

### Users Policy
```sql
CREATE POLICY "Allow users to select their own record"
ON public.users
FOR SELECT
USING (id = auth.uid());
```
