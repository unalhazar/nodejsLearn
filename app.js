const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = []; 

// CREATE
app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(user);
  res.send(user);
});

// READ: Tüm kullanıcıları 
app.get('/users', (req, res) => {
  res.send(users);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.send(`User with ID ${userId} has been deleted`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
