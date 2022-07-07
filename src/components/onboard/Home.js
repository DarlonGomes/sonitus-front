import styled from "styled-components";
//import axios from "axios";
//import { useContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

export default function Home (){

    return(
        <>
        <BigScreen>
            <h3>O prazer do garimpo <br/>na palma da sua mão</h3>
        </BigScreen>
        <Container>
            <h2>Our Selection</h2>
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
    padding: 0 20px;

    h2{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #000000;
    }
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
        margin-top: 250px;
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 400;
        color: #DFDFDF;
        text-align: center;
    }


`;


const SuggestedBox = styled.div`
    width: 100%;
    height: 450px;
    margin: 5px auto 5px;
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