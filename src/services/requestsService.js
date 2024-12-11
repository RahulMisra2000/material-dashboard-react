import indexedDB from "./idb";

// Add a new request
/**
 *
 * @param {*} request is an object { requestType, msg, url, headers = {}, body = null, status = null }
 */
export const addRequest = async (request) => {
  try {
    const { requestType, msg, url = "", headers = {}, body = null, status = null } = request;

    if (!requestType || !msg) {
      throw new Error("Both requestType and msg are required.");
    }

    await indexedDB.requests.add({
      requestType,
      msg,
      url,
      headers: JSON.stringify(headers), // Store headers as a JSON string
      body: typeof body === "string" ? body : JSON.stringify(body), // Stringify body if not already a string
      status,
      timestamp: Date.now(),
    });

    console.log("requestService.js / addRequest() -> Success");
  } catch (error) {
    console.error("requestService.js / addRequest() -> Error", error);
    throw error;
  }
};

// Retrieve all requests
export const getRequests = async () => {
  try {
    const requests = await indexedDB.requests.toArray();
    return requests.map((request) => ({
      ...request,
      headers: JSON.parse(request.headers || "{}"), // Parse headers from JSON string
      body: request.body ? JSON.parse(request.body) : null, // Parse body if applicable
    }));
  } catch (error) {
    console.error("requestService.js / getRequests() -> Error", error);
    throw error;
  }
};

// Retrieve a single request by ID
export const getRequestById = async (id) => {
  try {
    const request = await indexedDB.requests.get(id);
    if (!request) {
      throw new Error(`Request with ID ${id} not found.`);
    }
    return {
      ...request,
      headers: JSON.parse(request.headers || "{}"),
      body: request.body ? JSON.parse(request.body) : null,
    };
  } catch (error) {
    console.error("requestService.js / getRequestById() -> Error", error);
    throw error;
  }
};

// Update a request by ID
export const updateRequest = async (id, updates) => {
  try {
    const existingRequest = await indexedDB.requests.get(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found.`);
    }

    const updatedRequest = {
      ...existingRequest,
      ...updates,
      headers: updates.headers ? JSON.stringify(updates.headers) : existingRequest.headers,
      body: updates.body ? JSON.stringify(updates.body) : existingRequest.body,
    };

    await indexedDB.requests.put(updatedRequest);
    console.log(`Request with ID ${id} successfully updated.`);
  } catch (error) {
    console.error("requestService.js / updateRequest() -> Error", error);
    throw error;
  }
};

// Delete a request by ID
export const deleteRequest = async (id) => {
  try {
    const request = await indexedDB.requests.get(id);
    if (!request) {
      throw new Error(`Request with ID ${id} not found.`);
    }

    await indexedDB.requests.delete(id);
    console.log(`Request with ID ${id} successfully deleted.`);
  } catch (error) {
    console.error("requestService.js / deleteRequest() -> Error", error);
    throw error;
  }
};
