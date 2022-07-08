import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

// PENSAR EM COMPONENTIZAR EXTERNAMENTE A PARTIR DAQUI
function Login({ handleSubmit, Button }) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input placeholder="e-mail" />
      <input placeholder="senha" />
      <Button />
    </FormsWrapper>
  );
}

function SignUp({ handleSubmit, Button }) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input placeholder="nome" />
      <input placeholder="e-mail" />
      <input placeholder="senha" />
      <input placeholder="confirme a senha" />
      <Button />
    </FormsWrapper>
  );
}
// PENSAR EM COMPONENTIZAR EXTERNAMENTE A PARTIR DAQUI

function AccountActions({ setAccount, setDisplay, setOperation }) {
  function handleClick(flag) {
    setDisplay(false);
    setAccount(true);
    setOperation(flag);
  }

  return (
    <>
      <AccountButton onClick={() => handleClick(true)}>Login</AccountButton>
      <AccountButton onClick={() => handleClick(false)}>Signup</AccountButton>
    </>
  );
}

function AccountMenu({ data, setAccount, setDisplay, setOperation }) {
  return (
    <UserContentWrapper>
      {data ? (
        <>Olá {data.name}</>
      ) : (
        <AccountActions
          setOperation={setOperation}
          setDisplay={setDisplay}
          setAccount={setAccount}
        />
      )}
    </UserContentWrapper>
  );
}

function SideMenu({ setDisplay, setAccount, setOperation, Genres, data }) {
  return (
    <>
      <SideMenuBody>
        <DataWrapper>
          <AccountMenu
            data={data}
            setOperation={setOperation}
            setDisplay={setDisplay}
            setAccount={setAccount}
          />
          <Genres />
        </DataWrapper>
      </SideMenuBody>
      <SideMenuShadow onClick={() => setDisplay(false)} />
    </>
  );
}

export default function Header() {
  const [display, setDisplay] = useState(false);
  const [account, setAccount] = useState(null);
  const [operation, setOperation] = useState(false);
  const { reqData, productRequest } = useContext(DataContext);
  const { data } = useContext(UserContext);

  useEffect(() => {}, []);

  async function genreNavigate(queryId) {
    const success = await productRequest(queryId);
    console.log(success);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const Genres = () => {
    return reqData.map((item, index) => (
      <Genre onClick={() => genreNavigate(item._id)} key={index}>
        {item._id}
      </Genre>
    ));
  };

  const MenuCover = () => (
    <AccountMenuWrapper onClick={() => setAccount(null)}>
      {operation ? (
        <Login handleSubmit={handleSubmit} Button={Button} />
      ) : (
        <SignUp handleSubmit={handleSubmit} Button={Button} />
      )}
    </AccountMenuWrapper>
  );

  const ShowSideMenu = () =>
    display ? (
      <SideMenu
        Genres={Genres}
        data={data}
        setOperation={setOperation}
        setAccount={setAccount}
        setDisplay={setDisplay}
      />
    ) : (
      <></>
    );

  const Button = () => operation ? <InputButton>Login</InputButton> : <InputButton>Register</InputButton>;

  return (
    <>
      <ShowSideMenu />
      {account !== null ? <MenuCover /> : <></>}
      <HeaderWrapper>
        <TopMenu>
          <HeaderHighlight onClick={() => setDisplay(true)}>
            <ion-icon name="menu-outline"></ion-icon>
          </HeaderHighlight>
          <ion-icon name="disc"></ion-icon>
          <ion-icon name="cart-outline"></ion-icon>
        </TopMenu>
        {/* QUANDO O HAMBURGUER DESCER TEM QUE IMPEDIR DO USUARIO APERTAR OS BOTÕES QUE ESTÃO ATRAS */}
        <SearchWrapper>
          <ion-icon name="search-outline"></ion-icon>
          <SearchBar placeholder="O que você procura?" />
        </SearchWrapper>
      </HeaderWrapper>
    </>
  );
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
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.5vh;
  color: #ffffff;
  font-size: 40px;
`;

const HeaderHighlight = styled.div`
  font-size: 50px;
`;

const SideMenuBody = styled.div`
  width: 65%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: red;
  top: 0;
  left: 0;
  z-index: 3;
`;

const SideMenuShadow = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(4px);
  background-color: #00000070;
  top: 0;
  right: 0;
  z-index: 2;
`;

const DataWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 40vh;
  margin-top: 10vh;
  padding-left: 4vw;
  font-size: 32px;
  color: #dfdfdf;
  font-weight: 500;
  box-sizing: border-box;
`;

const UserContentWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  width: 80%;
  height: 10vh;
  margin-bottom: 25px;
  font-size: 28px;
  box-sizing: border-box;
`;

const Genre = styled.p`
  line-height: 50px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.5vh;
  font-size: 32px;
  color: #ffffff;
  background-color: red;

  div {
    min-height: 24px;
    min-width: 24px;
  }
`;

const SearchBar = styled.input`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  width: 90%;
  height: 3.5vh;
  margin: 0.5vh 0.5vw;
  border: none;

  ::placeholder {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
  }
`;

const FormsWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 5vh;
  margin-top: 25vh;
  box-sizing: border-box;

  input {
    font-family: "Roboto", sans-serif;
    display: flex;
    width: 90%;
    padding: 1vh 2vw;
    margin: 0.75vh 2.25vw;
    font-size: 20px;
    border-radius: 5px;
    border: none;

    ::placeholder {
      font-family: "Roboto", sans-serif;
    }
  }
`;

const AccountMenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: #444444;
  top: 0;
  left: 0;
  z-index: 2;
`;

const AccountButton = styled.div`
  display: flex;
  width: 100px;
  height: 50px;
`;

const InputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  border: 1px solid #454545;
  background-color: #333333;
  height: 50px;
  color: bisque;
  font-family: "Roboto", sans-serif;
  padding: 1vh 2vw;
  margin: 1.25vh 4vw;
  font-size: 20px;
  border-radius: 8px;
  box-sizing: border-box;
`;
