import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main/MainLayout";
import Routes from "./routes/Router";
import { ThemeProvider} from "@mui/material";
import theme from "./theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
