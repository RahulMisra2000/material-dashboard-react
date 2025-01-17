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

import { useState, useEffect } from "react";
import { supabase } from "../../backendAsService/supabase-config";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Starting fetch...");
      const { data: records, error } = await supabase
        .from("requesterrors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setData(records || []);
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { Header: "Region", accessor: "region", width: "10%" },
    { Header: "Error Message", accessor: "errormessage", width: "30%" },
    { Header: "Request URL", accessor: "request_url", width: "25%" },
    { Header: "Method", accessor: "method", width: "10%" },
    { Header: "Status", accessor: "status_code", width: "10%" },
    {
      Header: "Timestamp",
      accessor: "created_at",
      width: "15%",
      Cell: ({ value }) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Request Errors
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDTypography textAlign="center" py={3}>
                    Loading...
                  </MDTypography>
                ) : (
                  <MDBox p={3}>
                    <DataTable
                      table={{ columns, rows: data }}
                      isSorted={true}
                      entriesPerPage={true}
                      showTotalEntries={true}
                      noEndBorder
                      canSearch
                    />
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
