const API_URL = "http://localhost:5000";

// Fetch and display events
const fetchEvents = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = events
    .map((event) => `<div>${event.name} - ${event.date}</div>`)
    .join("");
};

// Add Event
document.getElementById("add-event").addEventListener("click", async () => {
  const name = prompt("Event Name:");
  const description = prompt("Description:");
  const location = prompt("Location:");
  const date = prompt("Date (YYYY-MM-DD):");
  if (!name || !description || !location || !date) return alert("All fields are required");
  await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, location, date }),
  });
  fetchEvents();
});

// Initial Load
fetchEvents();
