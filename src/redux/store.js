import { configureStore } from '@reduxjs/toolkit';
import { rapidCoreAPI } from './services/spotifyCoreAPI';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [rapidCoreAPI.reducerPath]: rapidCoreAPI.reducer,
    player: playerReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rapidCoreAPI.middleware),

});
