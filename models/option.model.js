module.exports = (database, Sequelize) => {
  return database.define("options", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pollId: {
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.TEXT
    },
    votes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });
};