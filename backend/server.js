const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const propertyRoutes = express.Router();
const PORT = 4000;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

module.exports = {
    Property: require('./property.model'),
    User: require('./models/user.model')
}
app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology: true } );
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

propertyRoutes.route("/register").post(function(req, res) {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  module.exports.User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new module.exports.User({
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

  propertyRoutes.route("/login").post(function(req, res) {
    
    const { errors, isValid } = validateLoginInput(req.body);
    
      if (!isValid) {
        return res.status(400).json(errors);
      }
    const email = req.body.email;
      const password = req.body.password;
    
      module.exports.User.findOne({ email }).then(user => {
        
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
    
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            
            const payload = {
              id: user.id,
              name: user.name
            };
    
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

propertyRoutes.route('/').get(function(req, res) {
    module.exports.Property.find(function(err, properties) {
        if (err) {
            console.log(err);
        } else {
            res.json(properties);
        }
    });
});

propertyRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    module.exports.Property.findById(id, function(err, property) {
        res.json(property);
    });
});

propertyRoutes.route('/update/:id').post(function(req, res) {
    module.exports.Property.findById(req.params.id, function(err, property) {
        if (!property)
            res.status(404).send("data is not found");
        else
        property.property_description = req.body.property_description;
        property.property_responsible = req.body.property_responsible;
        property.property_priority = req.body.property_priority;
        property.property_completed = req.body.property_completed;

            property.save().then(property => {
                res.json('Property updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

propertyRoutes.route('/add').post(function(req, res) {
    let property = new module.exports.Property(req.body);
    property.save()
        .then(property => {
            res.status(200).json({'property': 'property added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new property failed');
        });
});

propertyRoutes.route('/delete/:id').delete(function(req, res) {
    module.exports.Property.findById(req.params.id, function(err, property) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(
          property)
      }
    })
})


// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.use('/book', propertyRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});