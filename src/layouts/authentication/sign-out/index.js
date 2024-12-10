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

import { auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();

  (async () => {
    try {
      await auth.signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  })();

  return null;
}

export default Basic;
