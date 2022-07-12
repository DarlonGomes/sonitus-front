import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Wrapper from "../shared/banners/HistoryContainer.js";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { DataContext } from "../../context/DataContext.js";

const URL = process.env.REACT_APP_API_URI;

export default function History () {
    const { history, setHistory } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
   
    const token = JSON.parse(localStorage.getItem("sonitusToken"));

    const Render = () =>{
        if(isLoading){
            return(
                <Container>
                    <h2><Skeleton width={200} height={40} /></h2>
                    <Purchase>
                        <Skeleton width={"100%"} height={160} />
                    </Purchase>
                </Container>
            )
        }
        else{
            return(
                <Container>
                    <h2>History</h2>
                    {history.map((element, index) => <Wrapper key={index} element={element}/>)}

                    
                </Container>
            )
        }
    }

    async function getHistory(token) {
        if (token === null) {
          return;
        }
        try {
          const response = await axios.get(`${URL}/history`, token);
          setHistory(response.data);
          setTimeout(setIsLoading(false), "1000");
          return;
        } catch (error) {
          
        }
      }


    useEffect(()=>{
        getHistory(token)
    },[])
    return(
        <Render/>
    )
    
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #DFDFDF;
  padding: 0 20px 30px;
  margin-top: 120px;
  background-color: #dfdfdf;
  flex: 1;
  z-index: 0;

  h2 {
    margin: 30px 0 20px;
    font-family: "Jost";
    font-size: 28px;
    font-weight: 700;
    color: #292929;
    z-index: 0;
  }

  p {
    
    font-family: "Jost";
    font-size: 18px;
    font-weight: 400;
    color: #292929;
    z-index: 0;
  }
`;

const Purchase = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    `;