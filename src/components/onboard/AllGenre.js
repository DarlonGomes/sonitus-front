import styled from "styled-components";
//import axios from "axios";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

import {GenreCarousel} from "../shared/Carousel";

function GenreList () {
    const [carouselData, setCarouselData] = useState();  
    const obj={
        image: "https://cdns-images.dzcdn.net/images/cover/4ba9235bc8e6947a60e2e03642709c40/264x264.jpg",
        album: "Under The Covers",
        artist: "Ninja Sex Party",
        price: "200,00",
    }
    const arr=[obj,obj,obj,obj]
   const megaObject = {title: "Rock", arr}

    return (
        <>
        <Container>
            <h2> All Genres</h2>
            
            <GenreCarousel title={megaObject.title} arr={megaObject.arr}/>
            <GenreCarousel title={megaObject.title} arr={megaObject.arr}/>
            <GenreCarousel title={megaObject.title} arr={megaObject.arr}/>
            <GenreCarousel title={megaObject.title} arr={megaObject.arr}/>
           
        </Container>
        </>
    )
}
export default GenreList;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 0 20px;
    margin-top: 120px;

    h2{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #000000;
    }
`;

const GenreWrapper = styled.div`
    width: 100%;

    h3{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #000000;
    }
    .info{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .sampleWrapper{
        height: 410px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-between;
    }

`;

const Sample = styled.div`
    width: 150px;
    height: 200px;
    display: flex;
    flex-direction: column;
       
    img{
        width: 150px;
        height: 150px;
    }

    .info{
        width: 150px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    p{
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 14px;
        color: #202020;
    }

    .bold{
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }
`;

const EmptySample = styled.div`
    width: 150px;
    height: 200px;
    display: flex;
    background-color: #dfdfdf;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }
`;

