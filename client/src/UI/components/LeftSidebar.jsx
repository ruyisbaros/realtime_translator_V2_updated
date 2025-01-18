import { useSelector } from "react-redux";
import CheckBoxSwitch from "../accessories/CheckBoxSwitch";
import NoisyEnv from "../accessories/NoisyEnv";
import SaveUnSave from "../accessories/SaveUnSave";
import SourceLanguage from "../accessories/SourceLanguage";
import StartStopBtn from "../accessories/StartStopBtn";
import TargetLanguage from "../accessories/TargetLanguage";
import VoiceControl from "../accessories/VoiceControl";
// eslint-disable-next-line react/prop-types
const LeftSidebar = ({ setIsScanning }) => {
  const { selected_source } = useSelector((store) => store.audio_src);
  return (
    <div className=" QPushButton h-[640px] w-[25%]">
      <div className="  text-white py-4 ">
        <CheckBoxSwitch />
        <NoisyEnv />
        <SourceLanguage />
        <TargetLanguage />
        <VoiceControl />
        <SaveUnSave />
        {selected_source && <StartStopBtn setIsScanning={setIsScanning} />}
      </div>
    </div>
  );
};

export default LeftSidebar;
