const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
//app refers to the const app to associate with express()
//get tries to get info
//Forward slash tries to access route '/'
//req: object representing incoming request
//res: object representing outgoing request
//res.send(<plain JSON>)
