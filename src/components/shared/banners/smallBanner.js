import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
function SmallBanner (props){
    //const [bannerData, setBannerData] = useState(props)  ---> vem do get na home
    const navigate = useNavigate();

    return(
        
        <SmallSuggestedBox onClick={()=>{navigate(`/${props.genre}/${props.id}`)}}>
            <img src={props.image}/>
            <h3>{props.text}</h3>
        </SmallSuggestedBox>
       
    )
}

export default SmallBanner;

const SmallSuggestedBox = styled.div`
    width: 100%;
    height: 250px;
    margin: 50px auto 10px ;
    position: relative;
    img{
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 5px;
    }
    h3{
        font-family: 'Jost';
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
        position: absolute;
        left: 10px;
        bottom: 10px;
    }
`;