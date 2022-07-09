import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_API_URI;
//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

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
        <AccountDescription>Greetings, {data.name}</AccountDescription>
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

function SideMenu({ setDisplay, setAccount, setOperation, Genres, data, setData }) {
  function logout() {
    setDisplay(false);
    setData(null);
    localStorage.removeItem("data")
  }

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
        { data !== null ? <LogoutBox><LogoutButton onClick={logout}>Logout</LogoutButton></LogoutBox> : null }
      </SideMenuBody>
      <SideMenuShadow onClick={() => setDisplay(false)} />
    </>
  );
}

function Login({
  email,
  setEmail,
  password,
  setPassword,
  Button,
  handleSubmit,
}) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input
        value={email}
        type={"e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        title=""
        required
      />
      <input
        value={password}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        title=""
        required
      />
      <Button type={"Submit"} />
    </FormsWrapper>
  );
}

function SignUp({
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
}) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input
        value={name}
        type={"text"}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        pattern="[a-zA-Z]{1,64}"
        title=""
        required
      />
      <input
        value={email}
        type={"e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        title=""
        required
      />
      <input
        value={password}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        title=""
        required
      />
      <input
        value={repeat}
        type={"password"}
        onChange={(e) => setRepeat(e.target.value)}
        placeholder="Re-enter the password"
        title=""
        required
      />
      <Button type={"Submit"} />
    </FormsWrapper>
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
  const [display, setDisplay] = useState(false);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [operation, setOperation] = useState(false);
  const { reqData, productRequest } = useContext(DataContext);
  const { data, setData, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {}, []);

  async function genreNavigate(queryId) {
    const success = await productRequest(queryId);
  }

  async function userLogin(credentials) {
    try {
      const response = await axios.post(`${URL}/user/signin`, credentials);
      if (response.status < 300) {
        localStorage.setItem("data", response.data);
        setData({ ...response.data });
        const token = {
          headers: {
            Authentication: `Bearer ${response.data.token}`,
          },
        };
        setToken(token);
      }
      return;
    } catch (err) {
      return err;
    }
  }

  async function userRegister(credentials) {
    try {
      const response = await axios.post(`${URL}/user/signup`, credentials);
      if (response.status < 300) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("uid", JSON.stringify(response.data._id));
      }
      return;
    } catch (err) {
      return err;
    }
  }

  function handleClick() {
    setAccount(null);
    setEmail("");
    setPassword("");
    setName("");
    setRepeat("");
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
    };
    
    delete data.name;
    delete data.repeat_password;
    await userLogin(data);
    return handleClick();
  }

  const Genres = () => {
    const navigate = useNavigate();
    return (
      <GenreWrapper>
        <Genre onClick={() =>{navigate("/genres"); setDisplay(false)}}>All Categories</Genre>
        {reqData.map((item, index) => (
          <Genre onClick={() => {navigate(`/${item._id}`);
          setDisplay(false)}} key={index}>
            {item._id}
          </Genre>
        ))}
      </GenreWrapper>
    );
  };

  const ShowSideMenu = () =>
    display ? (
      <SideMenu
        setData={setData}
        Genres={Genres}
        data={data}
        setOperation={setOperation}
        setAccount={setAccount}
        setDisplay={setDisplay}
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
        <TopMenu>
          <ion-icon onClick={() => setDisplay(true)} name="menu"></ion-icon>
          <ion-icon name="disc" onClick={()=>{(navigate("/"))}}></ion-icon>
          <HeaderDownscale>
            <ion-icon name="cart-outline"></ion-icon>
          </HeaderDownscale>
        </TopMenu>
        {/* QUANDO O HAMBURGUER DESCER TEM QUE IMPEDIR DO USUARIO APERTAR OS BOTÕES QUE ESTÃO ATRAS */}
        <SearchWrapper>
          <ion-icon name="search"></ion-icon>
          <SearchBar placeholder="What are you looking for?" />
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
  color: #333333;
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
  width: 65%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: #292929;
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
  margin-top: 2.25vh;
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
  color: #dfdfdf;
  width: 80%;
  height: 10vh;
  margin-bottom: 25px;
  font-size: 28px;
  box-sizing: border-box;
`;

const GenreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.25vh;
`

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

const AccountDescription = styled.div`
  display: flex;
  line-height: 38px;
  width: 100px;
  height: 50px;
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
  font-size: 32px;
  color: #DBDBDB;
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
  width: 120px;
  border-radius: 12px;
`

const InputButton = styled.button`
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

const CloseIcon = styled.div`
  position: fixed;
  font-size: 48px;
  top: 1.25vh;
  left: 1.25vw;
  color: #dbdbdb;
`;
