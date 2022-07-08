import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API=process.env.REACT_APP_API_URI
const requestParams = "products/?genre=Sample"

export const DataContext = createContext();

const RequestProvider = ({ children }) => {
    const [reqData, setReqData] = useState(null);
    const [products, setProducts] = useState(null);

    const necessaryRequest = (genre) => {
        const flag = () => products.length > 0 && products.any(item => item.genre !== genre)
        if(genre === "All") {
            return true;
        }
        if(products !== null && !flag) {
            return true;
        }
        return false;
    };

    const productRequest = async(genre) => {
        if(products === null || necessaryRequest(genre)) {
            try {
                const response = await axios.get(`${API}/products/?genre=${genre}`);
                setProducts(response.data);
                return true;
            } catch (err) {
                return null;
            }
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
        <DataContext.Provider value={{ reqData, dataRequest, products, productRequest }}>
            { children }
        </DataContext.Provider>
    )
}

export default RequestProvider;