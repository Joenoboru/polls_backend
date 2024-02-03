const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
const corsSettings = {
  originL: "http://localhost:3000"
};

const api = require("./routes/index");
server.use(cors(corsSettings));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", api);
const port = process.env.PORT || 3001;

const serverInstance = server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

setDatabase();
async function setDatabase() {
  try {
    await db.databaseConf.sync();
    const pollList = await db.poll.findAll();
    if (!pollList.length) {
      await seedDatabase();
    }
  } catch (error) { }
}

async function seedDatabase() {
  try {
    // Seed data for the 'poll' table
    await db.poll.bulkCreate([
      { title: 'Is bitcoin worth the time and money that mining requires?', publishedDate: 1516605447, answerType: 1 },
      { title: 'Should chatbots replace humans in customer service jobs?', publishedDate: 1516000647, answerType: 1 },
      { title: 'How are we feeling about 2018?', publishedDate: 1515568647, answerType: 1 },
      { title: 'Which country/region have you ever visited? (Select all that applies)', publishedDate: 1515482247, answerType: 2 },
      { title: 'Will new benefits encourage you to study or work in mainland?', publishedDate: 1515309447, answerType: 1 },
    ]);

    // Seed data for the 'option' table
    await db.option.bulkCreate([
      { label: 'Yes', pollId: 1 },
      { label: 'No', pollId: 1 },
      { label: 'Yes', pollId: 2 },
      { label: 'No', pollId: 2 },
      { label: 'Hopeful', pollId: 3 },
      { label: 'Doubtful', pollId: 3 },
      { label: 'Hong Kong', pollId: 4 },
      { label: 'China', pollId: 4 },
      { label: 'Australia', pollId: 4 },
      { label: 'Thailand', pollId: 4 },
      { label: 'Korea', pollId: 4 },
      { label: 'Japan', pollId: 4 },
      { label: 'Yes', pollId: 5 },
      { label: 'No', pollId: 5 },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}

module.exports = serverInstance;