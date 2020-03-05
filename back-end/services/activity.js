const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/passport/passport");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = (app, db) => {
  app.post(
    "/addactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .create({
          type: req.body.type,
          amount: req.body.amount,
          remarks: req.body.remarks,
          date: req.body.date,
          user_id: req.user.id
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    }
  );
  app.get(
    "/protected-route",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      res.status(200).send(req.user);
    }
  );

  app.get(
    "/getactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .findAll({
          where: {
            user_id: req.user.id,
            date: moment().format("YYYY-MM-DD")
          },
          order: [
            ["date", "ASC"],
            ["id", "ASC"]
          ]
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    }
  );
  app.get(
    "/getincomeactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .findAll({
          where: {
            user_id: req.user.id,
            type: "income",
            createdAt: {
              [Op.gte]: moment()
                .startOf("day")
                .toDate()
            }
          },
          order: [
            ["date", "ASC"],
            ["id", "ASC"]
          ]
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    }
  );
  app.get(
    "/getexpenseactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .findAll({
          where: { user_id: req.user.id, type: "expense" }
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    }
  );

  app.post(
    "/getbydate",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      console.log({ req_body: req.body });
      db.activity
        .findAll({
          where: { date: req.body.date, user_id: req.user.id }
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({ message: err.message });
        });
    }
  );

  app.delete(
    "/deleteactivity/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .destroy({
          where: { id: req.params.id }
        })
        .then(result => {
          res.status(201).send("Deleted");
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
    }
  );

  app.put(
    "/update-activity/:id",
    passport.authenticate("jwt", { session: false }),
    async function async(req, res) {
      let targetActivity = await db.activity.findOne({
        where: { id: req.params.id, user_id: req.user.id }
      });
      if (!targetActivity) {
        res.status(400).send({ message: "Activity is not found" });
      } else {
        targetActivity.update({
          amount: req.body.amount,
          remarks: req.body.remarks,
          date: req.body.date
        });
        res.status(200).json({ message: "success" });
      }
    }
  );

  app.get(
    "/dashboard",
    passport.authenticate("jwt", { session: false }),
    async function(req, res) {
      let incomeDashboard = 0;
      let expenseDashboard = 0;

      await db.activity
        .findAll({
          attributes: [
            [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "totalAmount"]
          ],
          where: { user_id: req.user.id, type: "income" }
        })
        .then(result => {
          incomeDashboard = result[0].dataValues.totalAmount;
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
      await db.activity
        .findAll({
          attributes: [
            [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "totalAmount"]
          ],
          where: { user_id: req.user.id, type: "expense" }
        })
        .then(result => {
          expenseDashboard = result[0].dataValues.totalAmount;
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
      let balanceDashboard = incomeDashboard - expenseDashboard;
      res
        .status(200)
        .send({ incomeDashboard, expenseDashboard, balanceDashboard });
    }
  );
};
