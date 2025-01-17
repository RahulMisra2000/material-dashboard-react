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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Starting fetch...");

      // First, let's verify the connection
      const { data: testData, error: testError } = await supabase
        .from("requesterrors")
        .select("count");

      console.log("Count check:", testData);

      // Then do the actual fetch
      const { data: records, error } = await supabase
        .from("requesterrors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("Fetched records:", records);
      console.log("Records length:", records ? records.length : 0);
      console.log("First record:", records?.[0]);

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
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Region</TableCell>
                          <TableCell>Error Message</TableCell>
                          <TableCell>Request URL</TableCell>
                          <TableCell>Method</TableCell>
                          <TableCell>Status Code</TableCell>
                          <TableCell>Timestamp</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.region}</TableCell>
                            <TableCell>{record.errormessage}</TableCell>
                            <TableCell>{record.request_url}</TableCell>
                            <TableCell>{record.method}</TableCell>
                            <TableCell>{record.status_code}</TableCell>
                            <TableCell>{new Date(record.created_at).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
