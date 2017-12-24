/*
 * Package model
 */

var mongoose = require('mongoose');

var PackageSchema = new mongoose.Schema({
    name: String,
    version: String,
    date: String
});

module.exports = mongoose.model('Package', PackageSchema);
