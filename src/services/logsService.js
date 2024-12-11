import indexedDB from "./idb";

export const addLogWithLimit = async (message, maxRecords = 1000) => {
  try {
    // Add the new log entry
    await indexedDB.logs.add({ message, timestamp: Date.now() });

    // Check the total number of records
    const count = await indexedDB.logs.count();

    // If the count exceeds the maximum, delete the oldest record(s)
    if (count > maxRecords) {
      const oldestLogs = await indexedDB.logs
        .orderBy("id")
        .limit(count - maxRecords)
        .toArray();
      const idsToDelete = oldestLogs.map((log) => log.id);

      // Use a transaction to delete multiple records efficiently
      await indexedDB.transaction("rw", indexedDB.logs, async () => {
        await Promise.all(idsToDelete.map((id) => indexedDB.logs.delete(id)));
      });
    }
  } catch (error) {
    console.log("Failed to add log or enforce limit:", error);
  }
};
