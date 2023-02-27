/* eslint-disable no-undef */
const express = require("express");
const app = express();
const morgan = require("morgan");
const connect = require("./DataBase/DB");
const categoryApi = require("./Routes/categoryRoutes");
const port = process.env.PORT || 3000;
const uri = process.env.uri;
require("dotenv").config();
//use morgan in development only
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/api/v1/category", categoryApi);
connect(uri)
  .then((result) => console.log(result.connection.host))
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`listen at port ${port}`);
});