import styled from "styled-components";
//import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

function MainCarousel (props) {
    //const [carouselData, setCarouselData] = useState();  ---> isso vem do props, ao fazer o get na home
    const navigate = useNavigate();


    return (
        <CarouselWrapper>
            <h2>{props.title}</h2>
            <Carousel>

                {/* 
                {carouselData.map(element => 
                    <Item onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}>
                        <img src={element.image} alt={element.album}/>
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
                */}
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                <Item onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
                    <img src={props.image} alt={props.album}/>
                    <div className="info">
                        <p className="bold">
                            {props.album}
                        </p>
                        <p>
                            {props.artist}
                        </p>
                        <p className="bold">
                            R$ {props.price}
                        </p>
                    </div>
                </Item>
                
                
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
    margin: 0 5px;

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

