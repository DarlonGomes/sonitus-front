import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {GenreCarousel} from "../shared/Carousel";
import { DataContext } from "../../context/DataContext.js";


export default function History () {
    const { history } = useContext(DataContext);
    const [isLoading, setIsLoading] = useContext(true);

    const Render = () =>{
        if(isLoading){
            return(
                <Container>

                </Container>
            )
        }
        else{
            return(
                <Container>
                    
                </Container>
            )
        }
    }
    return(

    )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 0 20px 30px;
  margin-top: 120px;
  background-color: #dfdfdf;
  flex: 1;
  z-index: 0;

  h2 {
    margin: 30px 0 10px;
    font-family: "Jost";
    font-size: 28px;
    font-weight: 700;
    color: #292929;
    z-index: 0;
  }

  p {
    margin: 0 0 15px;
    font-family: "Jost";
    font-size: 25px;
    font-weight: 400;
    color: #292929;
    z-index: 0;
  }
`;