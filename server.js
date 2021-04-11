require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// =============================importing routes
const userRoutes = require("./routes/userRoutes");

// ============================using the imported routes
app.use(userRoutes);
app.get("/", (req, res) => {
  res.send("200");
});

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(`caught error: ${e} when connecting to mongodb sever`);
  });
