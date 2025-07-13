import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/dashboard/MainLayout";
import Routes from "./routes/Router";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes />
      </MainLayout>
    </BrowserRouter>
  );
}
