const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
const dbURI = 'mongodb+srv://anyssakayla:Ok4me2use@taskcash.mvwvdee.mongodb.net/TaskCash?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
//app.use(express.static('public'));

//for the signup form
app.post('/signup', async (req, res) => {
  try {
    console.log('Recieved data from the signup sheet', req.body);
    const formData = new URLSearchParams(req.body.formData);
    const newUser = new User({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // console.log(newUser);
    // console.log(firstName);
    const savedUser = await newUser.save();
  //  res.send(firstName, savedUser.get('firstName'));

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//for the login form
// ... (previous code)

app.post('/login', async (req, res) => {
    try {
        console.log('Received login request:', req.body);
        const formData = new URLSearchParams(req.body.formData);

        // Check if the username and password match in the database
        const user = await User.findOne({
            username: formData.get('username'),
            password: formData.get('password'),
        });

        if (user) {
            // Successful login
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Invalid username or password
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

