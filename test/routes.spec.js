pry = require('pryjs')

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const database = require('../index').database;

chai.use(chaiHttp);

describe('Favorite Routes', () => {
  it('should return all favorited songs', done => {
    chai.request(server)
    .get('/api/v1/favorites')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('whatever');
      done();
    })
  })
});
