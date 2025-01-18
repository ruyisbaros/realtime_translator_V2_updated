import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video_url: "",
  hasUrl: false,
  isPlaying: false,
  isMuted: false,
  volume: 50,
  currentTime: 0,
  duration: 0,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoUrl: (state, action) => {
      state.video_url = action.payload;
      state.hasUrl = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setVideoUrl,
  togglePlay,
  toggleMute,
  setVolume,
  setCurrentTime,
  setDuration,
} = videoSlice.actions;
export default videoSlice.reducer;
