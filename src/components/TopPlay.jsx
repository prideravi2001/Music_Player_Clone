import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetSongsChartQuery } from "../redux/services/spotifyCoreAPI";

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, activeSong, isPlaying, handlePause, handlePlay }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e]
  py-2 p-4 rounded-lg cursor-pointer">
    <h2 className="mr-3 text-white font-bold text-base">{i + 1}.</h2>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.artist?.picture_big} alt={song?.title}
        className=" w-10 h-10 object-cover rounded-xl" />
      <div className="flex flex-col flex-1 justify-center mx-3">
        <Link to={`/songs/${song?.id}`}>
          <p className="text-white font-bold text-base">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artist.id}`}>
          <p className="text-gray-300 mt-1 text-ase">{song?.artist.name}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
)


const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data } = useGetSongsChartQuery("Javed - Mohsin");
  const divRef = useRef(null);

  // const topPlays = data?.data || [];
  const topPlays = data && getUniqueDataByArtistId(data).slice(0, 5) || [];

  // const db = topPlays.filter(e => data.data.map(item => e.artist.id != item.artist.id))
  // function getUniqueArtistIds(data) {
  //   return data && data.data
  //     .map((track) => track.artist.id)
  //     .filter((artistId, index, self) => self.indexOf(artistId) === index);
  // }
  function getUniqueDataByArtistId(data) {
    const uniqueData = [];
    const seenArtistIds = new Set();

    if (data && data.data) {
      for (const item of data.data) {
        const artistId = item.artist.id;

        if (!seenArtistIds.has(artistId)) {
          uniqueData.push(item);
          seenArtistIds.add(artistId);
        }
      }

      return uniqueData;
    }
  }
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log("divRef.current.scrollIntoView({ behavior: 'smooth' });");
  })

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  const handlePlayClick = (song,i, data) => {
    dispatch(playPause(true));
    console.log("handlePlayClick")
   dispatch(setActiveSong({song, data, i}))
  }

  return (
    <>
      <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1
      xl:max-w-[500px] max-w-full flex flex-col">
        <div className="w-full flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Chats</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            {topPlays.map((song, index) => {
              // console.log(song);
              return <TopChartCard
                song={song}
                i={index}
                key={song.id}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song, index, data)}
              />
            })}
          </div>
        </div>
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>


          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlays.map((artist) => (
              <SwiperSlide
                key={artist?.artist?.id}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                {/* {console.log("artists", artist)} */}
                <Link to={`/artists/${artist?.artist?.id}`}>
                  <img src={artist?.artist?.picture_big} alt="Name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default TopPlay;
