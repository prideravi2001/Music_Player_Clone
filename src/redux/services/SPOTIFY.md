### spotifyCoreAPI.js
- The below code is been using the spotify developer doc.
- As it required some primium considering the different API which whould be helpful in making the project.
```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/**
 * Spotify API's
 * https://developer.spotify.com/documentation/web-api/reference
 * 
 * RTK of CreateApi, fetchBaseQuery, reducePath, MiddleLayes in store.js
 * https://redux-toolkit.js.org/rtk-query/api/createApi
 * 
 * 
 *  */ 
export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spotify.com/v1/',
        prepareHeaders: (headers) => {
            // Assuming you have an environment variable for the AuthToken
            //   headers.set('Authorization', `Bearer ${import.meta.env.VITE_SPOTIFY_API_TOKEN}`);
            headers.set('Authorization', `Bearer ${localStorage.getItem("access_token")}`);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => 'me'
        }),
        getAvailableDevice: builder.query({
            query: () => 'me/player/devices'
        }),
        getRecentlyPlayed: builder.query({
            query: () => 'me/player/recently-played'
        }),
        getPlaylists: builder.query({
            query: () => 'me/playlists'
        }),
        getSeveralCatogories: builder.query({
            query: () => `browse/categories?locale=sv_IN`
        }),
        getSearch: builder.query({
            query: (searchTerm) => `search?q=${searchTerm}&type=track,artist,album,playlist&market=IN`
        }),
        getRecommendationsTracks: builder.query({
            query: (seedGenres) => `recommendations?market=IN&seed_genres=${seedGenres}`
        }),
        getTracksById: builder.query({
            query: (trackId) => `tracks/${trackId}` // Modify this to the appropriate Spotify endpoint
        }),
        getAlbumsByArtist: builder.query({
            query: (artistId) => `artists/${artistId}/albums` // Replace with actual Spotify endpoint
        }),
        getFeaturedPlaylists: builder.query({
            query: () => `browse/featured-playlists?locale=sv_IN`
        }),
        getPlaylistById: builder.query({
            query: (playlistId) => `playlists/${playlistId}` // Replace with actual Spotify endpoint
        }),
        search: builder.query({
            query: (searchTerm) => `search?q=${searchTerm}&type=track,artist,album,playlist` // Replace with actual Spotify endpoint
        }),


        getArtistDetails: builder.query({
            query: (artistId) => `artists/${artistId}`
        }),
        getTrackDetails: builder.query({
            query: (trackId) => `tracks/${trackId}`
        }),
        getAlbumDetails: builder.query({
            query: (albumId) => `albums/${albumId}`
        }),
        
    }),
});

export const {
    useGetUserProfileQuery,
    useGetAvailableDeviceQuery,
    useGetRecentlyPlayedQuery,
    useGetPlaylistsQuery,
    useGetSeveralCatogoriesQuery,
    useGetSearchQuery,
    useGetRecommendationsTracksQuery,
    useGetTracksByIdQuery,
    useGetAlbumsByArtistQuery,
    useGetFeaturedPlaylistsQuery,
    useGetPlaylistByIdQuery,
    useSearchQuery,

    useGetArtistDetailsQuery,
    useGetTrackDetailsQuery,
    useGetAlbumDetailsQuery,
} = spotifyApi;

```




### spotify.jsx
```
// https:developer.spotify.com/documentation/web-playback-sdk/quick-start/#
// This file sould be .js but as vite doesn't support .js using .jsx insted.

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// const redirectUri = 'http://localhost:3000';
const redirectUri = 'http://localhost:5173/';
// const redirectUri = 'https://spotifyclone.ravi1626.repl.co/';
// const redirectUri = 'https://0dc1479a-7d61-4c37-8e38-f7e025c5073a-00-3mpm1xrthj5ha.pike.replit.dev/';
const clientId = '794b4549b1c4454e914bcc145990cd2e';

// Allow the user to perform the correct action
export const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
];
// Token is a authentication to check who i am
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;


export const getTokenFromUrl = () =>{
  // return window.location.hash.split('access_token=')[1];
  // reduce function, "it's pulling the access token"
  console.log("getTokenFromUrl");
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, items) => {
      // accessToken=mysupersecretkey&name=sonny
      let parts = items.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    },{});
}





  // Scope which will give the user a right to read their private data or modify according to the scope defined.


  // 'user-read-currently-playing',
  // 'user-read-playback-state',
  // 'user-modify-playback-state',
  // 'user-read-playback-position',
  // 'user-read-email',
  // 'user-read-private',
  // 'playlist-read-private',
  // 'playlist-modify-public',
  // 'playlist-modify-private',
  // 'user-library-modify',
  // 'user-library-read',
  // 'user-read-recently-played',
  // 'user-top-read',
  // 'user-follow-read',
  // 'user-follow-modify',
  // 'user-read-playback-position',
  // 'user-read-private',
  // 'user-read-email',
  // 'user-read-currently-playing',
  // 'user-read-playback-state',
  // 'user-read-recently-played',
  // 'user-library-read',
  // 'user-library-modify',
  // 'playlist-read-private',
  // 'playlist-modify-public',
  // 'playlist-modify-private',
  // 'user-read-playback-position',
  // 'user-read-recently-played',
  // 'user-follow-read',
  // 'user-follow-modify',
  // 'user-read-email',
  // 'user-read-currently-playing',
  // 'user-read-playback-state',
  // 'user-read-recently-played',
  // 'user-library-read',
  // 'user-library-modify',
  // 'playlist-read-private',
  // 'playlist-modify-public',
  // 'playlist-modify-private',
  // 'user-read-email',
  // 'user-read-currently-playing',
  // 'user-read-playback-state',
  // 'user-read-recently-played',
  // 'user-library-read',
  // 'user-library-modify'
```

### App.jsx

```
import React, { useEffect, useState } from 'react';
import './App.css'
import Login from './components/Login';
import { getTokenFromUrl } from './components/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Player';
import { useDataLayerValue } from './context/DataLayer';
// Super object or Spotify instance for any type of interaction with Spotify API
const spotify = new SpotifyWebApi();

export default function App() {
// const [token,setToken] = useState(null);
const [{ user, token,playlists }, dispatch] = useDataLayerValue();
const [initialState, dispatch2] = useDataLayerValue();

// Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    // Don't want to show the auth token to the users.
    const _token = hash.access_token;
    if (_token) {
      // setToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      // Will help to connect spotify with react through the access token
      spotify.setAccessToken(_token);
  
      spotify.getMe().then((user) => {
        // console.log(user);
        dispatch({
          type: 'SET_USER',
          payload: user
        });

        // Playlist
        spotify.getUserPlaylists().then(playlists => {
          dispatch({
            type:'SET_PLAYLISTS',
              playlists: playlists
          })
        })
        // get playlists
        spotify.getPlaylist('37i9dQZF1E4wrEODYq2x5q').then(responce => {
          dispatch({
            type:'SET_DISCOVER_WEEKLY',
            payload: responce
          })
        })
      });
    }
  }, []);
console.log("** user **");
console.log(user);
  console.log('I have a token: ', token);
  console.log(playlists);
// if [] is emplty it will run only once & if we want to run to on some condition when something changes we can give that varialble inside ex:- [name]


return (
  <>
    <div className='app'>
      {/* Spotify Logo */}
      {/* Login with spotify btn */}
      {token ? (
        <Player spotify={spotify}/>
      ) : (
        <Login />
      )}
    </div>
  </>
)
}

```