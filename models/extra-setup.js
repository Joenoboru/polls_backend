function applyExtraSetup(sequelize) {
  const poll = sequelize.models.poll;
  const options = sequelize.models.options;
  options.belongsTo(poll, { as: 'poll', foreignKey: 'pollId' });
  poll.hasMany(options, { as: 'options', foreignKey: 'pollId' });
}

module.exports = { applyExtraSetup };