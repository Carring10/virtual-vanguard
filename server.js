require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
})
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  sameSite: 'None'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Requests
app.use("/", require("./server/routes/userRoutes"));
app.use("/", require("./server/routes/commentRoutes"));
app.use("/", require("./server/routes/bookmarkRoutes"));
app.use("/", require("./server/routes/articleRoutes"));
app.use("/", require("./server/routes/authRoutes"));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));