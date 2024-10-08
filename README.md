## Dummy Music Clone App with React18

`Project will not have a mutiple feature due the API limitations `

### Getting started
- React
- Tailwind Setup
    - Using Tailwind `https://tailwindcss.com/docs/guides/create-react-app`
    - Using PostCss & Autoprefix `https://tailwindcss.com/docs/installation/using-postcss`
- Redux
- [Redux CreateAPI, fetchBaseQuery](https://redux-toolkit.js.org/rtk-query/api/createApi)
- RapidAPI
- Spotify Authenticator + Spotify APIs


### Redux CreateAPI, FetchBaseQuery snippet
- createApi is the core of RTK Query's functionality. It allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data.
- [Learn more...](https://redux-toolkit.js.org/rtk-query/api/createApi)

```
// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ 
   baseUrl: 'https://pokeapi.co/api/v2/',
      prepareHeaders: (headers) => {
         // Assuming you have an environment variable for the AuthToken
         //   headers.set('Authorization', `Bearer ${import.meta.env.VITE_SPOTIFY_API_TOKEN}`);
         headers.set('Authorization', `Bearer ${localStorage.getItem("access_token")}`);

         return headers;
      },   
   }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```
### `With Post Redux CreateAPI, featchBaseQuery`
```
// services/postsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API service
export const postsApi = createApi({
  reducerPath: 'postsApi', // A unique key that defines where the API slice's reducer will be attached in the Redux store

  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  // Define the endpoints for the service
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts', // The API endpoint path
    }),

    getPostById: builder.query({
      query: (id) => `posts/${id}`, // Endpoint with a parameter for fetching a single post by ID
    }),

    addPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated by `createApi`
export const { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation } = postsApi;

```
### Redix configureStore store.js addting a MiddleLayer

```
export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware),

});

```


### Redux createSlices

```
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;

```


### Spotify Authenticator Doc
- [Spotify API Doc](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
- [npm i spotify-web-api-js](https://www.npmjs.com/package/spotify-web-api-js) if using `spotify-web-api-js` not required if using [RapidAPI Spotify](https://rapidapi.com/DataFanatic/api/spotify-scraper/playground/apiendpoint_680e0d79-c035-44b1-9244-040146cd9b02)
- [Git Repo for code](https://github.com/CleverProgrammers/spotify-clone/tree/master/src)
  
```https://developer.spotify.com/documentation/web-api/tutorials/getting-started

* Read the dock for creating a SPotify.
* Auth :- https://developer.spotify.com/documentation/web-api/concepts/authorization 
* https://developer.spotify.com/dashboard/ to get the correct ClientID
* 794b4549b1c4454e914bcc145990cd2e
* .reduce(()=>{},{}) function
* decodeURLComponent();
* return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      // accessToken=mysupersecretkey&name=sonny
      let parts = items.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    },{});

* npm i spotify-web-api-js
* using useContext API - for storing data same as Redux.
    
```

- RapidAPI URL - `https://rapidapi.com/DataFanatic/api/spotify-scraper/playground/apiendpoint_680e0d79-c035-44b1-9244-040146cd9b02`
- SpotifyUserId - `31j4zjb74vxden5sgscarswgyoge`













```
Content Readme.md
```
# Project Lyrics

Develop an elegant React.js Music Application. 

Check out the complete project requirements [here](https://docs.google.com/document/d/13PeFwRlPEhMw_HPyrIrInvQuKaVWnpNmcv-y3NA208s/edit?usp=sharing)

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue.
Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.


## System Requirements

To get started with development, you need to install few tools

1. git 
   
   `git` version 2.13.1 or higher. Download [git](https://git-scm.com/downloads) if you don't have it already.

   To check your version of git, run:

   ```shell
    git --version
   ```

2. node 
   
   `node` version 16.15.1 or higher. Download [node](https://nodejs.org/en/download/) if you don't have it already.

   To check your version of node, run:

   ```shell
    node --version
   ```

3. npm
  
   `npm` version 5.6.1 or higher. You will have it after you install node.

   To check your version of npm, run:

   ```shell
    npm --version
   ```

## Setup

To set up a development environment, please follow these steps:

1. Clone the repo

   ```shell
    git clone https://github.com/JavaScript-Mastery-PRO/project1_team4_repository.git
   ```

2. Change directory to the project directory

    ```shell
    cd project1_team4_repository
    ```

3. Install the dependencies
   
    ```shell
     npm install
    ```

    If you get an error, please check the console for more information.

    If you don't get an error, you are ready to start development.

4. Run the app
   
    ```shell
    npm run dev
    ```

    Project will be running in the browser.

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Issues

You've found a bug in the source code, a mistake in the documentation or maybe you'd like a new feature? You can help us by [submitting an issue on GitHub](https://github.com/orgs/JavaScript-Mastery-PRO/projects/8). Before you create an issue, make sure to search the issue archive -- your issue may have already been addressed!

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.


## Pull Request

There are 2 main work flows when dealing with pull requests:

* Pull Request from a [forked repository](https://help.github.com/articles/fork-a-repo)
* Pull Request from a branch within a repository

Here we are going to focus on 2. Creating a Topical Branch:


1. First, we will need to create a branch from the latest commit on master. Make sure your repository is up to date first using

   ```bash
    git pull origin main
   ```

   *Note:* `git pull` does a `git fetch` followed by a `git merge` to update the local repo with the remote repo. For a more detailed explanation, see [this stackoverflow post](http://stackoverflow.com/questions/292357/whats-the-difference-between-git-pull-and-git-fetch).

2. To create a branch, use `git checkout -b <new-branch-name> [<base-branch-name>]`, where `base-branch-name` is optional and defaults to `main`. 
   
   Use a standard convention for branch names. For example, `<your-name>-dev`. It will be easier to track your pull requests if you use this convention.
   
   I'm going to create a new branch called `jsm-dev` from the `main` branch and push it to github.

   ```bash
    git checkout -b jsm-dev main
    git push origin jsm-dev
   ```

3. To create a pull request, you must have changes committed to your new branch.

4. Go to [Pull Requests](https://github.com/JavaScript-Mastery-PRO/project1_team4_repository/pulls) and click on the `New Pull Request` button.

5. Select the `main` branch as the `base` branch and the `jsm-dev` branch as the `compare` branch.

6. Follow the template and fill in the proper information for the pull request.

7. Click on the `Submit` button.

8. You have successfully created a pull request. Now wait for mentor approval. Once approved, you can merge the pull request.

#



```
```
## Running React on Replit

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started
- Hit run
- Edit [App.jsx](#src/App.jsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the [configuration file](#.replit). Here are the vite docs for [serving production websites](https://vitejs.dev/guide/build.html)

### Typescript

Just rename any file from `.jsx` to `.tsx`. You can also try our [TypeScript Template](https://replit.com/@replit/React-TypeScript)