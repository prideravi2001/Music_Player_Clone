import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const DetailsHeader = ({ artistId, artistData, songData }) => {

  const { rootData, currentSongs, activeSong, isPlaying } = useSelector(state => state.player);


  /**
   * The below logic is used because there is no songs lyrics is available
   * base on songsID & no lyrics are avalbale in the songs detils.
   * So use a currentSongs list to just filter the songs based on songsID
   * to prevent unnesary prop drillings.
   */
  const { songid } = useParams();
  const sortBySongId = rootData.filter(e => e?.id == songid);

  // console.log( artistId, artistData, songData)
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            artistId ? artistData?.picture_big
              .replace('{w}', '500')
              .replace('{h}', '500')
              : (songData ? songData?.album?.cover_big : sortBySongId[0]?.album?.cover_big)
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.name : (songData ? songData?.title : sortBySongId[0]?.title)}
            {/* {artistId ? artistData?.attributes?.name : (songData ? songData?.title : sortBySongId[0]?.title)} */}
          </p>
          {!artistId && (
            <Link to={songData ? `/artists/${songData?.id}` : `/artists/${sortBySongId[0]?.artist?.id}`}>
              <p className="text-base text-gray-400 mt-2">{(songData ? songData?.artist?.name : sortBySongId[0]?.artist?.name)}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artistData?.type[0].toUpperCase()+artistData?.type.slice(1)
              : songData?.genres?.primary} Genre
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
