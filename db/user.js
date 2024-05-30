const { default: mongoose } = require("mongoose");
const registerSchema = require("./registerSchema");
const statusSchema = require("./statusSchema");

const DB_NAME = process.env.DB_NAME || "VehicleMonitoringSystemApp";
const URI = process.env.MONGO_URI || "mongodb+srv://temp:temp@cluster0.y0j5wue.mongodb.net";
const MONGO_URI = `${URI}/${DB_NAME}`;

mongoose.connect(MONGO_URI).then(() => console.log("Connected")).catch((err) => console.log(err))

const vehicleRegister = mongoose.model('register', registerSchema, 'vehicleRegister');
const vehicleStatus = mongoose.model('status', statusSchema, 'vehicleStatus');

module.exports = {vehicleRegister, vehicleStatus};