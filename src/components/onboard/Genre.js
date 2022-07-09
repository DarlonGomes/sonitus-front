import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const URL=process.env.REACT_APP_API_URI;

export default function Genre () {
    const {genre} = useParams();
    const {dataRequest}= useContext(DataContext);
    const [genreAlbums, setGenreAlbums] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const getData = async() =>{
        try {
            const response = await axios.get(`${URL}/products/?genre=${genre}`);
            setGenreAlbums(response.data);
            setTimeout(()=>setIsLoading(false), "1000");
        } catch (error) {
            console.log(error);
        }
    }

const Render = () =>{
    if(isLoading){
        return(
            <>
            <Container>
                <h2><Skeleton width={170} height={40}/></h2>
                <DoubleColumn>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                    <LoadWrapper>
                        <Skeleton width={150} height={220}/>
                    </LoadWrapper>
                </DoubleColumn>
            </Container>
            </>
        )
    }else{
        return(
            <>
            <Container>
                <h2>{genre}</h2>
                <DoubleColumn>
                    {genreAlbums.map(element => <AlbumWrapper key={element._id}
                     onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}>
                        <img src={element.image} alt={element.album}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>{element.artist}</p>
                            <p className="bold">
                               R$ {element.price}
                            </p>
                        </div>

                    </AlbumWrapper>)}
                </DoubleColumn>
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
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #000000;
        z-index: 0;
    }
`;

const DoubleColumn = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
`;

const AlbumWrapper = styled.div`
    width: 150px;
    height: 220px;
    background-color: #FFFFFF;
    border-radius: 4px;
    margin: 10px 8px;
    box-sizing: border-box;
    padding: 5px;
    img{
        width: 140px;
        height: 140px;
        object-fit: fill;
        border-radius: 4px 4px 0 0 ;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bold{
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        
        
    }
`;

const LoadWrapper = styled.div`
    margin: 10px 8px;
    z-index: 0;
`;
