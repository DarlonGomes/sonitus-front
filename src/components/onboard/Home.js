import styled from "styled-components";
import Header from "../shared/Header";
//import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

export default function Home (){
    const { dataRequest, setReqData, reqData } = useContext(DataContext);

    useEffect(() => {
        dataRequest();
        // eslint-disable-next-line
    }, [])

    return(
        <>
        
        <Container>
        
       <BigScreen>
            <h3>S o n i t u s</h3>
        </BigScreen>
            <SuggestedBox>
                <h3> Gigg's selection</h3>
            </SuggestedBox>
            <SuggestedBox>
                <h3> Música de corno </h3>
            </SuggestedBox>
            <SuggestedBox>
                <h3> Rock concert </h3>
            </SuggestedBox>
        </Container>
        </>
    )
}


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    
`;


const BigScreen = styled.div`
    
    width: 100%;
    height: 400px;
    background-image: url("https://secureservercdn.net/45.40.152.13/e5f.02f.myftpupload.com/wp-content/uploads/2018/12/MonostereoVinyl.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 400px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    
    h3{ 
        font-family: 'Roboto';
        font-size: 30px;
        font-weight: 700;
        color: #FFFFFF;
    }


`;


const SuggestedBox = styled.div`
    width: 100%;
    height: 450px;
    margin: 30px auto;
    border-radius: 5px;
    background-color: pink;
    position: relative;

    h3{
        font-family: 'Jost';
        font-size: 36px;
        font-weight: 700;
        color: #FFFFFF;
        position: absolute;
        left: 10px;
        bottom: 10px;
    }
`;