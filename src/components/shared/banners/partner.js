import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

export default function PartnerBanner (props){

    const navigate = useNavigate();

    return(
        <Banner>
            <a href={props.link} title={props.title} target="_blank" rel="noopener noreferrer">
            <img src={props.image} alt={props.title}/>
            <h3>{props.title}</h3>
            </a>
        </Banner>
    )
}

const Banner = styled.div`
    width: 100%;
    height: 60px;
    margin: 10px 0 ;
    position: relative;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    img{
        width: 100%;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
    }
    h3{
        font-family: 'Jost';
        font-size: 22px;
        font-weight: 700;
        color: #FFFFFF;
        position: absolute;
        left: 10px;
        bottom: 10px;
    }
`;