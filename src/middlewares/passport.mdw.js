const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// function verify
function localVerify(username, password, done) {
  //logic verify (find user, compare username & password,...)

  // verify failed => return done(null, false);
  // error => return done(err, false);

  const userInfor = {
    id: 1,
    username,
  };

  return done(null, userInfor);
}
const localStrategy = new LocalStrategy(localVerify);

// function verify
function jwtVerify(jwt_payload, done) {
  //logic verify with data from jwt_payload (find user, compare username & password,...)

  const userInfor = {
    id: 1,
    jwt_payload,
  };

  return done(null, userInfor);
}
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  },
  jwtVerify
);

module.exports = {
  jwtStrategy,
  localStrategy,
};
