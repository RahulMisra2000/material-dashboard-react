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
import Avatar from "react-avatar";

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

  // Component 1
  const Component1 = ({ image, pCode, rType }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {false && <MDAvatar src={image} name={pCode} size="sm" />}
      <Avatar name={pCode} size="40" round={true} />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {pCode}
        </MDTypography>
        <MDTypography variant="caption">{rType}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Provider", accessor: "a", width: "20%", align: "left" },
    { Header: "Request ID", accessor: "b", width: "20%", align: "left" },
    { Header: "Status", accessor: "c", align: "center" },
    { Header: "Request Type", accessor: "d", align: "left" },
    { Header: "Respond By", accessor: "e", align: "left" },
    { Header: "Resolved Date", accessor: "f", align: "center" },
    { Header: "Action", accessor: "g", align: "center" },
  ];

  const rows = masterRequests?.map((request) => ({
    a: (
      <Component1
        image={request.image_url}
        pCode={request.providercode}
        rType={request.requesttype}
      />
    ),
    b: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {request.uuid}
      </MDTypography>
    ),
    c: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={request.status}
          color={request?.status?.toUpperCase() == "RAN" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    d: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {request.ingesttab}
        {request.runreport}
        {request.reportidsuffix}
      </MDTypography>
    ),
    e: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {request.respondby}
      </MDTypography>
    ),
    f: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {request.resolveddate}
      </MDTypography>
    ),
    g: (
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
