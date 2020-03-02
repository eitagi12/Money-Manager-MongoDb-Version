const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const cors = require('cors')
const app = express()
const userService = require('./services/user')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
    userService(app, db);
    app.listen(8080, () => console.log("Server is running on port 8080"))
  })