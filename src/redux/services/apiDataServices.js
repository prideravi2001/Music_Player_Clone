
export const clientId = 'SPOTIFY_CLIENT_ID'; 
//Or go to the spotify developer website to get the API clientID.

export const authEndpoint = 'https://accounts.spotify.com/authorize';

export const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
];
export const redirectUrl = "https://9000-idx-dummycloneasspotifygit-1725543730862.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev/?monospaceUid=916758";
console.log(`redirectUrl:\n, ${redirectUrl == "https://9000-idx-dummycloneasspotifygit-1725543730862.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev/?monospaceUid=916758"}`);
// export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
export const accessUrl = `${authEndpoint}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(scopes)}&response_type=token`;
export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      // localStorage.setItem('access_token', initial);
      // console.log(initial)
      return initial;
    }, {});
};

async function getProfile() {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    return data;
}

export {getProfile};  




