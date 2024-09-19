import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

// export const genres = [
//   { title: 'Pop', value: 'pop' },
//   { title: 'Hip-Hop', value: 'hip-hop' },
//   { title: 'Dance', value: 'dance' },
//   { title: 'Electronic', value: 'electronic' },
//   { title: 'Soul', value: 'SOUL_RNB' },
//   { title: 'Alternative', value: 'alternative' },
//   { title: 'Rock', value: 'rock' },
//   { title: 'Indian', value: 'indian' },
//   { title: 'Work-Out', value: 'work-out' },
//   { title: 'Holidays', value: 'holidays' },
//   { title: 'House', value: 'house' },
//   { title: 'K-Pop', value: 'k-pop' },
// ];
/**
 * @param {string} title
 * @param {string} value - Due to the API limitations
 * value are been used as a misitian name based on genres-title,
 * as no api with genre name is available required an ID for each genre.
 * Makes it more complex to get the id from Album endpoint `album/{albumId}`
 * Search endpoint has been used 
 */
export const genres = [
  { title: 'Pop', value: 'Arijit Singh' },
  { title: 'Hip-Hop', value: 'Badshah' },
  { title: 'Dance', value: 'DJ Snake' },
  { title: 'Electronic', value: 'David Guetta' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'Coldplay' },
  { title: 'Rock', value: 'AC/DC' },
  { title: 'Indian', value: 'Pandit Ravi Shankar' },
  { title: 'Work-Out', value: 'Marshmello' },
  { title: 'Holidays', value: 'Michael Bublé' },
  { title: 'House', value: 'Martin Garrix' },
  { title: 'K-Pop', value: 'BTS' },
];


export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];
