const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Routes = require("./routes/route.js")
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

const allowedOrigins = [
  'http://localhost:3000',                                    // Local development
  'https://digital-school-platform-7z5x.vercel.app',         // Vercel deployment
  process.env.FRONTEND_URL                                    // Environment variable if set
].filter(Boolean); // Remove undefined/null values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    console.log('Request Origin:', origin);
    console.log('Allowed Origins:', allowedOrigins);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.log(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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