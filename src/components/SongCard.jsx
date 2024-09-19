import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
// import { useGetSongsQuery } from '../redux/services/spotifyCoreAPI'
const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const initialState = useSelector(state => state.player)
  const dispatch = useDispatch();


  const handlePauseClick = () => {
    console.log("handlePause")
    dispatch(playPause(false));
  }
  const handlePlayClick = () => {
    console.log("handlePlay");
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
    console.log("initialState store")
    console.log(initialState);
  }
  return (
    <>
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className='relative w-full h-56 group'>
          {/* check original code bg-black and bg-opacity-70&50 is not in hover effect */}
          <div className={`absolute inset-0 justify-center items-center
           hover:bg-black hover:bg-opacity-50 group-hover:flex hidden
            ${(activeSong?.title === song.title && activeSong.id === song.id) ?
              'flex hover:bg-black  hover:bg-opacity-70' : 'hidden'}`}
            >
            <PlayPause
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img alt="song_img" src={song.album?.cover_big}
            className='w-full h-full rounded-lg' />
        </div>

        <div className='mt-4 flex flex-col'>
          <p className='font-semibold text-lg text-white
          truncate'>
            <Link to={`/songs/${song?.id}`}>
              {song?.title}
            </Link>
          </p>
          <p className='text-sm text-gray-300 mt-1'>
            <Link to={song?.artist ?
              `/artists/${song?.artist?.id}`
              : `/top-artists`}>
              {song?.artist?.name}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
};

export default SongCard;
