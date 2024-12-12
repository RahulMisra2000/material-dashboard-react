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
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/welcome/components/Header";

// MINE
import { useUser } from "../../../src/context/UserContext"; // Import the custom hook to access user context
import { useFirestore } from "../../../src/context/FirestoreContext";
import envelopeImage from "../../../src/assets/images/envelope.webp";

import "./SendRequest.css";

/**
 * Example -https://your-app.com/send-request/master-request/#providers=ACC,BAG,XYZ
 * Example -https://localhost:3000/send-request/master-request/#providers=ACC,BAG,XYZ
 * where the requestType is master-request [see route in App.js <Route path="/send-request/:requestType" element={<SendRequest />} />]
 * @returns
 */
function Overview() {
  console.count(`SendRequest()'s first line`);

  const [animateEnvelope, setAnimateEnvelope] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages

  // eslint-disable-next-line
  const { user, loading, error } = useUser();
  const { addRecord } = useFirestore(); // Firestore context to add records

  // In App.js we have this ---> <Route path="/send-request/:requestType" element={<SendRequest />} />
  const { requestType } = useParams(); // Get the request type from the URL

  const { hash } = useLocation();
  /*
  IF https://example.com/send-request/master-request?key=value#providers=ACC,BAG,XYZ
  THEN useLocation() returns
    {
      pathname: "/send-request/master-request",
      search: "?key=value",
      hash: "#providers=ACC,BAG,XYZ",
      state: undefined, // or a state object if passed
      key: "someUniqueKey"
    }
  */

  const params = new URLSearchParams(hash.slice(1)); // Remove '#' from hash
  const providers = params.get("providers")?.split(","); // ['ACC', 'BAG', 'XYZ']

  const navigate = useNavigate();

  useEffect(() => {
    console.count(`SendRequest() useEffect()'s first line`);

    // *************************** returns; in here exit from the useEffect early if criteria for WORK is not met. Remember work is being done INSIDE useEffect and therefore
    let localError = ""; // Track errors locally without immediately setting state

    if (!user) {
      console.log("User credentials not available yet - Cannot send request to Firestore");
      localError = `User credentials not available yet - Cannot send request to Firestore`;
    }

    if (!requestType || requestType !== `master-request`) {
      console.log(`Invalid Request Type ${requestType} - Cannot send request to Firestore`);
      localError += `\nInvalid Request Type ${requestType} - Cannot send request to Firestore`;
    }

    if (!providers?.length) {
      console.log(
        `Providers hash (/#providers=) not provided in URL - Cannot send request to Firestore`
      );
      localError += `\nProviders hash (/#providers=) not provided in URL - Cannot send request to Firestore`;
    }

    /* ************************************************* All criteria met so let's do the work ***************************************************************************** */
    // Update the STATE (errorMessage) only if an error has been found (localError) that is different from what is in the STATE (errorMessage)
    // To prevent infinite renders
    if (localError !== errorMessage) {
      setErrorMessage(localError);
    }

    if (!localError) {
      /* ************************************************* WORK ************************************************** */
      const addRecordsToFirestore = async () => {
        try {
          // Write one document per provider
          for (let i = 0; i < providers.length; i++) {
            await addRecord({
              providers: providers[i],
              requestStatus: "OPEN",
              requestType: requestType,
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            });
          }
        } catch (error) {
          console.log(`Error writing to Firestore: ${error.message}`);
          localError += `Error writing to Firestore: ${error.message}`;
        }
      };

      addRecordsToFirestore(); // Call the async function

      // ************************************************* WORK ********************************************************

      // Since the Firestore record has been written let's go back to the home component with a message
      /*
      navigate("/welcome", {
        state: { message: `Request delivered to Firestore` },
      });
      */
    } // if (!localError)

    /* *************************************************** THIS RETURN IS DIFFERENT. It is the cleanup function of useEffect *********************************************** */
    return () => {
      console.log("Component SendRequest is unMounted!");
    };
  }, [requestType, providers, user, errorMessage, addRecord, navigate]); // Empty dependency array means it runs only once when Component is first rendered or requesttype changes

  /* This always runs */
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <MDTypography variant="h4" fontWeight="medium" gutterBottom>
            OUTGOING REQUEST STATUS
          </MDTypography>

          {errorMessage && (
            <MDTypography variant="h6" fontWeight="light" color="error" mt={1}>
              {errorMessage.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </MDTypography>
          )}

          {!errorMessage && (
            <MDTypography variant="h6" fontWeight="light" color="success" mt={1}>
              Sending request from: {user?.email} of type: {requestType} for provider:{" "}
              {providers?.join(",")}
            </MDTypography>
          )}
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
