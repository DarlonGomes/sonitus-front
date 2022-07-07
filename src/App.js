import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext";
import Home from "./components/onboard/Home";
import Header from "./components/shared/Header";
import RequestProvider from "./context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <RequestProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </RequestProvider>
    </DataProvider>
  );
}
