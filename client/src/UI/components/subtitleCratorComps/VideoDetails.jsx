import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
// eslint-disable-next-line react/prop-types
const VideoDetails = () => {
  const { selectedFile, previewUrl } = useSelector(
    (store) => store.video_subtitles
  );
  const [videoMetadata, setVideoMetadata] = useState({
    name: selectedFile.name,
    size: (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB",
    type: selectedFile.type,
    duration: null,
    resolution: null,
    thumbnail: null,
  });

  useEffect(() => {
    if (!selectedFile) {
      console.error("No file provided for preview.");
      return;
    }
    const video = document.createElement("video");
    const fileURL = previewUrl ? previewUrl : "";

    video.src = fileURL;

    // Load metadata and get details
    video.addEventListener("loadedmetadata", () => {
      const duration = video.duration.toFixed(2) + " seconds";
      const resolution = `${video.videoWidth}x${video.videoHeight}`;

      // Capture the first frame as a thumbnail
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      video.currentTime = 0;

      video.addEventListener("seeked", () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL("image/png");
        setVideoMetadata((prev) => ({
          ...prev,
          duration,
          resolution,
          thumbnail,
        }));
      });
    });

    return () => {
      URL.revokeObjectURL(fileURL); // Clean up object URL
    };
  }, [selectedFile]);

  return (
    <div className="h-[100%] flex flex-col items-center bg-gradient-to-b from-gray-900 via-black to-[#1b263d] text-gray-200 mr-1">
      <div className="h-[40%] flex flex-row w-4/5 max-w-5xl p-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl shadow-lg mt-2">
        {/* Left Side: Video Details */}
        <div className="flex-1 ">
          <h2 className="text-2xl font-bold mb-4">Video Details</h2>
          <p>
            <strong>Name:</strong> {videoMetadata.name}
          </p>
          <p>
            <strong>Size:</strong> {videoMetadata.size}
          </p>
          <p>
            <strong>Type:</strong> {videoMetadata.type}
          </p>
          <p>
            <strong>Duration:</strong> {videoMetadata.duration || "Loading..."}
          </p>
          <p>
            <strong>Resolution:</strong>{" "}
            {videoMetadata.resolution || "Loading..."}
          </p>
        </div>

        {/* Right Side: Video Preview */}
        <div className="flex-1 p-4 flex justify-center items-center">
          {videoMetadata.thumbnail ? (
            <div className="relative">
              <img
                src={videoMetadata.thumbnail}
                alt="Video Thumbnail"
                className="rounded-lg shadow-lg w-full"
              />
              <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-teal-400 text-2xl font-bold rounded-lg transition hover:bg-opacity-75">
                ▶
              </button>
            </div>
          ) : (
            <p>Generating preview...</p>
          )}
        </div>
      </div>
      <UserOptions />
    </div>
  );
};

export default VideoDetails;
