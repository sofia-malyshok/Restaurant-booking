const { signup, login, fbCallback } = require("../controllers/auth");
const passport = require("passport");

module.exports = (router) => {
  router.route("/auth/signup").post(signup);
  router.route("/auth/login").post(login);
  router
    .route("/auth/facebook")
    .get(passport.authenticate("facebook", { scope: "email", session: false }));
  router.route("/auth/facebook/callback").get(
    passport.authenticate("facebook", {
      failureRedirect: "/",
      session: false,
    }),
    fbCallback
  );
};
