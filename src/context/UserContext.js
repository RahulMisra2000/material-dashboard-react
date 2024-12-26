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
    const initializeUser = async () => {
      try {
        setLoading(true);

        // Fetch the active session to determine if a user is logged in
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw new Error(sessionError.message);

        setUser(session?.user || null);
      } catch (err) {
        console.error("Error fetching user session:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    // Listen for authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(`Inside onAuthStateChange() in UserContext.js, session is ${session}`);
      setUser(session?.user || null);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ user, loading, error }}>{children}</UserContext.Provider>;
};

// ************************************************************************************       *** FOR CONSUMER ***
export const useUser = () => useContext(UserContext); // Custom hook to access the user context
