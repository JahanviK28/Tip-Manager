const express = require("express");
const connectDB = require("./config/db.connection");
const userRoutes = require("./routes/user.route");
const tipRoutes = require("./routes/tip.route");
const { logger } = require("./config/logger.config");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/tip", tipRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
