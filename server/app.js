// 'Import' the Express module instead of http
import express from "express";
// Initialize the Express application
const app = express();

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// Tell the Express app to start listening
app.listen(4040, () => console.log("Listening on port 4040"));
