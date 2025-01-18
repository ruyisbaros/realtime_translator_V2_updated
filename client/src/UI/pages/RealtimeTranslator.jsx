import { useState } from "react";
import ContentCenter from "../components/ContentCenter";

import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const TheCenterContent = () => {
  const [isScanning, setIsScanning] = useState(false);
  return (
    <div className=" h-[660px] flex items-center justify-center gap-1">
      <LeftSidebar setIsScanning={setIsScanning} />
      <ContentCenter isScanning={isScanning} setIsScanning={setIsScanning} />
      <RightSidebar />
    </div>
  );
};

export default TheCenterContent;
