const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({
  path: ".env",
});
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const { globalError } = require("./middleware/globalErrorHandler");
const { notFound } = require("./middleware/notFound");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/auth/", authRoute);

const port = 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Connect to database successfully");
});

// Handle unmatched routes
app.use("*", notFound);
app.use(globalError);
