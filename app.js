const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose strictQuery ayarını yapılandırın
mongoose.set('strictQuery', false);

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Kullanıcı şemasını tanımlayın
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Kullanıcı modelini oluşturun
const User = mongoose.model('User', userSchema);

// CREATE: Yeni kullanıcı ekleme
app.post('/users', (req, res) => {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age
    });
  
    newUser.save()
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err));
  });

// READ: Tüm kullanıcıları listeleme
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => res.status(400).send(err));
});

// UPDATE: Bir kullanıcıyı güncelleme
app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.send(user);
      })
      .catch(err => res.status(400).send('Update failed'));
  });

// DELETE: Bir kullanıcıyı silme
app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.send(`User with ID ${req.params.id} has been deleted`);
      })
      .catch(err => res.status(400).send('Delete failed'));
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
