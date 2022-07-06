import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext";
import Home from "./components/onboard/Home"

export default function App (){
    return(
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
};

