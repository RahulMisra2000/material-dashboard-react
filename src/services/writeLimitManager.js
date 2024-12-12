class WriteLimitManager {
  constructor(key = "writeCount", maxWrites = 5) {
    this.key = key;
    this.maxWrites = maxWrites;
  }

  // Retrieve the current write count from sessionStorage
  getWriteCount() {
    const count = parseInt(sessionStorage.getItem(this.key) || "0", 10);
    return isNaN(count) ? 0 : count;
  }

  // Increment the write count and save it to sessionStorage
  incrementWriteCount() {
    const currentCount = this.getWriteCount();
    if (currentCount < this.maxWrites) {
      sessionStorage.setItem(this.key, currentCount + 1);
      return true; // Indicating the increment was successful
    }
    return false; // Indicating the limit was reached
  }

  // Check if the write limit is reached
  isWriteLimitReached() {
    return this.getWriteCount() >= this.maxWrites;
  }

  // Reset the write count to 0
  resetWriteCount() {
    sessionStorage.setItem(this.key, "0");
  }

  // Remove the write count entirely from sessionStorage
  deleteWriteCount() {
    sessionStorage.removeItem(this.key);
  }

  info() {
    return { keyName: this.key, maxWrites: this.maxWrites, currentCount: this.getWriteCount() };
  }
}

export default WriteLimitManager;
