const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Role', roleSchema);
