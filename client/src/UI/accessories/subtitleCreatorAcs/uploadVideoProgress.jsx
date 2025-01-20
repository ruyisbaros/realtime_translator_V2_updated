// eslint-disable-next-line react/prop-types
const UploadVideoProgress = ({ uploadProgress, cancelUpload, isCanceled }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="progress-box bg-gray-900 text-gray-200 rounded-lg p-6 w-1/3 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">Uploading...</h3>
        <div className="progress-bar w-full bg-gray-700 h-3 rounded overflow-hidden">
          <div
            className="bg-teal-500 h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-center">
          {uploadProgress === 100
            ? "Processing audio extraction..."
            : `Progress: ${uploadProgress}%`}
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={cancelUpload}
          disabled={uploadProgress === 0 || isCanceled}
          className="w-[35%]  bg-[#db1102] hover:bg-[#eb3e32] text-white hover:text-gray-900 font-bold py-3 rounded-lg transition-all duration-300"
        >
          Cancel Uploading
        </button>
      </div>
    </div>
  );
};

export default UploadVideoProgress;
