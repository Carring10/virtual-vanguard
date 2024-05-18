require("dotenv").config();

const multer = require("multer");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage })

// Requests
app.post("/", require("./server/routes/authRoutes"));
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/", require("./server/routes/userRoutes"));
app.use("/", require("./server/routes/commentRoutes"));
app.use("/", require("./server/routes/reviewRoutes"));
app.use("/", require("./server/routes/profileRoutes"));
app.use("/", require("./server/routes/gameRoutes"));
app.use("/", require("./server/routes/authRoutes"));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// Condition for production 
app.use(express.static("client"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client"));
});
