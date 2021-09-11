const dotenv = require("dotenv");
dotenv.config()

module.exports = {
  mongoURI: process.env.MONGOURI,
  secretOrKey: process.env.SECRET_KEY
};


