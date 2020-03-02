const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/passport/passport");

module.exports = (app, db) => {
  app.post("/registeruser", async (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      try {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
        } else {
          user.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number,
            role: user
          });
          res.status(200).send({ message: "user created" });
        }
      } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
      }
    })(req, res, next);
  });

  app.post("/loginuser", async (req, res, next) => {
    await passport.authenticate("login", (err, user, info) => {
      try {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          if (info.message === "username or password is incorrect.") {
            console.error(info.message);
            res.status(401).send({ message: info.message });
          } else {
            res.status(400).send(info.message);
          }
        } else {
          const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            jwtOptions.secretOrKey,
            { expiresIn: 3600 }
          );
          res.status(200).send({
            auth: true,
            token,
            message: "user found & logged in",
            role: user.role
          });
        }
      } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
      }
    })(req, res, next);
  });

  app.get(
    "/protected-route",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      res.status(200).send(req.user);
    }
  );
};
