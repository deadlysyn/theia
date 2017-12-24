/*
 * Host model
 */

var mongoose = require('mongoose');

var HostSchema = new mongoose.Schema({
    hostname: String,
    os: String,
    uname: String,
    packages: []
});

module.exports = mongoose.model('Host', HostSchema);
