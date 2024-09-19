import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { getProfile } from '../redux/services/apiDataServices'
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId, setRootData } from '../redux/features/playerSlice';
import { useGetSongsChartQuery } from '../redux/services/spotifyCoreAPI';

/**
 * Store "redux" useSelector();
 * store have multiple slices
 * store_cake = {
 *  slice_venilla: music_player_functionality
 *  slice_choco: shazam_api_functionality
 * }
 * From the above store_cake how we will select the specific slices, how can i select the slice
 * To select the secific slices from the store we use `useSelector`;
 * 
 * Example - 
 *   const {isPlaying} =   useSelector(state => state.slice_venilla)
 *
 * store "redux" useDispatch();
 * In store we have multiple slices for useSelector() to change the piece of
 * store slices we use useDispatch()
 * Example - 
 *      DISPATCH(ADD_CHOCOLATE_POWEDER)
 *  dispatch() - are the verbs of doing something to the state/store,slice
 *  dispatch() - something to state/store,slice from which we would be able to select those
 *      pices `slices` we have done something to
 * 
 */

const Discover = () => {
    const dispatch = useDispatch();
    const { isPlaying, activeSong } = useSelector(state => state.player);
    const { genreListId } = useSelector(state => state.player);

    /**
     * Hook - useGetRecommendationsTracksQuery()
     * data - Result of the API call
     * isFetching - Allow us to know we are currently fetching data, so we can show loading state.
     * error - Error message if any
     */
    const { data, isFetching, error } = useGetSongsChartQuery(genreListId || "arjit");

    /**
     * rootData is been used to get the data from the API
     * while inital load itself from `useGetSongsChartQuery()`
     * @param {rootData} e 
     */
    useEffect(() => {
        data && dispatch(setRootData(data?.data));
    },[data]);
    // const device = useGetSearchQuery("sanam teri kasam");
    // const {data} = useGetSeveralCatogoriesQuery()
    // const [genres2, setGenres] = useState();

    const userData = (e) => {
        try {
            const res = getProfile();
            // res.then(data => console.log(data))
            console.log(`UseGetUserProfileQuery() - `, device);
        } catch (err) {
            console.log(err);
        }
        setGenres(e.target.value);
        console.log(e.target.value);
    }
    console.log(`tracks - `, data);

    if (isFetching) return <Loader title="Loading duscover" />;
    if (error) return <Error />;

    return (
        <>
            <button className=" text-white" onClick={userData}>Get Profile</button>
            <div className='flex flex-col'>
                {/* select element - option for discover the musics */}
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h2 className='font-bold text-3xl text-white text-left'>Discover {(genreListId[0].toUpperCase().concat(genreListId.slice(1))) || genres[0].title}</h2>
                    <select className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                        value={genreListId || "pop"}
                        onChange={(e) => {
                            dispatch(selectGenreListId(e.target.value))
                        }}>
                        {genres.map(e => (
                            <option key={e.value} value={e.value}>{e.title}</option>
                        ))}
                    </select>
                </div>
                {/* Wrapper for songs cards */}
                <div className='flex flex-wrap sm:justify-start justify-center gap-4'>
                    {data.data.map((song, i) => (
                        <SongCard key={i} song={song} i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};

export default Discover;
