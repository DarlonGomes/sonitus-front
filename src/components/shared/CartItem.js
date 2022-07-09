import styled from "styled-components";
import record from "../../assets/record.png";
// import { useContext, useState } from "react";

export function EmptyCart() {
  return (
    <ContentWrapper>
      <AlbumCover src={record} alt={"Cart is empty"} />
      <AlbumHeader>
        <p>Your cart is empty...</p>
      </AlbumHeader>
    </ContentWrapper>
  );
}

export default function CartItem(props, isHistory) {
  const exludeButton = isHistory ? null : (
    <p onClick={() => console.log("remove")}>
      <ion-icon name="close"></ion-icon>
    </p>
  );
  const date = isHistory ? (
    <p>{props.quantity || 1} - 07/09</p>
  ) : (
    <p>Qty {props.quantity}</p>
  );
  const convertToCash = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.price);
  return (
    <ContentWrapper>
      <AlbumCover src={props.image} alt={props.album} />
      <AlbumText>
        <AlbumHeader>
          <h1>{props.album}</h1>
          {exludeButton}
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
  background-color: #393939;
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
  color: #dfdfdf;

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
    min-width: 32vw;
    max-width: 32vw;
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
    color: #afafaf;
    font-weight: 300;
  }

  p:last-of-type {
    font-size: 20px;
    text-align: end;
    color: green;
  }
`;
