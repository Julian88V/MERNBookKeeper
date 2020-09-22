const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Property = new Schema({
    property_address:{
        type: String
    },
    property_description: {
        type: String
    },
    property_tenant: {
        type: String
    },
    property_responsible: {
        type: String
    },
    property_priority: {
        type: String
    },
    property_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('properties', Property, 'properties');