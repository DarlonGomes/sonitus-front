import styled from "styled-components";
//import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

import MainCarousel from "../shared/Carousel";
import SmallBanner from "../shared/banners/smallBanner";
import MainBanner from "../shared/banners/bigBanner";
export default function Home (){
    const { dataRequest, reqData } = useContext(DataContext);
   
    const obj = {
        
        image:"https://studiosol-a.akamaihd.net/letras/272x272/albuns/f/4/b/0/588401501157108.jpg",
        album:"Only Revolutions",
        artist:"Biffy Clyro",
        price:"200,00"
    };
    const title ="Discover"
    const arr = [obj,obj,obj,obj,obj,obj,obj]

    const famous = {
        image:"https://m.media-amazon.com/images/I/91dMGXclQyL._AC_SX569_.jpg",
        album:"Alucinação",
        artist:"Belchior",
        price:"180,00"
    }
    
    const famousArr = [famous,famous,famous,famous,famous,famous,famous]
    useEffect(() => {
        const effect = async() => await dataRequest();
        effect();
        // eslint-disable-next-line
    }, [])

    return(
        <>
        <BigScreen>
            <h2> S  O  N  I  T  U  S</h2>
            <h3>The old pleasure of <br/>listening is back</h3>
        </BigScreen>
        <Container>
            <h2>Our Selection</h2>
            <MainBanner title="Gigg's code playlist" image="https://i.pinimg.com/originals/77/dd/b9/77ddb90eee4b413ecdbf6b624315928c.png" id="giggs"/>
            <MainBanner title="Chico's odd playlist" image="https://yt3.ggpht.com/ytc/AKedOLRCU7jn-QSPH2EVwGiT7sSjDvdsPfX3svE9n_CAbg=s900-c-k-c0x00ffffff-no-rj" id="chico"/>

            <MainCarousel title="Best Seller" arr={famousArr}/> 
            
            <SmallBanner text="Run To The Hills" image="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/04/iron-maiden-ft-lauderdale-2019-jmc-53197.jpg" genre="rock" id="666"/>

            <MainCarousel title={title} arr={arr}/>
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
    flex-direction: column;

    
    h3{ 
        margin-top: 20px;
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 400;
        color: #DFDFDF;
        text-align: center;
    }

    h2{
        margin-top: 250px;
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 700;
        color: #C79A00;
        text-align: center;
        text-shadow: 10px 4px 5px rgba(0, 0, 0, 0.3);
    }

`;


const WhiteSpace = styled.div`
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
    //delete it after
`;

