const passport = require("passport");

//strategies
const { localStrategy, jwtStrategy } = require("../middlewares/passport.mdw");

module.exports = (app) => {
  app.use(passport.initialize());

  //// Config session strategy
  // passport.use(localStrategy);
  // passport.serializeUser((user, cb) => {
  //   return cb(null, user);
  // });
  // passport.deserializeUser((user, cb) => {
  //   return cb(null, user);
  // });

  //// Config jwt strategy
  passport.use(jwtStrategy);
};
