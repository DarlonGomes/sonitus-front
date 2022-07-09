import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {GenreCarousel} from "../shared/Carousel";

const URL=process.env.REACT_APP_API_URI;

function GenreList () {
    const [carouselData, setCarouselData] = useState();  
    const [isLoading, setIsLoading] = useState(true);
    const obj={
        image: "https://cdns-images.dzcdn.net/images/cover/4ba9235bc8e6947a60e2e03642709c40/264x264.jpg",
        album: "Under The Covers",
        artist: "Ninja Sex Party",
        price: "200,00",
    }
    const arr=[obj,obj,obj,obj]
   const megaObject = {title: "Rock", arr}
    async function getData (){
        try {
            const response = await axios.get(`${URL}/products/?genre=All`);
            setCarouselData(response.data);
            console.log(response.data)
            setTimeout(()=>setIsLoading(false), "1000");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData();
        
    },[])

    const Render = () =>{
        if(isLoading){
            return(
                <>
                <Container>
                    <h2><Skeleton width={100} height={40}/></h2>
                <LoadCarousel>
                <div className="title">
                    <p><Skeleton width={150} height={28}/></p><p><Skeleton width={28}/></p>
                </div>
                <div className="carousel">
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                </div>
                </LoadCarousel>
                <LoadCarousel>
                <div className="title">
                    <p><Skeleton width={100}/></p><p><Skeleton width={20}/></p>
                </div>
                <div className="carousel">
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                </div>
                </LoadCarousel>
                <LoadCarousel>
                <div className="title">
                    <p><Skeleton width={100}/></p><p><Skeleton width={20}/></p>
                </div>
                <div className="carousel">
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                    <div className="item">
                    <Skeleton width={200} height={270} />
                    </div>
                </div>
                </LoadCarousel>
                </Container>
                </>
            )
        }else{
            return (
                <>
                <Container>
                    <h2> All Genres</h2>
                    {carouselData.map(element => <GenreCarousel title={element.title} arr={element.arr}/>)}
                   
                </Container>
                </>
            )
        }
    }
    return (
        <>
        <Render />
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
        z-index: 0;
    }
`;

const LoadCarousel = styled.div`
    max-width: 100vw;
    z-index: 0;
    .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    p{
        margin: 20px 0;
        font-size: 28px;
    }

    .carousel{
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    }
    .item{
        width: 200px;
        height: 270px;
        margin: 0 5px;
    }

`;

const Loader = styled.div`
    max-width: 100vw;
    height: auto;
    z-index: 0;
    margin: 5px 0;

    .small{
        margin: 50px auto 10px;
    }
`;
