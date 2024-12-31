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
import { createClient } from "@supabase/supabase-js";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function data() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    const { data, error } = await supabase.from("authors").select("*");

    if (error) {
      console.error("Error fetching authors:", error);
    } else {
      console.log("Authors data:", data);
      setAuthors(data);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const Author = ({ image, name, email }) => (
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
    { Header: "author", accessor: "author", width: "45%", align: "left" },
    { Header: "function", accessor: "function", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "employed", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = authors.map((author) => ({
    author: <Author image={author.image_url} name={author.name} email={author.email} />,
    function: <Job title={author.job_title} description={author.job_description} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={author.status}
          color={author.status === "online" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {author.employed_date}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  }));

  const rows_old = [
    {
      author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      function: <Job title="Manager" description="Organization" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          23/04/18
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
    {
      author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      function: <Job title="Programator" description="Developer" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          11/01/19
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
    {
      author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      function: <Job title="Executive" description="Projects" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          19/09/17
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
    {
      author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      function: <Job title="Programator" description="Developer" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          24/12/08
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
    {
      author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
      function: <Job title="Manager" description="Executive" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          04/10/21
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
    {
      author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      function: <Job title="Programator" description="Developer" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          14/09/20
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
  ];

  return { columns, rows };
}

// This can be just pasted into the Supabase SQL Editor to create the table and insert the data
/*
CREATE TABLE authors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- Author's name
    image_url TEXT NOT NULL, -- URL of the author's image
    job_title VARCHAR(255) NOT NULL, -- Author's job title
    email VARCHAR(255) UNIQUE NOT NULL, -- Author's email (unique)
    job_description TEXT, -- Description of the author's job
    status BOOLEAN DEFAULT TRUE, -- Employment status (active/inactive)
    employed_date DATE NOT NULL -- Date the author was employed
);

-- Step 1: Enable Row-Level Security on the authors table
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Step 2: Create a policy to allow SELECT for all authenticated users
-- Supabase automatically provides a default role for authenticated users. In Supabase, every authenticated user is assigned the role authenticated by default, and you don’t need to explicitly create this role. The function auth.role() checks the role assigned to the current user, and if they are authenticated, their role will resolve to 'authenticated'

CREATE POLICY "Allow authenticated users to read authors"
ON authors
FOR SELECT
USING (
    auth.role() = 'authenticated'
);

INSERT INTO authors (name, image_url, job_title, email, job_description, status, employed_date)
VALUES 
    ('John Doe', 'https://randomuser.me/api/portraits/men/1.jpg', 'Software Engineer', 'john.doe@example.com', 'Develops and maintains software applications.', TRUE, '2022-06-15'),
    ('Jane Smith', 'https://randomuser.me/api/portraits/women/1.jpg', 'Technical Writer', 'jane.smith@example.com', 'Writes technical documentation for software products.', TRUE, '2021-03-20'),
    ('Robert Brown', 'https://randomuser.me/api/portraits/men/2.jpg', 'Project Manager', 'robert.brown@example.com', 'Oversees project development and delivery.', FALSE, '2019-08-10'),
    ('Emily Clark', 'https://randomuser.me/api/portraits/women/2.jpg', 'Data Analyst', 'emily.clark@example.com', 'Analyzes data and provides insights for decision-making.', TRUE, '2023-01-05'),
    ('Michael Johnson', 'https://randomuser.me/api/portraits/men/3.jpg', 'UI/UX Designer', 'michael.johnson@example.com', 'Designs user interfaces and experiences for web applications.', TRUE, '2020-11-11'),
    ('Sarah Lee', 'https://randomuser.me/api/portraits/women/3.jpg', 'Content Strategist', 'sarah.lee@example.com', 'Plans and creates digital content strategies.', TRUE, '2022-04-10'),
    ('David Miller', 'https://randomuser.me/api/portraits/men/4.jpg', 'Cloud Architect', 'david.miller@example.com', 'Designs and manages cloud infrastructure.', TRUE, '2020-07-18'),
    ('Sophia Wilson', 'https://randomuser.me/api/portraits/women/4.jpg', 'DevOps Engineer', 'sophia.wilson@example.com', 'Automates and improves software delivery processes.', TRUE, '2023-02-15'),
    ('James Anderson', 'https://randomuser.me/api/portraits/men/5.jpg', 'Cybersecurity Analyst', 'james.anderson@example.com', 'Secures systems and prevents cyber threats.', TRUE, '2021-05-12'),
    ('Mia Thomas', 'https://randomuser.me/api/portraits/women/5.jpg', 'Front-End Developer', 'mia.thomas@example.com', 'Builds and optimizes web interfaces.', TRUE, '2018-09-25'),
    ('Lucas Moore', 'https://randomuser.me/api/portraits/men/6.jpg', 'Database Administrator', 'lucas.moore@example.com', 'Manages and maintains databases.', TRUE, '2022-01-30'),
    ('Olivia Martin', 'https://randomuser.me/api/portraits/women/6.jpg', 'Digital Marketer', 'olivia.martin@example.com', 'Executes online marketing campaigns.', TRUE, '2020-03-15'),
    ('Benjamin Harris', 'https://randomuser.me/api/portraits/men/7.jpg', 'QA Engineer', 'benjamin.harris@example.com', 'Tests software for bugs and quality assurance.', TRUE, '2019-10-20'),
    ('Ella Martinez', 'https://randomuser.me/api/portraits/women/7.jpg', 'Back-End Developer', 'ella.martinez@example.com', 'Develops server-side logic and databases.', TRUE, '2021-12-12'),
    ('William Clark', 'https://randomuser.me/api/portraits/men/8.jpg', 'Network Engineer', 'william.clark@example.com', 'Manages network infrastructure.', FALSE, '2020-02-28'),
    ('Amelia Walker', 'https://randomuser.me/api/portraits/women/8.jpg', 'Product Manager', 'amelia.walker@example.com', 'Defines product vision and roadmaps.', TRUE, '2023-08-08'),
    ('Ethan Hill', 'https://randomuser.me/api/portraits/men/9.jpg', 'Mobile Developer', 'ethan.hill@example.com', 'Creates mobile applications.', TRUE, '2022-09-14'),
    ('Charlotte Hall', 'https://randomuser.me/api/portraits/women/9.jpg', 'Graphic Designer', 'charlotte.hall@example.com', 'Designs visual content and branding.', TRUE, '2021-06-21'),
    ('Henry Adams', 'https://randomuser.me/api/portraits/men/10.jpg', 'Full-Stack Developer', 'henry.adams@example.com', 'Works on both front-end and back-end development.', TRUE, '2019-11-11'),
    ('Chloe Scott', 'https://randomuser.me/api/portraits/women/10.jpg', 'HR Specialist', 'chloe.scott@example.com', 'Manages employee relations and recruitment.', TRUE, '2022-07-05'),
    ('Alexander White', 'https://randomuser.me/api/portraits/men/11.jpg', 'SEO Specialist', 'alexander.white@example.com', 'Optimizes websites for search engines.', TRUE, '2020-04-19'),
    ('Grace King', 'https://randomuser.me/api/portraits/women/11.jpg', 'Content Writer', 'grace.king@example.com', 'Creates engaging written content.', TRUE, '2023-03-01'),
    ('Jacob Garcia', 'https://randomuser.me/api/portraits/men/12.jpg', 'AI Researcher', 'jacob.garcia@example.com', 'Researches and develops AI technologies.', TRUE, '2021-01-25'),
    ('Lily Turner', 'https://randomuser.me/api/portraits/women/12.jpg', 'Business Analyst', 'lily.turner@example.com', 'Analyzes business needs and solutions.', TRUE, '2020-12-15'),
    ('Daniel Collins', 'https://randomuser.me/api/portraits/men/13.jpg', 'Game Developer', 'daniel.collins@example.com', 'Develops and tests video games.', TRUE, '2022-05-10');

*/
