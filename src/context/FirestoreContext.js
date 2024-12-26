import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { useUser } from "./UserContext"; // Import the custom hook to access user context
import { db } from "../backendAsService/firebase-config"; // Import your Firestore instance

// Create a context for Firestore
const FirestoreContext = createContext();

// eslint-disable-next-line react/prop-types
export const FirestoreProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  // eslint-disable-next-line
  const { user, loading, error } = useUser(); // Access user, loading, and error from UserContext

  // Fetch records from Firestore when the user changes
  useEffect(() => {
    if (loading) return; // Don't fetch records while loading
    if (user) {
      const fetchRecords = async () => {
        try {
          const snapshot = await getDocs(collection(db, "records"));
          setRecords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("FirestoreContext.js / useEffect() -> Error: ", error);
        }
      };

      false && fetchRecords();
    } else {
      setRecords([]); // Clear records when the user logs out
    }
  }, [user, loading]);

  // CRUD Operations
  const addRecord = async (data) => {
    console.log(`Inside addRecord() function in FirestoreContext.js`);
    // Ensure data is an object
    if (typeof data !== "object" || data === null) {
      console.error("FirestoreContext.js / addRecord() -> Error: Data must be an object.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "KarenRequests"), {
        requestorName: user?.displayName || `Invalid`,
        requestorUid: user?.uid || `Invalid`,
        requestorEmail: user?.email || `Invalid`,
        ...data,
        timestamp: new Date(), // Automatically add a timestamp
      });
      setRecords((prev) => [...prev, { id: docRef.id, ...data }]);
    } catch (error) {
      console.error("FirestoreContext.js / addRecord() -> Error: ", error);
    }
  };

  const updateRecord = async (id, updatedData) => {
    if (typeof updatedData !== "object" || updatedData === null) {
      console.error("Updated data must be an object.");
      return;
    }

    try {
      const docRef = doc(db, "records", id);
      await updateDoc(docRef, updatedData);
      setRecords((prev) =>
        prev.map((record) => (record.id === id ? { ...record, ...updatedData } : record))
      );
    } catch (error) {
      console.error("FirestoreContext.js / updateRecord() -> Error: ", error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const docRef = doc(db, "records", id);
      await deleteDoc(docRef);
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (error) {
      console.error("FirestoreContext.js / deleteRecord() -> Error: ", error);
    }
  };

  return (
    <FirestoreContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FirestoreContext.Provider>
  );
};

// Custom hook for using Firestore context
export const useFirestore = () => useContext(FirestoreContext);
