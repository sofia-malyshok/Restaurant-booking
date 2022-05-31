const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require("../models/user");

passport.initialize();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await UserModel.findOne({ email }).catch(done);
      if (!user) {
        return done(null, false, { message: "Incorrect email!" });
      }

      const isValid = await user.validatePassword(password).catch(done);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password!" });
      }
      done(null, user);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwtPayload, done) => {
      UserModel.findOne({ _id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_API_KEY,
      clientSecret: process.env.FACEBOOK_API_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "first_name", "last_name", "id"],
    },
    function (accessToken, refreshToken, profile, done) {
      if (!profile) {
        return done(null, profile);
      }
      UserModel.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          console.log(err);
        }

        console.log(profile);

        if (user) {
          done(null, user);
        } else {
          user = new UserModel({
            facebookId: profile.id,
            name: profile.name.familyName,
            surname: profile.name.givenName,
            email: profile.emails[0].value,
            password: "facebook",
          });
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(user);
              done(null, user);
            }
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id).catch(done);
  done(null, user);
});
