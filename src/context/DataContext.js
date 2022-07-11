import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API=process.env.REACT_APP_API_URI
const requestParams = "products/?genre=Sample"

export const DataContext = createContext();

const RequestProvider = ({ children }) => {
    const [reqData, setReqData] = useState(null);
    const [products, setProducts] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [history, setHistory] = useState(null)
    const [search, setSearch] = useState(null);

    const productRequest = async(genre) => {
        try {
            const response = await axios.get(`${API}/products/?genre=${genre}`);
            setProducts(response.data);
            return true;
        } catch (err) {
            return null;
        }
    }

    const dataRequest = async() => {
        try {
            const response = await axios.get(`${API}/${requestParams}`);
            setReqData(response.data);
            return true;
        } catch (err) {
            return null;
        }
    }

    return(
        <DataContext.Provider value={{ search, setSearch, reqData, dataRequest, products, productRequest, cartProducts, setCartProducts, history, setHistory }}>
            { children }
        </DataContext.Provider>
    )
}

export default RequestProvider;