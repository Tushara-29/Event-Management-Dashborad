const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); // To parse JSON request body

// Simulating an event database (this could be a real database in production)
let events = [];

// POST route to create a new event
app.post('/api/events', (req, res) => {
  const event = req.body; // Get the event data from the request body
  console.log('Received event:', event); // Log the event to the console (for debugging)
  
  events.push(event); // Add event to the "database"
  
  res.status(201).json({
    message: 'Event created successfully!',
    event: event
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
