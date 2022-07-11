import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    const userLoadFromLocal = () => {
        if(data===null) {
            const storageData = JSON.parse(localStorage.getItem("data"))
           
            if(storageData === null) {
                return;
            }
            setData(storageData)
            const token = {
                headers: {
                  Authentication: `Bearer ${storageData.token}`,
                },
              };
            localStorage.setItem("token", JSON.stringify(token))
            setToken(token);
        }
    }

    return(
        <UserContext.Provider value={{ data, setData, token, setToken, userLoadFromLocal}}>
            { children }
        </UserContext.Provider>
    )
}

export default DataProvider;