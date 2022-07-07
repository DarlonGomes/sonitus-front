import axios from "axios";
import { createContext, useEffect, useState } from "react";

// const API=process.env.REACT_APP_API_URI
const API='http://localhost:5000'

export const DataContext = createContext();
const requestParams = "products/?genre=Sample"

const RequestProvider = ({ children }) => {
    const [reqData, setReqData] = useState(null);
    const [products, setProducts] = useState(null);

    const productRequest = async(genre) => {
        if(products === null || (products.hasOwnProperty('genre') && !products.genre.includes(genre))) {
            try {
                const response = await axios.get(`${API}/products/?genre=${genre}`);
                console.log(response.data);
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