import axios from 'axios';

const coverArtApi = async artist => {
  // Kollar så att det finns saker i Album array så den inte kraschar när den försöker map.
  if (artist.albums <= 0) {
    artist.albums = 'No albums found';
    return artist;
  }
  const newAlbum = artist.albums.map(async album => {
    try {
      const albumCover = await axios.get(`http://coverartarchive.org/release-group/${album.id}`);
      if (albumCover.data.images[0].image) { // Om omslag bild finns så läggs den till objektet.
        return {
          ...album,
          image: albumCover.data.images[0].image,
        };
      }
    } catch (error) {
      return {
        ...album,
        image: 'No cover image found',
      };
    }
  });
  artist.albums = await Promise.all(newAlbum);
  return artist;
};

export default coverArtApi;
