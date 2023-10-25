import { useDarkLightMode } from "../context/data/dataStore";
import { CloudMoon, Sun } from "lucide-react";
import ReactSwitch from "react-switch";

export default function Navigation() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  return (
    <ReactSwitch
      onChange={setDarkMode}
      checked={!lightMode}
      offColor={"#3b82f6"}
      onColor={"#D0D0D0"}
      checkedIcon={<CloudMoon />}
      uncheckedIcon={<Sun />}
    />
  );
}
