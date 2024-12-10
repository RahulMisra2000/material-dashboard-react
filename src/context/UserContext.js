// context/UserContext.js
import React, { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config"; // Import your firebase auth instance

const UserContext = createContext(null);

// ************************************************************************************       *** FOR PROVIDER ***
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth); // Use the hook to manage auth state

  return <UserContext.Provider value={{ user, loading, error }}>{children}</UserContext.Provider>;
};

// ************************************************************************************       *** FOR CONSUMER ***
export const useUser = () => useContext(UserContext); // Custom hook to access the user context
