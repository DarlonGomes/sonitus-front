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
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const height = 380;
    let embed;
    const getData = async() =>{
        try {
            const response = await axios.get(`${URL}/products/?id=${id}`)
            setAlbumData(response.data[0]);
            console.log(response.data[0])
            const jsonString = response.data[0].embed;
            embed = jsonString.replace(/"/g, "");
            console.log(embed)
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
                    {embed}
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
    
`;

const AlbumInfo = styled.div`
    width: 100%;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    justify-content: space-between;

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