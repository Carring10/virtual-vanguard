require("dotenv").config();

const express = require("express");

const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Requests
app.use("/", require("./server/routes/userRoutes"));
app.use("/", require("./server/routes/commentRoutes"));
app.use("/", require("./server/routes/bookmarkRoutes"));
app.use("/", require("./server/routes/articleRoutes"));
app.use("/", require("./server/routes/authRoutes"));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));