import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video_url: "",
  selectedFile: null,
  isVideoUploaded: false,
  previewUrl: "",
  isUploadFinished: false,
  isPlaying: false,
};

const videoSlice = createSlice({
  name: "video_subtitles",
  initialState,
  reducers: {
    setSelectedFileRdx: (state, action) => {
      state.selectedFile = action.payload;

      state.previewUrl = action.payload;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsVideoUploadedRdx: (state, action) => {
      state.isVideoUploaded = action.payload;
    },
    setIsUploadFinishedRdx: (state, action) => {
      state.isUploadFinished = action.payload;
    },
  },
});

export const {
  setSelectedFileRdx,
  togglePlay,
  setIsVideoUploadedRdx,
  setIsUploadFinishedRdx,
} = videoSlice.actions;
export default videoSlice.reducer;
