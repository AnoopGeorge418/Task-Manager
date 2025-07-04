// loading required modules
const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
require('dotenv').config()

// Initialization
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect db
mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(() => console.log("MongoDb Connected!"))
.catch(err => console.error(`MongoDb connection error: ${err}`));

// Routes
app.use('/api', authRoutes);

// Connecting to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})