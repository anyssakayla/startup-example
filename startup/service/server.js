const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); //for the image
const path = require('path');
const fs = require('fs'); 
const WebSocket = require('ws'); 
const http = require('http');

const upload = multer({ dest: 'uploads/'});
//const storage = multer.memoryStorage();
//const upload = multer({storage : storage });

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 3000 }); //works with server or port
//const server = http.createServer(express);
//const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 8080;

app.use(cors());
//const config = require('./dbConfig.json');
const dbURI = 'mongodb+srv://anyssakayla:Ok4me2use@$taskcash.mvwvdee.mongodb.net/TaskCash?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/uploads', express.static('uploads'));
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
    taskImage: String,
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
app.post('/taskForm', upload.single('taskImage'), async (req, res) => {
    try {
      console.log('Received file:', req.file);
      console.log('Received task form data:', req.body);
      
      // Extract data from the request body
      const formData = req.body;
      const taskImage = req.file;
      // Create a new task using the Task model
      //do we need to use .get ??
      const newTask = new Task({
        taskImage: taskImage.filename,
        taskTitle: formData.taskTitle,
        taskDescription: formData.taskDescription,
        taskPrice: formData.taskPrice,
        taskAddress1: formData.taskAddress1,
        taskAddress2: formData.taskAddress2,
        taskCity: formData.taskCity,
        taskState: formData.taskState,
        taskZip: formData.taskZip,
        taskOnline: formData.taskOnline, 
        taskDate: formData.taskDate,
        noTaskDate: formData.noTaskDate,
        taskTime: formData.taskTime,
        noTaskTime: formData.noTaskTime,
        noSkills: formData.noSkills,
        taskAnimal: formData.taskAnimal,
        taskTech: formData.taskTech,
        taskArt: formData.taskArt,
        taskChildren: formData.taskChildren,
        taskPhysical: formData.taskPhysical,
        taskOrganize: formData.taskOrganize,
        taskLanguage: formData.taskLanguage,
        taskSocial: formData.taskSocial,
        taskSuppliesProvided: formData.taskSuppliesProvided,
        taskSuppliesNeeded: formData.taskSuppliesNeeded,
      });

      const savedTask = await newTask.save();
  
      res.status(201).json(savedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  //used to get data from mongodb
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(dbURI);
  async function run() {
    try {
      await client.connect();

      const db = client.db("TaskCash");
      const coll = db.collection("tasks");

      const cursor = coll.find();

      await cursor.forEach(console.log);
    } finally {
      //  close when the error is done
     // await client.close();
     //messes up when i use it
    }
  }
  run().catch(console.dir);

  //just added this for the buy.js
  app.get('/buy.js', async (req, res) => {
    try {
      const db = client.db("TaskCash");
      const coll = db.collection("tasks");
      const tasks = await coll.find().toArray();
  
      res.setHeader('Content-Type', 'application/javascript');
      res.json({tasks});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



//For websocket
wss.on('connection', function connection(ws){
  console.log('A new client connected');
  //ws.send('Welcome');
  ws.on('message', function incoming(message){ //change to data?
    console.log('recieved: %s', message);
    console.log('might be blob: ', message)

    const stringMessage = message.toString('utf-8'); //was sending as an object instead of text, but this fixes it
    console.log(stringMessage);
   // console.log('Recieved ${message}');
  //  ws.send(stringMessage); //do i need to take this out?
          wss.clients.forEach(function each(client){
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(stringMessage);
             // client.send(JSON.stringify(message));
             // console.log(JSON.stringify(message));
          }
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});