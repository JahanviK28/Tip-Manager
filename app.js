const express = require('express');
const connectDB = require('./config/db.connection');
const userRoutes = require('./routes/user.route');
const tipRoutes = require('./routes/tip.route')
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoutes);
app.use('/api/tip', tipRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
