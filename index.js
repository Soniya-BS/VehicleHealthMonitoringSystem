const bodyParser = require('body-parser');
const express = require('express');
const { todos, users } = require('./db/user');
const app = express()
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// TODO ENDPOINTS
app.post('/create', async (req, res) => {
    const todoBody = req.body;

    const todo = await todos.create({
        title: todoBody.title,
        desc: todoBody.desc,
        active: todoBody.active,
        dateCreated: Date.now(),
        owner: todoBody.owner,
    });

    todo ? res.status(201).json({msg: "Success", data: todo}) : res.status(500).json({msg: "Error", data: todo})
})

app.delete('/delete/:id', async (req, res) => {
    const todoId = req.params.id;
    const deletedTodo = await todos.deleteOne({_id: todoId})

    deletedTodo ? res.status(200).json({msg: "Success", data: deletedTodo}) 
                : res.status(500).json({msg: "Error", data: deletedTodo}) 
})

app.put('/update/:id', async (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;

    //                                         id            newtodo
    const todo = await todos.findOneAndUpdate({_id: todoId}, updatedTodo);

    todo ?  res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

app.put('/enable/:id', async (req, res) => {
    const todoId = req.params.id;
    const todo = await todos.findOneAndUpdate({_id: todoId}, {active: true});

    todo ? res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

app.put('/disable/:id', async (req, res) => {
    const todoId = req.params.id;
    const todo = await todos.findOneAndUpdate({_id: todoId}, {active: false});

    todo ? res.status(200).json({msg: "Success", data: todo}) 
                : res.status(500).json({msg: "Error", data: todo}) 
})

// USERS ENDPOINTS
app.post('/user/create', async (req, res) => {
    const user = req.body;
    const newUser = await users.create(user);

    newUser ? res.status(201).json({msg: "Success", data: newUser}) 
            : res.status(500).json({msg: "Error", data: newUser})
})

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`))

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const Vehicle = require('./vehicleRegister')
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// const DB_NAME = process.env.DB_NAME || vhmSystem;

// //Body parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// //MongoDB connection
// const URL = process.env.URL;
// mongoose.connect(URL).then(() => {
//     console.log("Connected to MongoDB done..!!");
// }).catch(err => {
//     console.log("Error in connecting MongoDB...!!", err);
//     process.exit();
// });

// //Register Vehicle
// //->   http://localhost:3000/register
// app.post('/register', async (req, res) => {
//     try {
//         const vehicle = new Vehicle(req.body);
//         await vehicle.save();
//         res.status(201).json(vehicle);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Searching ID (chassis number)
// //->   http://localhost:3000/id/
// app.get('/id/:chassisNumber', async (req, res) => {
//     const num = req.params.chassisNumber;
//     const fields = 'name vehicleType registerNumber vehicleModel email';
//     //                                   where('name').equals(name)
//     const display = await Vehicle.findOne({ chassisNumber: num }).select(fields);
//     if (!display) {
//         res.json({ msg: "Data not found.....!!!" })
//     } else {
//         res.json({ msg: "successufully name found.....!!!", data: display })
//     }
// })

// //TODO login part
// //for execute purpose
// app.get("/", (req, res) => {
//     res.end("Hello world")
// })
// app.get("/about", (req, res) => {
//     res.end("welcome to about page")
// })
// app.get("/name/:myname", (req, res) => {
//     res.end("welcome " + req.params.myname)
// })

// app.listen(PORT, () => { console.log('Server is running on port ${PORT}'); });