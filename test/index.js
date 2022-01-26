import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.should();
chai.use(chaiHttp);

describe('GET /api/artists', () => {
  it('should return something', done => {
    chai.request(app)
      .get('/api/artists/5b11f4ce-a62d-471e-81fc-a69a8278c7da')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.a('object');
        done();
      });
  });
  it('should return error if id isnt valid', done => {
    chai.request(app)
      .get('/api/artists/5b11f4ce-a62d-471e-81fc-a69278c7da')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('ID is not a valid MBID');
        done();
      });
  });
  it('should return error if there are no artist with that id', done => {
    chai.request(app)
      .get('/api/artists/5b11f4ce-a62d-471e-81fc-a69a8278c7db')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('ID does not exist');
        done();
      });
  });
  it('Doesnt crash when searching for an artist with no description/album (No wikidata link/No albums on musicbrainz)', done => {
    chai.request(app)
      .get('/api/artists/24d1670c-9739-42fe-aefe-c738e4713fbd')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.description.should.equal('No description found');
        response.body.albums.should.equal('No albums found');
        done();
      });
  });
});
