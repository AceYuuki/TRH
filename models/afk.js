const mongoose = require('mongoose');

const afkSchema = mongoose.Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
});

module.exports = mongoose.model('AFK', afkSchema);