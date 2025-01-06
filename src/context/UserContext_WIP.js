// context/UserContext.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../backendAsService/supabase-config"; // Import your supabase instance

const UserContext = createContext(null);

// Helper function to fetch user data from the users table
const fetchDataFrom_SchemaPublic_TableUsers = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*") // Adjust the columns you need from the public.users table
      .eq("id", userId)
      .single(); // Expect only one row

    if (error) {
      console.error("Error fetching user data:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error in fetchDataFrom_SchemaPublic_TableUsers:", err.message);
    return null;
  }
};

// ************************************************************************************       *** FOR PROVIDER ***
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const initializeUser = async () => {
      console.log(`INITIALING USER -- ..................................`);
      try {
        setLoading(true);
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log(`..........Just before`);
        if (error) {
          console.error("Error fetching session:", error.message);
          throw error;
        }

        if (session) {
          console.log(`INITIALING USER - Session Found ${session.user.id}`);
          const publicUserData = await fetchDataFrom_SchemaPublic_TableUsers(session.user.id);

          // Merge session user data with public user data
          setUser({
            ...session.user,
            // This is for convenience because the same data is in the publicuserrecord below
            is_verified: publicUserData?.is_verified,
            // These are all the fields from public.users in Supabase
            publicuserrecord: publicUserData,
          });
          console.log({ user });
        } else {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!no session found");
        }
      } catch (err) {
        console.error("Error initializing user session:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    // Listen for authentication state changes
    const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const publicUserData = await fetchDataFrom_SchemaPublic_TableUsers(session.user.id);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!onAuthStateChange-session");

        // Merge session user data with public user data
        setUser({
          ...session.user,
          is_verified: publicUserData?.is_verified,
          publicuserrecord: publicUserData,
        });
      } else {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!onAuthStateChange-null");
        setUser(null);
      }
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// ************************************************************************************       *** FOR CONSUMER ***
export const useUser = () => useContext(UserContext); // Custom hook to access the user context
