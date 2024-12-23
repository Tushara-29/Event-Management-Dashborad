const eventData = {
    name: 'New Year Party',
    description: 'A celebration to welcome the new year.',
    location: 'Central Park',
    date: '2024-12-31'
  };
  
  // Send POST request to backend
  fetch('http://localhost:5000/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData) // Send event data as JSON
  })
    .then(response => response.json())
    .then(data => {
      console.log('Event created:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  