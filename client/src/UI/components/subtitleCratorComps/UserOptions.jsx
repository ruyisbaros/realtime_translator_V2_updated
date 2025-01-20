import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setIsUploadFinishedRdx,
  setSelectedFileRdx,
} from "../../redux/videoSubtitleSlice";
import { toast } from "react-toastify";
import UploadVideoProgress from "../../accessories/subtitleCreatorAcs/uploadVideoProgress";
import { uploadFileWithRetry } from "../../utils/uploader";

const UserOptions = () => {
  const dispatch = useDispatch();

  const { selectedFile } = useSelector((store) => store.video_subtitles);
  const [actionType, setActionType] = useState("transcription");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [subtitleFormat, setSubtitleFormat] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  let uploadController = null;
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const response = await axios.get("http://localhost:8000/upload/");

      console.log(response);
      if (response.status === 200) {
        toast.success("Audio extraction successful!");
      } else {
        toast.warning("Audio extraction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      toast.warning("An error occurred while extracting audio.");
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    if (uploadController) {
      uploadController.abort(); // Cancel the upload
      setIsUploading(false);
      toast.info("Upload canceled");
    }
  };

  return (
    <div className="relative h-[55%] mb-2 bg-gradient-to-b from-gray-900 via-black to-gray-900 p-6 rounded-lg shadow-2xl text-gray-200 w-4/5 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2 text-teal-400 font-orbitron">
        Choose Your Subtitle Preferences
      </h2>

      {/* Action Type */}
      <div className="option-group mb-2">
        <label className="text-lg font-medium mb-2 block">Action Type:</label>
        <div className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-3 flex justify-between">
          <div>
            {" "}
            <input
              type="radio"
              value="transcription"
              id="transcription"
              name="trans"
              onChange={(e) => setActionType(e.target.value)}
              className="cursor-pointer"
            />
            <label
              htmlFor="transcription"
              className="ml-3 cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
            >
              Transcription Only
            </label>
          </div>

          <div>
            {" "}
            <input
              type="radio"
              value="translation"
              id="translation"
              name="trans"
              onChange={(e) => setActionType(e.target.value)}
              className="cursor-pointer"
            />
            <label
              htmlFor="translation"
              className="ml-3 cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
            >
              Translation Only
            </label>
          </div>

          <div>
            {" "}
            <input
              type="radio"
              value="audio_transcription"
              id="both"
              name="trans"
              onChange={(e) => setActionType(e.target.value)}
              className="cursor-pointer"
            />
            <label
              htmlFor="both"
              className="ml-3 cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
            >
              Both (Transcription + Translation)
            </label>
          </div>
        </div>
      </div>
      {/* subtitle format type and language */}
      <div className="flex items-center gap-6 mt-3">
        {/* Target Language(s) */}
        <div className="option-group mb-6 w-[50%]">
          <label className="text-lg font-medium mb-2 block">
            Target Language(s):
          </label>
          <div className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-3 flex gap-3">
            <div>
              <input
                type="checkbox"
                name="english"
                id="english"
                value="en"
                onChange={(e) =>
                  setSelectedLanguages([...selectedLanguages, e.target.value])
                }
              />
              <label
                htmlFor="english"
                className="ml-2 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
              >
                English
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="german"
                id="german"
                value="de"
                onChange={(e) =>
                  setSelectedLanguages([...selectedLanguages, e.target.value])
                }
              />
              <label
                htmlFor="german"
                className="ml-1 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
              >
                German
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="turkish"
                id="turkish"
                value="tr"
                onChange={(e) =>
                  setSelectedLanguages([...selectedLanguages, e.target.value])
                }
              />
              <label
                htmlFor="turkish"
                className="ml-1 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
              >
                Turkish
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="spanish"
                id="spanish"
                value="es"
                onChange={(e) =>
                  setSelectedLanguages([...selectedLanguages, e.target.value])
                }
              />
              <label
                htmlFor="spanish"
                className="ml-1 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200"
              >
                Spanish
              </label>
            </div>

            {/* Add more languages as needed */}
          </div>
        </div>
        {/* Subtitle Format */}
        <div className=" mb-6 flex-grow">
          <label className="text-lg font-medium mb-2 block">
            Subtitle Format:
          </label>
          <div className="flex items-center border border-gray-700 rounded-lg p-1">
            <label className="ml-2 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200">
              <input
                type="radio"
                name="subtitleFormat"
                value="embed"
                className="mr-2 cursor-pointer"
                onChange={() => setSubtitleFormat("embed")}
              />
              Embed into <span className="move_span">Video</span>
            </label>
            <label className="ml-2 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200">
              <input
                type="radio"
                name="subtitleFormat"
                value="srt"
                className="mr-2 cursor-pointer"
                onChange={() => setSubtitleFormat("srt")}
              />
              Export as <span className="move_span">.SRT</span>
            </label>
            <label className="ml-2 text-[14px] cursor-pointer hover:text-[#30f4d6] transition-all duration-200">
              <input
                type="radio"
                name="subtitleFormat"
                value="vtt"
                className="mr-2 cursor-pointer"
                onChange={() => setSubtitleFormat("vtt")}
              />
              Export as <span className="move_span">.VTT</span>
            </label>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="w-full flex items-center justify-center gap-6 mt-2">
        {" "}
        <button
          className="w-[35%]  bg-teal-400 hover:bg-teal-300 text-white hover:text-gray-900 font-bold py-3 rounded-lg transition-all duration-300"
          onClick={handleFileUpload}
          disabled={isUploading}
        >
          Start Processing
        </button>
        <button
          className="w-[35%]  bg-[#db1102] hover:bg-[#eb3e32] text-white hover:text-gray-900 font-bold py-3 rounded-lg transition-all duration-300"
          onClick={() => {
            dispatch(setSelectedFileRdx(null));
            dispatch(setIsUploadFinishedRdx(false));
          }}
        >
          Cancel
        </button>
      </div>
      {isUploading && (
        <UploadVideoProgress
          uploadProgress={uploadProgress}
          cancelUpload={cancelUpload}
          isCanceled={isCanceled}
        />
      )}
    </div>
  );
};

export default UserOptions;
