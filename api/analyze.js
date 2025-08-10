// A simplified test function to isolate the crash.
export default async function handler(req, res) {
  try {
    // This function doesn't do any processing.
    // It just confirms that the server function can be called successfully.
    console.log("Test function was called successfully.");
    
    // It sends back a simple JSON response.
    res.status(200).json({ message: "Backend is running correctly." });

  } catch (error) {
    console.error('Error in test handler:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};
