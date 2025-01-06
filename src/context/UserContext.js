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
    // Listen for authentication state changes
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });

      // Reason for doing this is explained here https://supabase.com/docs/reference/javascript/auth-onauthstatechange
      setTimeout(async () => {
        // await on other Supabase function here
        // this runs right after the callback has finished
        if (session) {
          // Fetch the user's data from the public.users table using session.user.id
          (async () => {
            const { data, error: userError } = await supabase
              .from("users")
              .select("*") // The columns you need from the public.users table
              .eq("id", session.user.id);

            if (userError) {
              console.error("Error fetching user data:", userError.message);
            }

            // Merge user data with session data
            setUser({
              ...session.user,
              is_verified: data[0]?.is_verified,
              publicuserrecord: data[0],
            });
          })();
        } else {
          setUser(null);
        }
      }, 0);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  console.log({ Where: `UserProvider Context`, user });
  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// ************************************************************************************       *** FOR CONSUMER ***
export const useUser = () => useContext(UserContext); // Custom hook to access the user context
