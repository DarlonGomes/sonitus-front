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
        color: #000000;
    }
    
`;

const Carousel = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

`;

const Item = styled.div`
    width: 250px;
    height: 320px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin-right: 10px;

    img{
        width: 250px;
        height: 250px;
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

    return (
        <GenreWrapper>
            <div className="more">
            <h2>{props.title}</h2><ion-icon name="add-outline" onClick={()=>{navigate(`/${props.title}`)}}></ion-icon>
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
                    <MoreItem>
                    <ion-icon name="add-outline"></ion-icon>
                    </MoreItem>
                
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
        color: #000000;
    }
    ion-icon{
        font-size: 28px;
    }
`;

const CarouselGenre = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

`;

const GenreItem = styled.div`
    width: 200px;
    height: 270px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin: 0 5px;

    img{
        width: 200px;
        height: 200px;
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
    min-width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0D0D0;
    margin:75px 30px;
    box-shadow: 0 3px 9px 0 rgb(213 217 217 / 50%);
   ion-icon{
    font-size: 28px;
    color: #FFFFFF;
   }
`;