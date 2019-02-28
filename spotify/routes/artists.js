const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '7776e759f7614605a243658818dd681f';
const clientSecret = '2413948327c349a2903b3148e13fb3aa';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { artist } = req.query;
  try {
    const artists = await spotifyApi.searchArtists(artist); // artists.body.artists.items;}
    const list = artists.body.artists.items;
    console.log(list);
    res.render('artists', { list });
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  } catch (error) {
    next(error);
  };
});

module.exports = router;
