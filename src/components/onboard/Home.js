import styled from "styled-components";
//import axios from "axios";
//import { useContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

export default function Home (){

    return(
        <Page>
            <h1> Hello World!</h1>
        </Page>
    )
}


const Page = styled.div`
    width: 100%;
    height: 300px;
    h1{
        font-weight: 400;
        font-size: 30px;
    }
`;