const request = require('supertest');
const server = require('./server');
const db = require('./models');

afterAll(async () => {
  await new Promise(resolve => server.close(resolve)); // 關閉 Express 服務器
  await db.databaseConf.close(); // 關閉 Sequelize 連接
});

describe('GET /api/polls', () => {
  it('should return a list of polls', async () => {
    const response = await request(server).get('/api/polls');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/poll/:id', () => {
  it('should return a poll', async () => {
    const response = await request(server).get('/api/poll/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('publishedDate');
    expect(response.body).toHaveProperty('options');
  });
});

describe('POST /api/poll/vote', () => {
  it('should increment votes for a valid optionId', async () => {
    const response = await request(server).post('/api/poll/vote').send({ optionId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('label');
    expect(response.body).toHaveProperty('votes');
  });
});
