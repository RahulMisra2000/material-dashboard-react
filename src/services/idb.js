import Dexie from "dexie";

// Initialize the Dexie database
const indexedDB = new Dexie("MaterialDashboard");

// Define the schema for the database
indexedDB.version(1).stores({
  logs: "++id, message, timestamp", // Auto-increment ID
  requests: "++id, requestType, msg, url, headers, body, status, timestamp",
});

// Export the database instance
export default indexedDB;
