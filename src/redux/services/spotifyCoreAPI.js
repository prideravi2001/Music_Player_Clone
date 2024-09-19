import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RapidAPI of Genius Song Lyrics used for fetching song lyrics
 * https://rapidapi.com/Glavier/api/genius-song-lyrics1
 * 
 * To get the RAPID_API_KEY use the below link and add it in the preparedHeader
 * under header_value of header.set property
 * `header.set("header_name", "header_value")`
 * https://rapidapi.com/deezerdevs/api/deezer-1/playground/53aa5085e4b07e1f4ebeb429
 */
export const rapidCoreAPI = createApi({
    reducerPath: 'rapidAPI',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://genius-song-lyrics1.p.rapidapi.com/',
        baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', import.meta.env.VITE_RAPID_API_KEY);
            
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSongsChart: builder.query({
            // query: () => 'v1/charts/world
            query: (searchQ) => `search?q=${searchQ}`
        }),
        getSongsByGenre: builder.query({
            // query: (genre) => `v1/charts/genre-world?genre_code=${genre}
            query: (genre) => `genre/${genre}`
        }),
        getSongsDetilsById: builder.query({
            // query: ({ songid }) => `v1/tracks/details?track_id=${songid}`
            query: (songId) => `songs/${songId}`
        }),
        getSongsRelated: builder.query({
            // As getRelated song is not available using the searchAPI
            // to the result by artist Name.
            // query: ({ songid }) => `v1/tracks/related?track_id=${songid}`
            query: (songId) => `search?q=${songId}`
        }),
        getByAlbumId: builder.query({
            query: (albumId) => `album/${albumId}`
        }),
        getArtistDetails: builder.query({
            // query: (artistId) => `v2/artists/details?artist_id=${artistId}`
            query: (artistId) => `artist/${artistId}`
        }),
        getSongsByCountry: builder.query({
            // query: (countryCode) => `v1/charts/country?country_code=${countryCode}
            query: (countryId) => `search?q=${countryId}`
        }),
        getSongsBySearch: builder.query({ 
            // query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` 
            query: (searchTerm) => `search?q=${searchTerm}`
        }),
    })
});

export const {
    useGetSongsChartQuery,
    useGetSongsByGenreQuery,
    useGetSongsDetilsByIdQuery,
    useGetSongsRelatedQuery,
    useGetByAlbumIdQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery
} = rapidCoreAPI;

