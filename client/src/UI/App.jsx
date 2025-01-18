import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import OverlaySubtitle from "./components/OverlaySubtitle";

const App = () => {
  return (
    <>
      <div className="w-[1000px] max-h-[800px] ">
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          draggable={true}
          pauseOnHover={true}
          limit={3}
          closeOnClick={true}
        />
        <div className="relative h-[800px] w-[1000px] rounded-xl overflow-hidden">
          <Header />
          <div className="bg-primary_d">
            {/* Header */}
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/overlay" element={<OverlaySubtitle />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
