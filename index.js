const mongoose = require("mongoose");
const express = require("express");
const app = express();

// app.use("./models/blog");
require("./models/blog");
app.use(express.json());

app.use("/api", require("./routes/blog"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
