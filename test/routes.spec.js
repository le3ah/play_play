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
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('name');
      response.body[0].name.should.equal('Crazy');
      response.body[0].should.have.property('artist_name');
      response.body[0].artist_name.should.equal('Patsy Cline');
      response.body[0].should.have.property('genre');
      response.body[0].genre.should.equal('Country');
      response.body[0].should.have.property('rating');
      response.body[0].rating.should.equal(98);
      done();
    })
  })
});
