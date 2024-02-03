
const db = require("../models");

exports.getPollList = async (req, res) => {
  try {
    const pollList = await db.poll.findAll({
      attributes: ['id', 'title', 'publishedDate'],
    });
    res.send(pollList);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.getPoll = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: "Poll id cannot be empty"
      });
      return;
    }
    const poll = await db.poll.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'publishedDate'],
      include: [
        {
          attributes: ['id', 'label', 'votes'],
          model: db.option,
          as: 'options',
        },
      ],
    });
    let totalVotes = 0;
    poll.options.forEach((option) => {
      totalVotes += option.votes
    })
    poll.dataValues.totalVotes = totalVotes
    res.send(poll);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};


exports.vote = async (req, res) => {
  try {
    if (!req.body.optionId) {
      res.status(400).send({
        message: "Option id cannot be empty"
      });
      return;
    }
    const option = await db.option.findByPk(req.body.optionId);
    if (!option) {
      res.status(404).send({
        message: "Option not found"
      });
      return;
    }

    await option.increment('votes', { by: 1 });
    res.send(option);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};