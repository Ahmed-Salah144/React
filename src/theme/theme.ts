// src/theme/theme.ts
import { createTheme, withTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // custom primary color
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
});

export default theme;
