import axios from 'axios';
import wikidataApi from './wikidataAPI.js';
import coverArtApi from './coverArtApi.js';

const artistDataCollector = async (req, res, id) => {
  try {
    let wikiId = '';
    // Skapar ett tomt artist objekt och fyller den med nödvändigt data
    const artistData = await axios.get(`http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`);
    const artistObject = {};

    artistObject.mbid = id;
    artistObject.name = artistData.data.name;

    // Filtrerar genom relations för att hitta rätt object type, i detta fall wikidata.
    // Jag kunde inte hitta ett band/artist som hade direkt länk till wikipedia
    artistData.data.relations.filter(obj => {
      if (obj.type === 'wikidata') {
        wikiId = obj.url.resource.split('/').pop(); // Vid matching ändrar jag wikiId variabeln.
      }
    });

    // Anropar wikidataApi för att få fram beskrivningen
    artistObject.description = await wikidataApi(wikiId);

    // Filtrerar release-groups för att få bort allt som inte är album
    artistObject.albums = artistData.data['release-groups']
      .filter(element => element['primary-type'] === 'Album')
      .map(album => ({
        title: album.title,
        id: album.id,

      }));
    return coverArtApi(artistObject);
  } catch (error) {
    res.status(404)
      .json('ID does not exist');
  }
};

export default artistDataCollector;
