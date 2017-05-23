var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  Line1: {
    type: String,
  },
  Line2: {
    type: String,
  },
  Line3: {
    type: String,
  },
  Suburb: {
    type: String,
  },
  State: {
    type: String,
  },
  Country: {
    type: String,
  },
  latitude: {
    type: Number;    
  },
  longitude: {
    type: Number;    
  }
});

var ClientSchema = new Schema({
  ECN: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  activeVans: {
    type: Number,
    required: true
  },
  accountBalance: {
    type: Number,
    required: true
  }
  address: [AddressSchema]
});

module.exports = mongoose.model('Tasks', ClientSchema);