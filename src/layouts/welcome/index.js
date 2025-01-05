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
-- 1. This is the sql to create public.users table in Supabase
      create table
        public.users (
          id serial not null,
          email text not null,
          full_name text null,
          phone_number text null,
          profile_picture_url text null,
          created_at timestamp with time zone null default now(),
          updated_at timestamp with time zone null default now(),
          is_active boolean null default true,
          is_verified boolean null default false,
          role text null,
          constraint users_pkey primary key (id),
          constraint users_email_key unique (email)
        ) tablespace pg_default;





*/
