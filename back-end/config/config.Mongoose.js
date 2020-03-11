var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/moneymanager");
mongoose.Promise = global.Promise;

module.exports = mongoose;
