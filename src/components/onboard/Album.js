import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const URL=process.env.REACT_APP_API_URI;

export default function Album (){
    const {id} = useParams();
    const {dataRequest} = useContext(DataContext);
    const [albumData, setAlbumData] = useState();
    const [spotify, setSpotify] = useState()
    const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();
    const getData = async() =>{
        try {
            const response = await axios.get(`${URL}/products/?id=${id}`)
            setAlbumData(response.data[0]);
            setSpotify(response.data[0].embed);
            setTimeout(setIsLoading(false), "1000");
        } catch (error) {
            console.log(error);
        }
    }

     
    const Render = () => {
        if(isLoading){
            return(
                <Container>
                    <Skeleton width={300} height={300}/>

                </Container>
            )
        }else{
            return(
                <>
                <Container>
                    <h2>{albumData.album}</h2>
                    <p> {albumData.artist}</p>
                    <AlbumInfo>
                        <img src={albumData.image} alt={albumData.album} />
                        <div className="info">
                            <div className="limit">
                            
                            </div>
                        </div>
                    </AlbumInfo>
                    <h2>Description</h2>
                    <DescriptionText><p>{albumData.description}</p></DescriptionText>
                    <h2>Listen</h2>
                    <AlbumSample dangerouslySetInnerHTML={{__html: spotify}} />
                </Container>
                
                </>
            )
        }
    }

    
    useEffect(()=>{
        dataRequest();
        getData();
    },[])
    return(
        <Render/>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 0 20px 30px;
    margin-top: 120px;
    background-color: #DFDFDF;
    flex: 1;
    
    h2{
        margin: 30px 0 10px;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #292929;
        z-index: 0;
        
    }

    p{
        margin: 0 0 15px;
        font-family: 'Jost';
        font-size: 25px;
        font-weight: 400;
        color: #292929;
        z-index: 0;
    }

    .embed{

    }
    
`;

const AlbumInfo = styled.div`
    width: 100%;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    justify-content: space-between;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

    img{
        width: 200px;
        height: 200px;
        object-fit: fill;
    }

    .info{
        flex: 1;
        margin-left: 5px;

    }
    .limit{
        height: 70px;
        overflow: hidden;
    }
    p{  
        
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 500;
        color: #292929;
        margin-bottom: 15px ;
        z-index: 0;
        text-align: center;

    }

`;

const AlbumSample = styled.div`
`;

const DescriptionText = styled.div`
    width: 100%;
    height: auto;
    padding: 5px 5px 0;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

    p{
        font-family: 'Jost';
        font-size: 16px;
        line-height: 1.5;
        font-weight: 400;
    }
`;