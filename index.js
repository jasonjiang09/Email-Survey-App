const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport"); 
const keys = require("./config/keys.js");

require("./models/user.js");
require("./services/passport.js");

mongoose
.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("DB Connected"));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //maxAge is how long cookie can stay in browser until not valid in (ms)
    keys: [keys.cookieKey]
    //keys are to encrypt cookies
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes.js")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//Tells express to tells node to listen to incoming traffic on port 5000
