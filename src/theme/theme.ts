// src/theme/theme.ts
import { createTheme} from "@mui/material/styles";

const theme = createTheme({defaultColorScheme: "dark"});
/*createTheme({
  palette: {
    primary: {
      main: "#f0f0f0", // custom primary color
    },
    secondary: {
      main: "#404040",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h4: {
      fontWeight: 600,
    },
  },
});*/

export default theme;
