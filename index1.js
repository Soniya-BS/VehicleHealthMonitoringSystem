const bodyParser = require('body-parser');
const express = require('express');
const { vehicleRegister, vehicleStatus } = require('./db/user');
const app = express()
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// TODO ENDPOINTS
app.post('/Register', async (req, res) => {
    const  body= req.body;

    const register = await vehicleRegister.create({
        username: body.username,
        email: body.email,
        password: body.password,
        confirmpassword: body.confirmpassword,
        vehiclenumber: body.vehiclenumber,
        chasinumber: body.chasinumber,
    });

    register ? res.status(201).json({msg: "Success", data: register}) : res.status(500).json({msg: "Error", data: register})
})

app.get("/", (req, res) => {
    res.end("Hello world")
})

app.post('/status', async (req, res) => {
    const  body= req.body;

    const status = await vehicleStatus.create({
        vehicalstatus: body.vehicalstatus,
    });

    status ? res.status(201).json({msg: "Success", data: status}) : res.status(500).json({msg: "Error", data: status})
})

app.get('/statusdata', async (req, res) => {
    try {
        // Fetch all users from the database
        const statusdata = await trackStatus.find({});

        res.json(statusdata);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    if(email === "sonu@gmail.com" && password === "1234")
        res.json({
            data: "Login Successful",
        })
    else 
        res.end("Incorrect Credentials! Try Again")
})

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`))
