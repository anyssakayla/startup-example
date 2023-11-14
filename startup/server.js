const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
const dbURI = 'mongodb+srv://anyssakayla:Ok4me2use@taskcash.mvwvdee.mongodb.net/TaskCash?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

//schema for user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

//schema for task
//does number need to be int? 
const taskSchema = new mongoose.Schema({
    taskImage: File,
    taskTitle: String,
    taskDescription: String,
    taskPrice: Number,
    taskAddress1: String,
    taskAddress2: String,
    taskCity: String,
    taskState: String,
    taskZip: String,
    taskOnline: Boolean,
    taskDate: Date,
    noTaskDate: Boolean,
    taskTime: String,
    noTaskTime: Boolean,
    noSkills: Boolean,
    taskAnimal: Boolean,
    taskTech: Boolean,
    taskArt: Boolean,
    taskChildren: Boolean,
    taskPhysical: Boolean,
    taskOrganize: Boolean,
    taskLanguage: Boolean,
    taskSocial: Boolean,
    taskSuppliesProvided: Boolean,
    taskSuppliesNeeded: Boolean,
  });
  
  const Task = mongoose.model('Task', taskSchema);

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

app.post('/login', async (req, res) => {
    try {
        console.log('Received login request:', req.body);
        const formData = new URLSearchParams(req.body.formData);

        // Check if the username and password are in the database
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


//for handing the task form:
app.post('/taskForm', async (req, res) => {
    try {
      console.log('Received task form data:', req.body);

      // Extract data from the request body
      const formData = new URLSearchParams(req.body.formData);
  
      // Create a new task using the Task model
      //do we need to use .get ??
      const newTask = new Task({
        taskImage: formData.get('taskImage'),
        taskTitle: formData.get('taskTitle'),
        taskDescription: formData.get('taskDescription'),
        taskPrice: formData.get('taskPrice'),
        taskAddress1: formData.get('taskAddress1'),
        taskAddress2: formData.get('taskAddress2'),
        taskCity: formData.get('taskCity'),
        taskState: formData.get('taskState'),
        taskZip: formData.get('taskZip'),
        taskOnline: formData.taskOnline === 'true', 
        taskDate: formData.taskDate,
        noTaskDate: formData.noTaskDate === 'true',
        taskTime: formData.taskTime,
        noTaskTime: formData.noTaskTime === 'true',
        noSkills: formData.noSkills === 'true',
        taskAnimal: formData.taskAnimal === 'true',
        taskTech: formData.taskTech === 'true',
        taskArt: formData.taskArt === 'true',
        taskChildren: formData.taskChildren === 'true',
        taskPhysical: formData.taskPhysical === 'true',
        taskOrganize: formData.taskOrganize === 'true',
        taskLanguage: formData.taskLanguage === 'true',
        taskSocial: formData.taskSocial === 'true',
        taskSuppliesProvided: formData.taskSuppliesProvided === 'true',
        taskSuppliesNeeded: formData.taskSuppliesNeeded === 'true',
      });

      const savedTask = await newTask.save();
  
      res.status(201).json(savedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

