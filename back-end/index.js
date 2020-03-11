const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/config.Mongoose");
const userService = require("./services/user.js");
const activityService = require("./services/activity.js");
app.use(cors());

require("./config/passport/passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userService(app, db);
activityService(app, db);
app.listen(8080, () => console.log("Server is running on port 8080"));
