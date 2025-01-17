import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { supabase } from "../backendAsService/supabase-config";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState({
    errors: {
      active: false,
      count: 0,
      records: [],
    },
  });

  const checkNotifications = async () => {
    try {
      // Get all error records with full details
      const { data: errorData, error: errorQueryError } = await supabase
        .from("requesterrors")
        .select("*")
        .eq("active", 1)
        .eq("type", "ERROR")
        .order("created_at", { ascending: false });

      if (errorQueryError) {
        throw errorQueryError;
      }

      // Update state with both count and records
      setNotifications((prev) => ({
        ...prev,
        errors: {
          active: errorData && errorData.length > 0,
          count: errorData?.length || 0,
          records: errorData || [],
        },
      }));
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

  // Subscribe to relevant table changes
  const setupSubscriptions = () => {
    const channels = [
      supabase
        .channel("error_notifications")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "requesterrors" },
          (payload) => {
            console.log("Received realtime update:", payload);
            checkNotifications();
          }
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        }),

      // Add more subscriptions here as needed
      // supabase
      //   .channel("message_notifications")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "messages" },
      //     () => checkNotifications()
      //   )
      //   .subscribe(),
    ];

    return () => {
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  };

  useEffect(() => {
    checkNotifications();
    return setupSubscriptions();
  }, []);

  // Helper functions for components to use
  const hasAnyNotifications = () => {
    return Object.values(notifications).some((type) => type.active);
  };

  const getNotificationCount = (type) => {
    return notifications[type]?.count || 0;
  };

  const isNotificationActive = (type) => {
    return notifications[type]?.active || false;
  };

  const getNotificationRecords = (type) => {
    return notifications[type]?.records || [];
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        hasAnyNotifications,
        getNotificationCount,
        isNotificationActive,
        getNotificationRecords,
        checkNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotifications = () => useContext(NotificationsContext);
