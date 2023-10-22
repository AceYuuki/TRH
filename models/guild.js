const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: {'type': String, 'default': '+'},
    joinChannel: {'type': String, 'default': '1115578157580435587'},
    leaveChannel: {'type': String, 'default': '973296369475399790'},
    warnLog: {'type': String, 'default': '985117653934960670'},
    ticketLog: {'type': String, 'default': '985117653934960670'},
    messageLog: {'type': String, 'default': '985117653934960670'},
    captchaRole: {'type': String, 'default': '1106690640261156864'},
    serverParent: {'type': String, 'default': '1106690640261156864'},
    roleSupport: {'type': String, 'default': '1106690640261156864'},
    modLog: {'type': String, 'default': '1106690640261156864'},
    leaveJoin: {'type': String, 'default': '1077230107393003621'},
    soutient: {'type': String , 'default': '1108474765024440374'},
    linkSoutient: {'type': String , 'default': '1047987735249571871'},
    vocParent: {'type': String , 'default': '1047987735249571871'},
    rulesText: {'type': String , 'default': 'règlement'},
    rulesRole: {'type': String , 'default': '1106690640261156864'},
    rulesImage: {'type': String , 'default': 'image'},
    boostChannel: {'type': String , 'default': '1106690640261156864'},
    panelText: {'type': String , 'default': 'règlement'},
    voiceLog: {'type': String , 'default': '1106690640261156864'},
    users: [],
});

module.exports = mongoose.model('Guild', guildSchema);