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

// import { auth } from "../../../backendAsService/firebase-config";
import { supabase } from "../../../backendAsService/supabase-config";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();

  (async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error.message);
        return;
      }
      navigate("/", { replace: true });
      console.log("Successfully signed out");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  })();

  return null;
}

export default Basic;
