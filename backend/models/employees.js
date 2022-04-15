const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({ 
   'name': {type: String},
   'id': {type: String},
   'login': {type: String},
   'salary': {type: String},
   'date': {type: Date, default: Date.now}
}, {collection: 'Employees'});

employeeSchema.plugin(uniqueValidator);

const employeeModel = mongoose.model('Employees', employeeSchema);
module.exports = employeeModel;