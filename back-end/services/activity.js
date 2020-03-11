const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/passport/passport");
const moment = require("moment");
const ActivitySchema = require("../models/activity");
const ObjectId = require("mongoose").Types.ObjectId;
// const { Op } = require("sequelize");

module.exports = (app, db) => {
  app.post(
    "/addactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      const activity = new ActivitySchema({
        type: req.body.type,
        amount: req.body.amount,
        remarks: req.body.remarks,
        date: req.body.date,
        user_id: req.user.id
      });
      activity.save(function(err, user) {
        if (err) {
          console.error(err);
          res.status(400).send({ message: err.message });
          return;
        }
        res.status(200).send({ message: "Created Activity successfully" });
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
      ActivitySchema.find({
        user_id: req.user.id,
        date: moment().format("YYYY-MM-DD")
      })
        .sort({ date: "desc" })
        .exec(function(err, activity) {
          console.log(activity);
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          }
          res.status(200).send(activity);
        });
    }
  );

  app.get(
    "/getactivityone/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      ActivitySchema.findOne(
        {
          _id: req.params.id,
          user_id: req.user.id
        },
        function(err, activity) {
          console.log(activity);
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          } else if (!activity) {
            res.status(404).send({ message: "Activity not found" });
            return;
          }
          res.status(200).send(activity);
        }
      );
    }
  );

  app.get(
    "/getincomeactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      ActivitySchema.find({
        user_id: req.user.id,
        type: "income"
      })
        .sort({ date: "desc" })
        .exec(function(err, activity) {
          console.log(activity);
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          }
          res.status(200).send(activity);
        });
    }
  );

  app.get(
    "/getexpenseactivity",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      ActivitySchema.find({
        user_id: req.user.id,
        type: "expense"
      })
        .sort({ date: "desc" })
        .exec(function(err, activity) {
          console.log(activity);
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          }
          res.status(200).send(activity);
        });
    }
  );

  app.post(
    "/getbydate",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      ActivitySchema.find({
        user_id: req.user.id,
        date: req.body.date
      })
        .sort({ date: "desc" })
        .exec(function(err, activity) {
          console.log(activity);
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          }
          res.status(200).send(activity);
        });
    }
  );

  app.delete(
    "/deleteactivity/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      ActivitySchema.deleteOne({ _id: req.params.id }, function(err) {
        if (err) {
          console.error(err);
          res.status(400).send({ message: err.message });
          return;
        }
        res.status(200).send("Delete success");
      });
    }
  );

  app.put(
    "/update-activity/:id",
    passport.authenticate("jwt", { session: false }),
    async function async(req, res) {
      ActivitySchema.update(
        { _id: req.params.id, user_id: req.user.id },
        {
          amount: req.body.amount,
          remarks: req.body.remarks,
          date: req.body.date
        },
        { upsert: false },
        function(err, activity) {
          if (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
            return;
          }
          res.status(200).send("Updated");
        }
      );

      // let targetActivity = await db.activity.findOne({
      //   where: { id: req.params.id, user_id: req.user.id }
      // });
      // if (!targetActivity) {
      //   res.status(400).send({ message: "Activity is not found" });
      // } else {
      //   targetActivity.update({
      //     amount: req.body.amount,
      //     remarks: req.body.remarks,
      //     date: req.body.date
      //   });
      //   res.status(200).json({ message: "success" });
      // }
    }
  );

  app.get(
    "/dashboard",
    passport.authenticate("jwt", { session: false }),
    async function(req, res) {
      let incomeDashboard = 0;
      let expenseDashboard = 0;
      let balanceDashboard = 0;

      ActivitySchema.find(
        {
          user_id: req.user.id
        },
        (err, activitys) => {
          if (err) {
            console.log(err);
            res.status(400).send();
          }
          activitys.forEach((activity, index) => {
            if (activity.type === "income") {
              incomeDashboard += activity.amount;
            } else {
              expenseDashboard += activity.amount;
            }
          });
          balanceDashboard = incomeDashboard - expenseDashboard;
          res
            .status(200)
            .send({ incomeDashboard, expenseDashboard, balanceDashboard });
        }
      );
    }
  );
};
