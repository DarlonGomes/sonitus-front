import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext";
import Home from "./components/onboard/Home"
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
export default function App (){
    return(
        <DataProvider>
            <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        
                    </Routes>
                </BrowserRouter>
            <Footer />
        </DataProvider>
    )
};

