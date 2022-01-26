import artistDataCollector from '../api/artistApi.js';

const artistData = async (req, res) => {
  // Regex testar koden så att användaren ej kan genomföra sökningen utan ett ID i korrekt format
  const idRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm;
  const { id } = req.params;
  if (!idRegex.test(id)) {
    res.status(404)
      .json('ID is not a valid MBID');
    return;
  }
  const artistObj = await artistDataCollector(req, res, id);

  res.status(200)
    .json(artistObj);
};

export default artistData;
