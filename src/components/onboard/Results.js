import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
import { Container, DoubleColumn, LoadWrapper, AlbumWrapper } from "./Genre";
import { ContentWrapper, AlbumCover } from "../shared/CartItem";
import noresult from "../../assets/noresult.png";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

function NoResults({ isCheckout }) {
  return (
    <EmptyContentWrapper contentFormat={isCheckout}>
      <AlbumCover src={noresult} alt={"Empty"} />
      <AlbumText >
          <p>We did not found anything</p>
      </AlbumText>
    </EmptyContentWrapper>
  );
}

function DoubleColumnList({ genreAlbums, navigate }) {
  const { cartProducts, setCartProducts } = useContext(DataContext);
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
return( <>
    <h2>{genreAlbums[0].genre}</h2>
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
  </>)
}

export default function Results() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const { search, reqData } = useContext(DataContext);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    const dataArray = [];
    const splitBetweenArrays = () => {
      for(let i = 0; i < reqData.length; i++) {
        dataArray[i] = search.filter((item) => item.genre === reqData[i]._id)
      }
    }
    search && splitBetweenArrays();
    setFilter(dataArray);
    setTimeout(() => setIsLoading(false), 1000);
  }, [search])

  const ResultDisplay = () =>
  {
    return filter.map((genre, index) =>
        genre.length !== 0 ? (
          <DoubleColumnList key={index} genreAlbums={genre} navigate={navigate} />
        ) : null
      );
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
              { filter === null ? <NoResults isCheckout={true} /> : <ResultDisplay />}
            </Container>
            </>
        )
    }
}
  return(
  <>
    <Render />
  </>
  )
}

const AlbumText = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  font-size: 32px;
  color: #454545;
  line-height: 26px;
  font-weight: 500;
  width: 100%;
  height: 100%;
`

const EmptyContentWrapper = styled(ContentWrapper)`
  margin: 9vh 0;
  background-color: #DFDFDF;
`