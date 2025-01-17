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

import { useState, useEffect, useContext } from "react";
import { supabase } from "../../backendAsService/supabase-config";
import { useNotifications } from "../../context/NotificationsContext";
import PropTypes from "prop-types";

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
  const { getNotificationRecords } = useNotifications();
  const errorRecords = getNotificationRecords("errors");

  useEffect(() => {
    setLoading(false);
  }, []);

  const DefaultCell = ({ value }) => <MDTypography variant="caption">{value}</MDTypography>;

  const MessageCell = ({ value }) => (
    <MDTypography variant="caption">
      {value.length > 50 ? `${value.substring(0, 50)}...` : value}
    </MDTypography>
  );

  DefaultCell.propTypes = {
    value: PropTypes.any.isRequired,
  };

  MessageCell.propTypes = {
    value: PropTypes.string.isRequired,
  };

  const columns = [
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Region
        </MDTypography>
      ),
      accessor: "region",
      width: "10%",
      Cell: DefaultCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Type
        </MDTypography>
      ),
      accessor: "type",
      width: "10%",
      Cell: DefaultCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Case
        </MDTypography>
      ),
      accessor: "casenumber",
      width: "10%",
      Cell: DefaultCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          File
        </MDTypography>
      ),
      accessor: "sourcefilename",
      width: "10%",
      Cell: DefaultCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Message
        </MDTypography>
      ),
      accessor: "errormessage",
      width: "55%",
      Cell: MessageCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Active
        </MDTypography>
      ),
      accessor: "active",
      width: "5%",
      Cell: DefaultCell,
    },
    {
      Header: () => (
        <MDTypography variant="h6" fontWeight="bold">
          Timestamp
        </MDTypography>
      ),
      accessor: "created_at",
      width: "15%",
      Cell: DefaultCell,
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
                      table={{ columns, rows: errorRecords }}
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
