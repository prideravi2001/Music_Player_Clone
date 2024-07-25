## Dummy Music Clone App with React18

- React
- Tailwind
- Redux
- RapidAPI
- Spotify Authenticator

### Spotify Authenticator Doc
- [Spotify API Doc](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
- [npm i spotify-web-api-js](https://www.npmjs.com/package/spotify-web-api-js) if using `spotify-web-api-js` not required if using [RapidAPI Spotify](https://rapidapi.com/DataFanatic/api/spotify-scraper/playground/apiendpoint_680e0d79-c035-44b1-9244-040146cd9b02)
- [Git Repo for code](https://github.com/CleverProgrammers/spotify-clone/tree/master/src)
  
```https://developer.spotify.com/documentation/web-api/tutorials/getting-started

* Read the dock for creating a SPotify. 
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