import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext";
import Home from "./components/onboard/Home";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import GenreList from "./components/onboard/AllGenre";
import Genre from "./components/onboard/Genre";
import RequestProvider from "./context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <RequestProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genres" element={<GenreList />} />
            <Route path="/:genre" element={<Genre />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </RequestProvider>
    </DataProvider>
  );
}
