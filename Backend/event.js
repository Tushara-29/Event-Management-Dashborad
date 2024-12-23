const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); // To parse JSON body

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Example route for creating an event (POST request)
app.post('/api/events', (req, res) => {
  const event = req.body;
  console.log('Received event:', event);
  res.status(201).json({
    message: 'Event created successfully!',
    event: event
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
