const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware untuk parsing JSON

// Data dummy disimpan dalam array
let items = [
  { id: 1, name: "Item 1", description: "Description of Item 1" },
  { id: 2, name: "Item 2", description: "Description of Item 2" },
];

// 1. GET
app.get("/items", (req, res) => {
  res.json(items);
});

// 2. GET /items/:id:
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
});

// 3. POST /items:
app.post("/items", (req, res) => {
  const newItem = req.body;

  // Validasi data
  if (!validateItem(newItem)) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  // Menambahkan data dengan ID unik
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// 4. PUT /items/:id:
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const updatedItem = req.body;

  // Validasi data
  if (!validateItem(updatedItem)) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  items[itemIndex] = { id, ...updatedItem };
  res.json(items[itemIndex]);
});

// 5. DELETE /items/:id:
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items.splice(itemIndex, 1);
  res.status(200).json({ message: "Item deleted successfully" });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
