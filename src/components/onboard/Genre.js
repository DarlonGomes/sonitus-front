import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
//import { UserContext } from "../../context/UserContext";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const URL=process.env.REACT_APP_API_URI;

export default function Genre () {
    const {genre} = useParams();
    const {dataRequest, cartProducts, setCartProducts }= useContext(DataContext);
    const [genreAlbums, setGenreAlbums] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const getData = async() =>{
        setIsLoading(true)
        try {
            const response = await axios.get(`${URL}/products/?genre=${genre}`);
            setGenreAlbums(response.data);
            setTimeout(()=>setIsLoading(false), "1000");
        } catch (error) {
            console.log(error);
        }
    }

    function validate(element) {
    
        const product = {
          quantity: 1,
          image: element.image,
          album: element.album,
          artist: element.artist,
          price: element.price,
          id: element._id,
          index: cartProducts.length,
          date: dayjs(Date()).format("MM/DD"),
        };
    
        function matchIndex() {
            const index = cartProducts.findIndex((item) => item.id === product.id)
            return index;
        }
        
        const newArr = [...cartProducts];
    
        if(cartProducts.length > 0 && matchIndex() !== -1) {
            cartProducts[matchIndex()].quantity += product.quantity;
            cartProducts[matchIndex()].date = dayjs(Date()).format("MM/DD");
        } else {
            newArr.push(product)
        }
        toast.success("Added to cart.",{
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setCartProducts(newArr);
      };

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
                    {genreAlbums.map((element, index) => <AlbumWrapper key={index}>
                        <img src={element.image} alt={element.album} onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>{element.artist}</p>
                            <p className="bold">
                               $ {element.price}
                            </p>
                            <ion-icon name="cart-outline" onClick={()=>{validate(element)}}></ion-icon>
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
    },[genre])
    
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
        color: #292929;
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
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    position: relative;

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

    ion-icon{
        font-size: 25px;
        color: #535A53;
        position: absolute;
        right: 5px;
        bottom: 5px;
    }
`;

const LoadWrapper = styled.div`
    margin: 10px 8px;
    z-index: 0;
`;
