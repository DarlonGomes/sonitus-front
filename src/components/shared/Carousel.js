import styled from "styled-components";
//import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

function MainCarousel (props) {
    const [carouselData, setCarouselData] = useState(props.arr); 
    const navigate = useNavigate();

    return (
        <CarouselWrapper>
            <h2>{props.title}</h2>
            <Carousel>
 
                {carouselData.map(element => 
                    <Item key={element._id} >
                        <img src={element.image} alt={element.album} 
                        onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>
                                {element.artist}
                            </p>
                            <p className="bold">
                                R$ {element.price}
                            </p>
                        </div>
                    </Item>)} 
                
            </Carousel>

        </CarouselWrapper>

    );
}

export default MainCarousel;

const CarouselWrapper = styled.div`
    max-width: 100vw;
    margin-top: 30px;

    h2{
        margin: 20px 0 ;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #292929;
    }
    
`;

const Carousel = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none;  
`;

const Item = styled.div`
    width: 250px;
    height: 320px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px 5px 0 5px;
    border-radius: 5px;

    img{
        width: 240px;
        height: 240px;
        object-fit: fill;
    }

    .info{  
        height: 70px;
        width: 100%;
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

export function GenreCarousel (props){

    const [carouselData, setCarouselData] = useState(props.arr); 
    const navigate = useNavigate();
    function goTo (param){
        navigate(`/${props.title}`);
    }
    return (
        <GenreWrapper>
            <div className="more">
            <h2>{props.title}</h2><ion-icon name="add-outline" onClick={()=>{goTo(props.title)}}></ion-icon>
            </div>
            <CarouselGenre>

                {carouselData.map(element => 
                    <GenreItem key={element._id} >
                        <img src={element.image} alt={element.album} 
                        onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>
                                {element.artist}
                            </p>
                            <p className="bold">
                                R$ {element.price}
                            </p>
                        </div>
                    </GenreItem>)} 
                    {/* <MoreItem onClick={()=>{goTo(props.title)}}>
                    <ion-icon name="add-outline"></ion-icon>
                    </MoreItem> */}
                
            </CarouselGenre>

        </GenreWrapper>

    );


}


const GenreWrapper = styled.div`
    max-width: 100vw;

    .more{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2{
        margin: 20px 0 ;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #292929;
    }
    ion-icon{
        font-size: 28px;
        color: #292929;
    }
`;

const CarouselGenre = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none;  
`;

const GenreItem = styled.div`
    width: 200px;
    height: 270px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;

    img{
        width: 190px;
        height: 190px;
        object-fit: fill;
    }

    .info{  
        height: 70px;
        width: 100%;
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

const MoreItem = styled.div`
    min-width: 60px;
    height: 60px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
    margin:105px 30px;
    box-shadow: 0 3px 9px 0 rgb(213 217 217 / 50%);
   ion-icon{
    font-size: 28px;
    color: #DFDFDF;
   }
`;