import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import videoSlice from "./videoPlayerSlicer";
import selectedAudioSrc from "./selectedAudioSrc";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    video: videoSlice,
    audio_src: selectedAudioSrc,
  },
});
