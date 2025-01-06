/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/welcome/components/Header";

function Overview() {
  const location = useLocation();
  const message = location.state?.message || "";

  const navigate = useNavigate();

  // https://fir-proj-clearinsight.web.app/?error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user#error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user
  // If there is a problem with the OAuth redirect, display an error message
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const params = new URLSearchParams(window.location.search);
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      if (error) {
        console.error("OAuth error:", errorDescription);
        alert(`Sign-in failed: ${errorDescription}`);
        navigate("/Welcome"); // Redirect back to login page
        return;
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <MDTypography variant="h2" fontWeight="medium" gutterBottom>
            Welcome to ClearInsight Solutions
          </MDTypography>
          <MDTypography variant="body1" color="error">
            {message}
          </MDTypography>
          <MDTypography variant="body1" color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </MDTypography>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

/*

    -- Create the `users` table in the public schema,if it doesn't already exist. Don't confuse this with the `auth.users` table which the system manages.
        CREATE TABLE IF NOT EXISTS public.users (
          id uuid PRIMARY KEY,         -- User's UID from Supabase Auth
          email text UNIQUE NOT NULL,  -- Email of the user
          full_name text null,
          phone_number text null,
          profile_picture_url text null,
          is_verified boolean null default false,
          role text null,
          created_at timestamp with time zone DEFAULT now()
        );


          -- inserts a row into public.users when a new user is created in auth.users. Works even with RLS enabled on public.users.
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


          -- trigger the function every time a user is created
          create trigger on_auth_user_created
            after insert on auth.users
            for each row execute procedure public.handle_new_user();


        -- This is for masterrequests table. You will need to create a similar policy for other tables as well so that only verified users can access them.
        -- Note it says ALL, meaning all operations (SELECT, INSERT, UPDATE, DELETE) are restricted to verified users.
            CREATE POLICY "Allow access only for verified users"
            ON public.masterrequests
            FOR ALL USING (
              auth.uid() IN (SELECT id FROM public.users WHERE is_verified = true)
            );

         -- Example for another table
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
        
          -- SO, WHEN YOU WANT TO ALLOW A USER TO HAVE ACCESS then MAKE is_verified = true in public.users table in his record




*/
