// musicQueue.js
const mongoose = require('mongoose');

const musicItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  addedBy: { // Champ pour enregistrer qui a ajouté la musique
    type: String,
    required: true,
  },
  position: { // Champ pour enregistrer la position dans la queue
    type: Number,
    required: true,
  },
});

const musicQueueSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  queue: {
    type: [musicItemSchema],
    default: [],
  },
});

module.exports = mongoose.model('MusicQueue', musicQueueSchema);
