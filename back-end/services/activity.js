const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/passport/passport");

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
          where: { user_id: req.user.id }
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
          where: { user_id: req.user.id, type: "income" }
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

  app.get(
    "/getbydate",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.activity
        .findAll({
          where: { date: req.body.date, user_id: req.user.id }
        })
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
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
};
