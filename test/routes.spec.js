pry = require('pryjs')

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const database = require('../index').database;

chai.use(chaiHttp);

describe('Favorite Routes', () => {
  before((done) => {
    database.raw("TRUNCATE playlists_favorites restart identity;")
    .then(() => database.raw("TRUNCATE playlists restart identity CASCADE;"))
    .then(() => database.raw("TRUNCATE favorites restart identity CASCADE;"))
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });
  before((done) => {
     database.migrate.latest()
       .then(() => done())
       .catch(error => {
         throw error;
       });
   });

   beforeEach((done) => {
     database.seed.run()
       .then(() => done())
       .catch(error => {
         throw error;
       });
   });
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
  it('should return a 404 for a route that does not exist', done => {
  chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});
describe('POST /api/v1/favorites', () => {
  it('should create a new favorite', done => {
    chai.request(server)
    .post('/api/v1/favorites')
    .send({
      name: 'Five Dollar Bill',
      artist_name: 'Corb Lund',
      genre: 'AgTrag',
      rating: 99
    })
    .end((err, response) => {
      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('id');
      done();
    })
  })
  it ('should return 400-block status code for unsuccessful favorite', done => {
    chai.request(server)
    .post('/api/v1/favorites')
    .send({
      name: 'Different'
    })
    .end((err, response) => {
      response.should.have.status(422);
      done();
    })
  })
});
