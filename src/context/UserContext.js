import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const API=process.env.REACT_APP_API_URI

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    const userRequest = async() => {
        // varrer o local storage
        if(data===null) {

        }
    }

    return(
        <UserContext.Provider value={{ data, setData, token, setToken}}>
            { children }
        </UserContext.Provider>
    )
}

export default DataProvider;