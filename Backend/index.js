const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;
app.use(express.json());

// Read/Write from JSON File
const readData = () => JSON.parse(fs.readFileSync("data.json", "utf8"));
const writeData = (data) => fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

// APIs
app.get("/events", (req, res) => {
  const data = readData();
  res.json(data.events);
});

app.post("/events", (req, res) => {
  const { name, description, location, date } = req.body;
  if (!name || !description || !location || !date) return res.status(400).send("All fields required");
  const data = readData();
  const newEvent = { id: Date.now(), name, description, location, date, attendees: [], tasks: [] };
  data.events.push(newEvent);
  writeData(data);
  res.status(201).json(newEvent);
});

app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, location, date } = req.body;
  const data = readData();
  const event = data.events.find((event) => event.id == id);
  if (!event) return res.status(404).send("Event not found");
  Object.assign(event, { name, description, location, date });
  writeData(data);
  res.json(event);
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.events = data.events.filter((event) => event.id != id);
  writeData(data);
  res.sendStatus(204);
});

// Attendees
app.post("/events/:id/attendees", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).send("Name required");
  const data = readData();
  const event = data.events.find((event) => event.id == id);
  if (!event) return res.status(404).send("Event not found");
  const newAttendee = { id: Date.now(), name };
  event.attendees.push(newAttendee);
  writeData(data);
  res.status(201).json(newAttendee);
});

app.delete("/events/:eventId/attendees/:attendeeId", (req, res) => {
  const { eventId, attendeeId } = req.params;
  const data = readData();
  const event = data.events.find((event) => event.id == eventId);
  if (!event) return res.status(404).send("Event not found");
  event.attendees = event.attendees.filter((att) => att.id != attendeeId);
  writeData(data);
  res.sendStatus(204);
});

// Tasks
app.post("/events/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { name, deadline, assignedTo } = req.body;
  if (!name || !deadline) return res.status(400).send("Name and deadline required");
  const data = readData();
  const event = data.events.find((event) => event.id == id);
  if (!event) return res.status(404).send("Event not found");
  const newTask = { id: Date.now(), name, deadline, status: "Pending", assignedTo };
  event.tasks.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
});

app.put("/events/:eventId/tasks/:taskId", (req, res) => {
  const { eventId, taskId } = req.params;
  const { status } = req.body;
  const data = readData();
  const event = data.events.find((event) => event.id == eventId);
  if (!event) return res.status(404).send("Event not found");
  const task = event.tasks.find((task) => task.id == taskId);
  if (!task) return res.status(404).send("Task not found");
  task.status = status;
  writeData(data);
  res.json(task);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
