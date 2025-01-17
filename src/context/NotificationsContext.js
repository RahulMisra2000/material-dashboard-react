import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { supabase } from "../backendAsService/supabase-config";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState({
    errors: {
      active: false,
      count: 0,
    },
    // Add more notification types here as needed
    // messages: {
    //   active: false,
    //   count: 0
    // },
    // alerts: {
    //   active: false,
    //   count: 0
    // }
  });

  const checkNotifications = async () => {
    try {
      // Check for active errors
      const { data: errorData, error: errorQueryError } = await supabase
        .from("requesterrors")
        .select("id")
        .eq("active", 1);

      if (errorQueryError) {
        throw errorQueryError;
      }

      // Add more notification checks here as needed
      // const { data: messageData, error: messageQueryError } = await supabase
      //   .from("messages")
      //   .select("id")
      //   .eq("read", false);

      setNotifications((prev) => ({
        ...prev,
        errors: {
          active: errorData && errorData.length > 0,
          count: errorData?.length || 0,
        },
        // Add more notification updates here
        // messages: {
        //   active: messageData && messageData.length > 0,
        //   count: messageData?.length || 0
        // }
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

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        hasAnyNotifications,
        getNotificationCount,
        isNotificationActive,
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
