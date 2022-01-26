import axios from 'axios';

const wikipediaApi = async siteTitle => {
  try {
    const wikipediaResponse = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${siteTitle}`);
    const obj = wikipediaResponse.data.query.pages;
    const page = Object.keys(obj)[0];
    return obj[page].extract;
  } catch (error) {
    return error.message;
  }
};

const wikidataApi = async wikiId => {
  try {
    if (wikiId.length <= 0) return 'No description found'; // Om längden är 0 så låter den bli att anropa wikidata för att spara tid.
    const wikiResponse = await axios.get(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikiId}&format=json&props=sitelinks`);

    const wikiLink = wikiResponse.data.entities[wikiId].sitelinks.enwiki.title.replace(' ', '_');
    return wikipediaApi(wikiLink);
  } catch (error) {
    return error.message;
  }
};

export default wikidataApi;
