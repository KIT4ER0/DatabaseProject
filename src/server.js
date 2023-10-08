const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const routes = require("./routes");

const port = process.env.PORT || 3002;
const app = express();
dotenv.config({});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
