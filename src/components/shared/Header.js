import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";
// import axios from "axios";
import styled from "styled-components";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

function SideMenu({ setDisplay }) {
  return(
    <>
      <SideMenuBody />
      <SideMenuShadow onClick={() => setDisplay(false)} />
    </>
  )
}

export default function Header() {
  const [display, setDisplay] = useState(false);

  const ShowSideMenu = () => display ? <SideMenu setDisplay={setDisplay} /> : <></>;
  return(
    <>
    <ShowSideMenu />
  <HeaderWrapper>
    
    <TopMenu >
      <HeaderHighlight onClick={() => setDisplay(true)}>
        <ion-icon name="menu-outline"></ion-icon>
      </HeaderHighlight>
      <ion-icon name="disc"></ion-icon>
      <ion-icon name="cart-outline"></ion-icon>
    </TopMenu>
    {/* QUANDO O HAMBURGUER DESCER TEM QUE IMPEDIR DO USUARIO APERTAR OS BOTÕES QUE ESTÃO ATRAS */}
    <SearchWrapper >
      <ion-icon name="search-outline"></ion-icon>
      <SearchBar placeholder="O que você procura?" />
    </SearchWrapper>
  </HeaderWrapper>
  </>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: flex-start;
  width: 100%;
  height: 13.5vh;
  position: fixed;
  padding: 1vh 2vw;
  top: 0;
  left: 0;
  background-color: #333333;
  color: #333333;
  box-sizing: border-box;
  z-index: 1;
`

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.5vh;
  color: #FFFFFF;
  font-size: 40px;
`

const HeaderHighlight = styled.div`
  font-size: 50px;
`

const SideMenuBody = styled.div`
  width: 65vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: red;
  top: 0;
  left: 0;
  z-index: 3;
`

const SideMenuShadow = styled.div`
  display: flex;
  width: 35vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(4px);
  background-color: #00000070;
  top: 0;
  right: 0;
  z-index: 2;
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.5vh;
  font-size: 32px;
  color: #FFFFFF;
  background-color: red;

  div {
    min-height: 24px;
    min-width: 24px;
  }
`

const SearchBar = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  width: 90%;
  height: 3.5vh;
  margin: 0.5vh 0.5vw;
  border: none;

  ::placeholder {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  }
`
