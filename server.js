require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((err, res) => {
  console.log(err);

  res.status(500).json({ message: "Something went wrong :(" });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));