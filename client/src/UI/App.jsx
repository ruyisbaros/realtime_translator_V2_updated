import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RealtimeTranslator from "./pages/RealtimeTranslator";
import VideoSubtitleCreator from "./pages/VideoSubtitleCreator";
import { useState } from "react";
import MainSidebar from "./components/MainSidebar";

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };
  return (
    <div className="w-[1200px] max-h-[800px] bg-primary_d shadow-lg rounded-2xl overflow-hidden">
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        draggable={true}
        pauseOnHover={true}
        limit={3}
        closeOnClick={true}
      />
      ;
      <Header />
      <div className="flex w-full overflow-hidden max-h-[670px] ">
        <MainSidebar
          toggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
        />

        <div className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/realtime-translator"
              element={<RealtimeTranslator />}
            />
            <Route
              path="/video-subtitle-creator"
              element={<VideoSubtitleCreator />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default App;
