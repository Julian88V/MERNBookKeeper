const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const propertyRoutes = express.Router();
const PORT = 4000;
const passport = require("passport");

let User = require('./api/usersApi')
module.exports = {
    Property: require('./property.model'),
    
}
app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

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

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.use('/book', propertyRoutes);
app.use('/api/users', User);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});