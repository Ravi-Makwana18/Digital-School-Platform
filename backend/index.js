const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Routes = require("./routes/route.js")
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json({ limit: '10mb' }))

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes); // Your main routes should be defined or imported here

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})