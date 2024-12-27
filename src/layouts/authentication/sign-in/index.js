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

import { useState } from "react";

// IF USING FIREBASE AUTHENTICATION
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../../backendAsService/firebase-config";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// IF USING SUPABASE AUTHENTICATION
import { supabase } from "../../../backendAsService/supabase-config";

import { useNavigate, useLocation } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [signInError, setSignInError] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const db = getFirestore();
  const navigate = useNavigate();

  // Google Sign-In
  const handleGoogleClick = async (event) => {
    // Prevent the default behavior of the link
    event.preventDefault();

    try {
      /*  USING FIREBASE AUTHENTICATION
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      console.log({ loggedInUser });
      */

      // USING SUPABASE AUTHENTICATION
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("**** Error signing in:", error.message);
        setSignInError(`Sign in error: ${error.message}`);
        return;
      }

      /*
      // Check if the email is allowed
      const docRef = doc(db, "allowedUsers", loggedInUser.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || !docSnap.data()?.allowed) {
        console.error("User is not allowed:", loggedInUser.email);
        await auth.signOut(); // Sign out the unauthorized user
        setSignInError(`${loggedInUser.email} is not authorized`);
        //navigate("/login", { state: { error: "You are not authorized to access this application." } });
        // OR
      } else {
        console.log(`User is allowed:`, loggedInUser.email);
        navigate("/", { replace: true });
      }
      */

      // navigate("/", { replace: true });
      // alert('Logged in successfully with Google!');
    } catch (error) {
      console.log("**** Error logging in:", error.message);
      setSignInError(`Sign in error: ${error.message}`);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                onClick={handleGoogleClick}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
              {signInError && (
                <MDTypography variant="h6" fontWeight="medium" color="error" mt={1}>
                  {signInError}
                </MDTypography>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
