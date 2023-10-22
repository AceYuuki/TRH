// models/level.js
const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
});

module.exports = mongoose.model('Level', levelSchema);
