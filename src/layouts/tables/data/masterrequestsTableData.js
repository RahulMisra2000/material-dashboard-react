/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { supabase } from "../../../../src/backendAsService/supabase-config";

const tableName = `masterrequests`;

export default function data() {
  const [masterRequests, setMasterRequests] = useState([]);

  const fetchMasterRequests = async () => {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      console.error("Error fetching Master Requests:", error);
    } else {
      setMasterRequests(data);
    }
  };

  useEffect(() => {
    fetchMasterRequests();
  }, []);

  const Request = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "Request", accessor: "author", width: "45%", align: "left" },
    { Header: "function", accessor: "function", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "employed", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = masterRequests?.map((request) => ({
    Request: <Request image={request.image_url} name={request.name} email={request.email} />,
    function: <Job title={request.providercode} description={request.description} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={request.status}
          color={request.status === "online" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {request.employed_date}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  }));

  return { columns, rows };
}

// This can be just pasted into the Supabase SQL Editor to create the table and insert the data
/*
create table
  public.masterrequests (
    id bigint generated always as identity not null,
    auth_id uuid null,
    providercode text null,
    requestedby text null,
    requesttype text null,
    status text null,
    description text null,
    resolveddate text null,
    sessionid text null,
    orderseq integer null,
    ingesttab text null,
    runreport text null,
    uuid text null,
    emailsubjectline text null,
    emailbody1 text null,
    emailbody2 text null,
    actionlevel text null,
    actionrequired text null,
    sites text null,
    respondby text null,
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
    constraint masterrequests_pkey primary key (id)
  ) tablespace pg_default;

-- Step 1: Enable Row-Level Security on the authors table
ALTER TABLE masterrequests ENABLE ROW LEVEL SECURITY;

-- Step 2: Create a policy to allow SELECT for all authenticated users
-- Supabase automatically provides a default role for authenticated users. In Supabase, every authenticated user is assigned the role authenticated by default, and you don’t need to explicitly create this role. The function auth.role() checks the role assigned to the current user, and if they are authenticated, their role will resolve to 'authenticated'

CREATE POLICY "Allow authenticated users to read masterrequests"
ON masterrequests
FOR SELECT
USING (
    auth.role() = 'authenticated'
);


*/
