// context/UserContext.js
import React, { useState, useEffect, createContext, useContext } from "react";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { auth } from "../backendAsService/firebase-config"; // Import your firebase auth instance
import { supabase } from "../backendAsService/supabase-config"; // Import your supabase instance

const UserContext = createContext(null);

// ************************************************************************************       *** FOR PROVIDER ***
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          throw error;
        }

        if (session) setUser(session.user);
      } catch (err) {
        console.error("Error initializing user session:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for authentication state changes
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// ************************************************************************************       *** FOR CONSUMER ***
export const useUser = () => useContext(UserContext); // Custom hook to access the user context
