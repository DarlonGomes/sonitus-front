import styled from "styled-components";
import record from "../../assets/record.png";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export function EmptyCart({props, isHistory}) {

  return (
    <ContentWrapper>
      <AlbumCover src={record} alt={"Cart is empty"} />
      <AlbumHeader>
       { isHistory ? <p>You do not have a history yet...</p> : <p>Your cart is empty...</p> }
      </AlbumHeader>
    </ContentWrapper>
  );
}

export function CartItem({props, isHistory, isCheckout}) {
  const {cartProducts, setCartProduts} = useContext(DataContext);
  const excludeButton = isHistory ? null : (
    <p onClick={()=>{
      const response = window.confirm("Do you wish to delete this item from the cart?")
      if(response){
        const arr = cartProducts.splice(props.index, 1);
        setCartProduts(arr)
        return;
      }
    }}>
      <ion-icon name="close"></ion-icon>
    </p>
  );
  const date = isHistory ? (
    <p>{props.quantity || 1} - 07/09</p>
  ) : (
    <p>Qty {props.quantity || 1}</p>
  );
  const convertToCash = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.price );

  return (
    <ContentWrapper contentFormat={isCheckout}>
      <AlbumCover src={props.image} alt={props.album} />
      <AlbumText contentFormat={isCheckout}>
        <AlbumHeader contentFormat={isCheckout}>
          <h1>{props.album}</h1>
          {excludeButton}
        </AlbumHeader>
        <p>{props.artist}</p>
        <AlbumFooter>
          {date}
          <p>{convertToCash}</p>
        </AlbumFooter>
      </AlbumText>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 115px;
  display: flex;
  margin-bottom: 2.5px;
  padding: 2.5%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: ${ ({contentFormat}) => contentFormat ? '#FAFAFA' : '#393939'};
  border-radius: 2px;
`;

const AlbumCover = styled.img`
  display: flex;
  height: 105px;
  height: 105px;
  object-fit: contain;
  border-radius: 2px;
`;

const AlbumText = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 5px;
  font-size: 28px;
  line-height: 36px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  color: ${ ({contentFormat}) => contentFormat ? '#393939' : '#DFDFDF'};

  p {
    font-size: 24px;
    font-weight: 300;
  }
`;

const AlbumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  h1 {
    display: flex;
    min-width: ${ ({contentFormat}) => contentFormat ? '52vw' : '32vw'};
    max-width: ${ ({contentFormat}) => contentFormat ? '52vw' : '32vw'};
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  p:last-of-type {
    color: #afafaf80;
    font-size: 20px;
  }
`;

const AlbumFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  line-height: 36px;
  font-weight: 500;

  p {
    font-size: 20px;
    color: ${ ({contentFormat}) => contentFormat ? '#393939' : '#AFAFAF'};
    font-weight: 300;
  }

  p:last-of-type {
    font-size: 20px;
    text-align: end;
    color: green;
  }
`;
