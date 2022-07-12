import styled from "styled-components";
//import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainBanner (props){
    //const [ bannerData, setBannerData] = useState(props);
    const navigate = useNavigate();

    return (
        <SuggestedBox onClick={()=>{navigate(`/${props.id}`)}}>
                <img src={props.image} alt={props.title}/>
                <h3>{props.title}</h3>
        </SuggestedBox>
    )
}

export default MainBanner;

const SuggestedBox = styled.div`
    width: 100%;
    height: 450px;
    margin: 5px auto 5px;
    position: relative;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    img{
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 5px;
    }
    h3{
        font-family: 'Jost';
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        position: absolute;
        left: 10px;
        bottom: 10px;
        text-shadow: 10px 4px 5px rgba(0, 0, 0, 0.3);
    }
`;