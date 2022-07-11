import axios from "axios";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import { Login, SignUp } from "../../handlers/loginHandlers.js";
import { EmptyCart, CartItem } from "./CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = process.env.REACT_APP_API_URI;

// PENSAR EM COMPONENTIZAR EXTERNAMENTE A PARTIR DAQUI
function AccountActions({ setAccount, setDisplay, setOperation }) {
  function handleClick(flag) {
    setDisplay(false);
    setAccount(true);
    setOperation(flag);
  }

  return (
    <>
      <AccountDescription onClick={() => handleClick(true)}>
        Login
      </AccountDescription>
      <AccountDescription onClick={() => handleClick(false)}>
        Signup
      </AccountDescription>
    </>
  );
}

function AccountMenu({ data, setAccount, setDisplay, setOperation }) {
  return (
    <UserContentWrapper>
      {data !== null ? (
        <AccountDescription>
          Greetings,
          <br />
          {data.name}
        </AccountDescription>
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

function SideMenu({
  setDisplay,
  setAccount,
  setOperation,
  Genres,
  data,
  setData,
  setIsCart,
  cart,
  token,
}) {
  const { cartProducts, history } = useContext(DataContext);
  const navigate = useNavigate();

  function logout() {
    setDisplay(false);
    setData(null);
    localStorage.removeItem("sonitusData");
    localStorage.removeItem("sonitusToken");
    toast.info("Logout made successfully.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const MenuData = () => {
    return (
      <>
        <DataWrapper cart={cart}>
          <AccountMenu
            data={data}
            setOperation={setOperation}
            setDisplay={setDisplay}
            setAccount={setAccount}
            setData={setData}
          />
          <Genres />
        </DataWrapper>
        {data !== null ? (
          <LogoutBox>
            <LogoutButton onClick={logout}>
              <ion-icon name="log-out-outline"></ion-icon>
            </LogoutButton>
          </LogoutBox>
        ) : null}
      </>
    );
  };

  function handleClick() {
    setAccount(true);
    setOperation(true);
    setIsCart(false);
  }

  function isLoggedIn(token) {
    if (token !== null) {
      return true;
    }
    return false;
  }

  function isCartEmpty() {
    if(cartProducts.length !== 0) {
      navigate('/checkout')
      return;
    }
    toast.info("Cart is empty.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }

  const CheckoutButton = () => <div onClick={isCartEmpty}> Go to Checkout <h1><ion-icon name="cart-outline"></ion-icon></h1></div>

  const LoginButton = () => <>
  <div onClick={handleClick} >Login<h1><ion-icon name="enter-outline"></ion-icon></h1></div>
  <p>You need to Log In to checkout</p>
  </>

  const HistoryData = () => {
    if (history) {
      return (
        <>
          {history.map((element, index) => (
            <p key={index}> {element.albums}</p>
          ))}
        </>
      );
    } else {
      return <EmptyCart isHistory={true} />;
    }
  };
  const CartData = ({ setDisplay }) => {
    if (cartProducts.length < 1) {
      return (
        <>
        <DataWrapper cart={cart}>
          <EmptyCart />
        </DataWrapper>
        <Checkout >
          { isLoggedIn(token) ? <CheckoutButton /> : <LoginButton /> }
        </Checkout>
        
      </>
      )
      }else{
      return (
        <>
          <DataWrapper cart={cart}>
            {cartProducts.map((e, index) => (
              <CartItem key={e._id} index={index} props={e} setDisplay={setDisplay} />
            ))}
          </DataWrapper>
          <Checkout>
            { isLoggedIn(token) ? <CheckoutButton /> : <LoginButton /> }
          </Checkout>
         
        </>
      );
    }
  };

  return (
    <>
      <SideMenuBody cart={cart}>
        {cart ? <CartData setDisplay={setDisplay} /> : <MenuData />}
      </SideMenuBody>
      <SideMenuShadow
        onClick={() => (cart ? setIsCart(false) : setDisplay(false))}
      />
    </>
  );
}

function MenuCover({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  repeat,
  setRepeat,
  Button,
  handleSubmit,
  setAccount,
  operation,
}) {
  function handleClick() {
    setAccount(null);
    setEmail("");
    setPassword("");
    setName("");
    setRepeat("");
  }

  return (
    <AccountMenuWrapper>
      <CloseIcon onClick={handleClick}>
        <ion-icon name="close"></ion-icon>
      </CloseIcon>
      {operation ? (
        <Login
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          Button={Button}
        />
      ) : (
        <SignUp
          handleSubmit={handleSubmit}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setRepeat={setRepeat}
          name={name}
          email={email}
          password={password}
          repeat={repeat}
          Button={Button}
        />
      )}
    </AccountMenuWrapper>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [account, setAccount] = useState(null);
  const [isCart, setIsCart] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [operation, setOperation] = useState(false);
  const { reqData, setHistory } = useContext(DataContext);
  const { data, setData, userLoadFromLocal } = useContext(UserContext);
  const [ searchInput, setSearchInput] = useState("");
  

  useEffect(() => {
    autoLogin();
    const key = JSON.parse(localStorage.getItem("sonitusToken"));
    if (key) {
      getHistory(key);
    }
  }, []);

  async function getHistory(token) {
    if(token === null) {
      return;
    }
    try {
      const response = await axios.get(`${URL}/history`, token);
      setHistory(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  async function userLogin(credentials) {
    try {
      const response = await axios.post(`${URL}/user/signin`, credentials);
      if (response.status < 300) {
        const localData = {
          email: credentials.email,
          name: response.data.name,
        };
        localStorage.setItem("sonitusData", JSON.stringify(localData));
        setData({ ...response.data });
        const token = {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        };
        localStorage.setItem("sonitusToken", JSON.stringify(token));
      }
      return;
    } catch (err) {
      return err;
    }
  }

  async function userRegister(credentials) {
    try {
      const response = await axios.post(`${URL}/user/signup`, credentials);

      return;
    } catch (err) {
      return err;
    }
  }

  function autoLogin() {
    const localData = JSON.parse(localStorage.getItem("sonitusData"));
    const localToken = JSON.parse(localStorage.getItem("sonitusToken"));
    if (localData && localToken) {
      setData(localData);
    }
  }

  function handleClick() {
    setAccount(null);
    setEmail("");
    setPassword("");
    setName("");
    setRepeat("");
  }

  async function search(event){
    event.preventDefault();

    try {
      const response = await axios.get(`${URL}/search/${searchInput}`);
      setSearchInput("");

    } catch (error) {
      
    }

    navigate(`/search/${searchInput}`)
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
      repeat_password: repeat,
    };
    if (data.name !== "") {
      await userRegister(data);
      return handleClick();
    }

    delete data.name;
    delete data.repeat_password;
    await userLogin(data);
    return handleClick();
  }

  const Genres = () => {
    return (
      <GenreWrapper>
        <Genre
          onClick={() => {
            navigate("/genres");
            setDisplay(false);
          }}
        >
          All Categories
        </Genre>
        {reqData.map((item, index) => (
          <Genre
            className="type"
            onClick={() => {
              navigate(`/${item._id}`);
              setDisplay(false);
            }}
            key={index}
          >
            {item._id}
          </Genre>
        ))}
      </GenreWrapper>
    );
  };

  const ShowCartMenu = () =>
    isCart ? (
      <SideMenu
        cart={true}
        setData={setData}
        Genres={Genres}
        data={data}
        setOperation={setOperation}
        setAccount={setAccount}
        setIsCart={setIsCart}
        token={JSON.parse(localStorage.getItem("sonitusToken"))}
      />
    ) : null;

  const ShowSideMenu = () =>
    display ? (
      <SideMenu
        cart={false}
        setData={setData}
        Genres={Genres}
        data={data}
        setOperation={setOperation}
        setAccount={setAccount}
        setDisplay={setDisplay}
        token={JSON.parse(localStorage.getItem("sonitusToken"))}
      />
    ) : null;

  const Button = () =>
    operation ? (
      <InputButton>Login</InputButton>
    ) : (
      <InputButton>Register</InputButton>
    );

  return (
    <>
      <ShowSideMenu />
      <ShowCartMenu />
      {account === null ? null : (
        <MenuCover
          handleSubmit={handleSubmit}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setRepeat={setRepeat}
          name={name}
          email={email}
          password={password}
          repeat={repeat}
          operation={operation}
          Button={Button}
          setAccount={setAccount}
        />
      )}
      <HeaderWrapper>
        <ToastContainer />
        <TopMenu>
          <ion-icon onClick={() => setDisplay(true)} name="menu"></ion-icon>
          <ion-icon onClick={() => navigate("/")} name="disc"></ion-icon>
          <HeaderDownscale>
            <ion-icon
              onClick={() => setIsCart(true)}
              name="cart-outline"
            ></ion-icon>
          </HeaderDownscale>
        </TopMenu>
        {/* QUANDO O HAMBURGUER DESCER TEM QUE IMPEDIR DO USUARIO APERTAR OS BOTÕES QUE ESTÃO ATRAS */}
        <SearchWrapper>
          <ion-icon name="search"></ion-icon>
          <form onSubmit={(event)=>search(event)}>
          <SearchBar type="text" onChange={e=> setSearchInput(e.target.value)} value={searchInput} placeholder="What are you looking for?" />
          <ion-icon name="send" type="submit"></ion-icon>
          </form>
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
  background-color: #292929;
  box-sizing: border-box;
  z-index: 1;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.5vh;
  color: #ffffff;
  font-size: 50px;

  * {
    height: 50px;
    width: 50px;
  }
`;

const HeaderDownscale = styled.div`
  font-size: 40px;
  display: flex;
`;

const SideMenuBody = styled.div`
  width: ${({ cart }) => (!cart ? "65%" : "75%")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: #292929;
  top: 0;
  ${({ cart }) => (!cart ? { left: 0 } : { right: 0 })}
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
  ${({ cart }) => (cart ? { left: 0 } : { right: 0 })}
  z-index: 2;
`;

const DataWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ cart }) => (cart ? "flex-end" : "flex-start")};
  width: 100%;
  height: ${({ cart }) => (cart ? "80vh" : "40vh")};
  margin-top: 2.25vh;
  ${({ cart }) => (cart ? "padding-right: 3vw" : "padding-left: 3vw")};
  ${({ cart }) => (cart ? "padding-left: 1vw" : "padding-right: 1vw")};
  font-size: 32px;
  color: #dfdfdf;
  font-weight: 500;
  box-sizing: border-box;
  ${({ cart }) => (cart ? "overflow-y: scroll" : null)};
`;

const UserContentWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  color: #dfdfdf;
  width: 95%;
  height: 10vh;
  margin-bottom: 25px;
  font-size: 28px;
  box-sizing: border-box;
`;

const GenreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.25vh;

  .type {
    font-size: 24px;
  }
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
  color: #292929;
  background-color: #ffffff;
  border: none;
  padding: 0 5px;
  border-radius: 5px;
  box-sizing: border-box;

  div {
    min-height: 24px;
    min-width: 24px;
  }
  form{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SearchBar = styled.input`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  width: 90%;
  height: 3.5vh;
  margin: 0.5vh 1vw;
  border: none;

  ::placeholder {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
  }

  :focus {
    outline: none;
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

const AccountDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 38px;
  width: 100%;
  height: 100px;
`;

const LogoutBox = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 40vh;
  margin-bottom: 15vh;
  padding-left: 4vw;
  font-size: 36px;
  color: #dbdbdb;
  font-weight: 500;
  box-sizing: border-box;
`;

const LogoutButton = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid #454545;
  background-color: #333333;
  height: 50px;
  width: 50px;
  font-size: 36px;
  border-radius: 12px;
`;

export const InputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  border: 1px solid #454545;
  background-color: #292929;
  height: 50px;
  color: #dfdfdf;
  font-family: "Roboto", sans-serif;
  padding: 1.25vh 2vw;
  margin: 1.25vh 4vw;
  font-size: 24px;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const CloseIcon = styled.div`
  position: fixed;
  font-size: 48px;
  top: 1.25vh;
  left: 1.25vw;
  color: #dbdbdb;
`;

const Checkout = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  font-size: 36px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 60%;
    height: 50px;
    font-size: 20px;
    color: #dfdfdf;
    background-color: #008c02;
    border: 1px solid #00a302;
  }

  h1 {
    font-size: 28px;
  }

  p {
    line-height: 25px;
    margin-top: 5px;
    width: 60%;
    font-size: 20px;
    color: #dfdfdf;
  }
`;
