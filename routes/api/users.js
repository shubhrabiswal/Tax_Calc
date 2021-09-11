const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


// @route POST api/users/amountinput
// @desc User inputs the Bas,LTA,HRA,FA,Inv,Rent,Citytype,Med

router.post("/amountinput", (req, res) => {
  const uid = req.params.id;
  const Bas = req.body.Bas;
  const LTA = req.body.LTA;
  const HRA = req.body.HRA;
  const FA = req.body.FA;
  const Inv = req.body.Inv;
  const Rent = req.body.Rent;
  const CityType = req.body.CityType;
  const Med = req.body.Med;
  const AppHRA = 0;
  const TaxInc = 0;
  if(!Bas||!LTA||!HRA||!FA||!Inv||!Rent||!CityType||!Med){
    res.status(404).json({Fieldmissing: "One or more field(s) missing"})
  }

  // 50% of Bas
  // Rent - 10% of Bas
  // HRA

  
  var value2 = Rent - (0.10*Bas);
  if(CityType == 'metro'){
    var value1 = 0.50*Bas;
    AppHRA = Math.min(value1,value2,AppHRA);
  }

  if(CityType == 'non-metro'){
    var value1 = 0.40*Bas;
    AppHRA = Math.min(value1,value2,AppHRA);
  }

  // Bas||!LTA||!HRA||!FA||!Inv||!Rent||!CityType||!Med
  TaxInc = (Bas + LTA + HRA + FA) - AppHRA - Inv - Med

  User.findOneAndUpdate({ "_id": uid }, 
  { "$set": { "Bas": Bas, "LTA": LTA, 
  "HRA": HRA, "FA": FA,"Inv":Inv,"Rent":Rent,"CityType":CityType,
  "Med":Med,"AppHRA":AppHRA,"TaxInc":TaxInc}})
  .exec(function(err, usr){
    if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
             res.status(200).send(usr);
    }
 });
})

module.exports = router;
