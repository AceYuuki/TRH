const Level = require('../models/level');

const getLevel = async (userId, guildId) => {
  let userLevel = await Level.findOne({ userId, guildId });
  if (!userLevel) {
    userLevel = new Level({ userId, guildId });
    await userLevel.save();
  }
  return userLevel;
};

const addExperience = async (userId, guildId, experienceToAdd) => {
  const userLevel = await getLevel(userId, guildId);
  userLevel.experience += experienceToAdd;

  const levelThreshold = userLevel.level * 100; // You can adjust this formula based on your leveling system

  if (userLevel.experience >= levelThreshold) {
    userLevel.level++;
    userLevel.experience = 0;
  }

  await userLevel.save();
  return userLevel;
};

const getLeaderboard = async (guildId, limit = 10) => {
  // Fetch the top 'limit' users from the database based on experience in descending order
  const leaderboard = await Level.find({ guildId })
    .sort({ experience: -1, level: -1 })
    .limit(limit)
    .lean();

  return leaderboard;
};

module.exports = { getLevel, addExperience, getLeaderboard };
