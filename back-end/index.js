const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const app = express();
const userService = require("./services/user");
const activityService = require("./services/activity");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
  userService(app, db);
  activityService(app, db);
  app.listen(8080, () => console.log("Server is running on port 8080"));
});
