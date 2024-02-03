
module.exports = (database, Sequelize) => {
  return database.define("poll", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    publishedDate: {
      type: Sequelize.TEXT
    },
    answerType: {
      type: Sequelize.INTEGER
    },
  });
};
