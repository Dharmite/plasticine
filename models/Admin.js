const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./Base');

const AdminSchema = new Schema({});

module.exports = Admin = Base.discriminator("admin", AdminSchema);