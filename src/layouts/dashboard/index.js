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
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import CircularProgress from "@mui/material/CircularProgress"; // Import the spinner
import Box from "@mui/material/Box"; // Import Box for centering

import { useUser } from "../../context/UserContext"; // Import the custom hook to access user context

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { supabase } from "../../backendAsService/supabase-config";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import SignIn from "layouts/authentication/sign-in";

const tableName = `masterrequests`;

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const { user, loading, error } = useUser();
  const [resolvedDuration, setResolvedDuration] = useState(null);
  let content, content2, content3;

  useEffect(() => {
    console.log("%cCOMPONENT LOADED!!!!!", "color: blue; background-color: red; padding: 5px;");
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      console.log("%cFETCHING RECORDS!", "color: blue; background-color: red; padding: 5px;");
      const { data, error } = await supabase.rpc("get_total_duration_by_providercode");

      if (error) {
        throw new Error(error || "Unknown error");
      } else {
        // Convert the returned data into the desired format for the graph
        const formattedData = {
          labels: data.map((item) => item.providercode), // Extract all providercode values
          datasets: {
            label: "Duration", // Define the label for the dataset
            data: data.map((item) => item.total_duration), // Extract all total_duration values
          },
        };
        setTimeout(() => {
          setResolvedDuration(formattedData);
        }, 5000);
      }
    } catch (e) {
      console.error(e?.message || e); // show both error messages in console
      setResolvedDuration(null);
    }
  };

  if (resolvedDuration) {
    content = (
      <ReportsBarChart
        color="info"
        title="time on provider"
        description="Resolved Work Items"
        date="campaign sent 2 days ago"
        chart={resolvedDuration}
      />
    );
    content2 = (
      <ReportsLineChart
        color="success"
        title="daily sales"
        description={
          <>
            (<strong>+15%</strong>) increase in today sales.
          </>
        }
        date="updated 4 min ago"
        chart={sales}
      />
    );
    content3 = (
      <ReportsLineChart
        color="dark"
        title="completed tasks"
        description="Last Campaign Performance"
        date="just updated"
        chart={tasks}
      />
    );
  } else {
    content = <CircularProgress color="primary" size={60} />;
    content2 = <CircularProgress color="primary" size={60} />;
    content3 = <CircularProgress color="primary" size={60} />;
  }

  // If the data is still loading, you might want to show a loading spinner or message
  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh" // Full height to center vertically
        >
          <CircularProgress color="primary" size={60} /> {/* Fancy spinner */}
        </Box>
        <Footer />
      </DashboardLayout>
    );
  }

  // If there's an error, handle it (optional, for example show an error message)
  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh" // Full height to center vertically
        >
          <MDTypography color="error" variant="h6">
            Error: {error}
          </MDTypography>
        </Box>
        <Footer />
      </DashboardLayout>
    );
  }

  // If no user then
  if (!user) {
    return (
      <>
        {/*
        <DashboardLayout>
          <h1>NO USER: {user}</h1>
        </DashboardLayout>
        */}
        <SignIn />
      </>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                {content}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                {content2}{" "}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                {content3}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
