import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext";
import Home from "./components/onboard/Home";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import GenreList from "./components/onboard/AllGenre";
import Genre from "./components/onboard/Genre";
import Album from "./components/onboard/Album";
import RequestProvider from "./context/DataContext";
import Checkout from "./components/onboard/Checkout";
import History from "./components/onboard/History";
import Results from "./components/onboard/Results";


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
            <Route path="/:genre/:id" element={<Album />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/history" element={<History />} />
            <Route path="/search/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </RequestProvider>
    </DataProvider>
  );
}
