const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 8;

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const db = require("../config.Mongoose");
const UserSchema = require("../../models/user");

let jwtOptions = {};
jwtOptions.secretOrKey = "#$%supasit%$%2534@#%01";

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    (username, password, done) => {
      let salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
      let hashedPassword = bcrypt.hashSync(password, salt);
      var user = new UserSchema({
        username: username,
        password: hashedPassword
      });
      return done(null, user);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    (username, password, done) => {
      UserSchema.findOne({ username: username }, function(err, user) {
        if (user === null) {
          return done(null, false, {
            message: "username or password is incorrect."
          });
        }
        bcrypt.compare(password, user.password, function(err, response) {
          if (err) {
            console.error(err);
            done(err);
          }
          if (!response) {
            return done(null, false, {
              message: "username or password is incorrect."
            });
          }
          console.log(user);
          return done(null, user);
        });
      });
    }
  )
);

const opts = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtOptions.secretOrKey
};

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    UserSchema.findOne({ _id: jwt_payload.id }, function(err, user) {
      if (user) {
        console.log("user found");
        done(null, user);
      } else {
        console.log("user is not found");
        done(null, false);
      }
    });
  })
);

module.exports = jwtOptions;
