import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongsDetilsByIdQuery, useGetSongsRelatedQuery } from "../redux/services/spotifyCoreAPI";
const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid, id: artistId } = useParams();
    const { activeSong, isPlaying, rootData } = useSelector(state => state.player)

    const { data: songData, isFetching: isSongFetching, isError: isSongError, error: songError } = useGetSongsDetilsByIdQuery(songid);

    /** 
     * Using the filter procees to get the artist name and search
     * as there is no api endpoint to get the recommendation song
     * based on the artistID so using the `search?q={}` endpoint to get the detils.
     */
    const singername = rootData.filter(e => e?.id == songid);
    // console.log(/asdf/, singername);
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongsRelatedQuery(singername[0]?.artist?.name);    
    // const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongsRelatedQuery(artistId ? artistId : singername[0]?.artist?.name);
    // console.log(/dataSinger/, data, artistId);

    // if (songError) return <Error />;
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <>
            <div className="flex flex-col">
                <DetailsHeader
                    artistId={artistId}
                    songData={songData}
                />
                {console.log(songError, songData, isSongFetching)}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-white">Lyrics</h1>
                    <div className="mt-5">
                        {songData && songData?.section[1].type === "LYRICS" ? songData?.section[1].text.map((line, i) => (
                            <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
                        )) : (
                            <div className="flex flex-col text-white text-center mt-5">
                                <p className="text-2xl font-bold">No Lyrics Found</p>
                                <p>It's due to an API Limitations</p>
                                <div className=" mt-5 border-[2px] border-red-600 rounded-md">
                                    <p>status: {songError?.status}</p>
                                    <p>message: {songError?.data?.message}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <RelatedSongs
                    isPlaying={isPlaying}
                    // activeSong={songData}
                    activeSong={activeSong}
                    artistId={artistId}
                    data={data}
                    isFetching={isFetchingRelatedSongs}
                    error={error}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                />

            </div>
        </>
    )
}
export default SongDetails;
