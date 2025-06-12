const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const mongoConnect = require("./config/mongo.connect");
const userRoutes = require("./routes/user.routes");

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));