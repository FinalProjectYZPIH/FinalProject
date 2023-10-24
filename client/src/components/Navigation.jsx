import Switch from "@mui/material/Switch";
import {StyledEngineProvider} from '@mui/material/styles';
import { useDarkLightMode } from "../context/data/dataStore";

export default function Navigation() {
  const { lightMode, setDarkMode } = useDarkLightMode();
  return (
    <StyledEngineProvider>
      <Switch
        className="flex items-center bg-transparent text-blue-700 font-semibold "
        onClick={setDarkMode}
      >
      </Switch>
    </StyledEngineProvider>
  );
}
