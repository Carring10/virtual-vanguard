require("dotenv").config();

const multer = require("multer");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const cors = require('cors');
const PORT = process.env.PORT || 8800;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
})

app.use(express.json());

app.use(cors({
  origin: "https://virtual-vanguard.netlify.app",
  credentials: true,
  sameSite: 'None'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsMiddleware = (req, res, next) => {
  res = applyCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  next()
}

const applyCorsHeaders = res => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://virtual-vanguard-mmo-f84f119b0dd9.herokuapp.com')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  return res;
}

app.use(corsMiddleware);

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
