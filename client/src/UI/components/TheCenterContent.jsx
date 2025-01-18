import { useState } from "react";
import ContentCenter from "./ContentCenter";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const TheCenterContent = () => {
  const [isScanning, setIsScanning] = useState(false);
  return (
    <div className="w-[100%] h-[700px] flex items-center justify-center gap-1">
      <LeftSidebar setIsScanning={setIsScanning} />
      <ContentCenter isScanning={isScanning} setIsScanning={setIsScanning} />
      <RightSidebar />
    </div>
  );
};

export default TheCenterContent;
