import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery, useGetSongsDetilsByIdQuery, useGetSongsRelatedQuery } from "../redux/services/spotifyCoreAPI";

/**
 * This Component is almost exact copy of SongDetils Components.
 * @returns SongDetails
 */
const ArtistDetails = () => {
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying, rootData } = useSelector(state => state.player)



  /** 
   * Using the filter procees to get the artist name and search
   * as there is no api endpoint to get the aritst song based on ArtistID 
   * Using the `search?q={}` to get the data based on artist Name
   * The endpoint related to `artistID` gives only artist detils.
   * So using another endpoint to song result.
   */
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const singername = rootData.filter(e => e?.id == songid);
  
  const { data: songData, isFetching: isSongFetching, isError: isSongError, error: songError } = useGetSongsRelatedQuery(artistData?.name);

  return (
    <>
      <div className="flex flex-col">
        <DetailsHeader
          artistId={artistId}
          artistData={artistData}
          // songData={songData}
        />

        <RelatedSongs
          data={songData}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
    </>
  )
}
export default ArtistDetails;
