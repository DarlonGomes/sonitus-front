import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import CartItem from "../shared/CartItem";
import { InputButton, CloseIcon } from "../shared/Header";
import { FormsWrapper } from "../../handlers/loginHandlers";

const URL = process.env.REACT_APP_API_URI;

function PaymentForms({
  handleClick,
  address,
  setAddress,
  cardNumber,
  setCardNumber,
  handleSubmit
}) {
  return (
    <FormsContainer>
      <FormsWrapper onSubmit={handleSubmit}>
        <BrightIcon onClick={handleClick}>
          <ion-icon name="close"></ion-icon>
        </BrightIcon>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={"Delivery address"}
          type={"text"}
          required
        />
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder={"Payment method number"}
          type={"text"}
          pattern={"[0-9]{16}"}
          maxLength={16}
          required
        />
        <InputButton type={"Submit"}>Confirm and Send</InputButton>
      </FormsWrapper>
    </FormsContainer>
  );
}

export default function Checkout() {
  const { dataRequest, reqData } = useContext(DataContext);
  // const [test, setTest] = useState(null);
  const [cart, setCart] = useState([]);
  const [forms, setForms] = useState(false);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    product();
    dataRequest();
  }, []);

  // {
  //   "_id": "62c6cc06067e3e346a1ca89e",
  //   "artist": "Judy Garland",
  //   "album": "Miss Show Business",
  //   "image": "https://m.media-amazon.com/images/I/613waHj+QoS._SY355_.jpg",
  //   "genre": "Pop",
  //   "tags": "",
  //   "embed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/album/0uramtIEMZmRFjozebnomm?utm_source=generator' width='100%' height={heigth} frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>",
  //   "description": "Judy Garland's Miss Show Business was originally released in 1955 through Capitol Records and the album peaked at No. 5 on the Billboard 200. Universal Music Enterprises is now issuing the 60th Anniversary Edition, remastered on 180 gram vinyl, with notes by Lorna Luft.",
  //   "price": 102.71,
  //   "access": 0,
  //   "stock": 100
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const cart = [
      {
        _id: "62c6cc06067e3e346a1ca89e",
        artist: "Judy Garland",
        album: "Miss Show Business",
        price: 102.71,
        quantity: 1,
      },
    ];
    const userEmail = JSON.parse(localStorage.getItem("data")).email
    const token = JSON.parse(localStorage.getItem("token"));
    const requisitionData = {
      address: address,
      cardNumber: cardNumber,
      email: userEmail,
      data: cart
    }
    setAddress("");
    setCardNumber("");
    console.log(requisitionData);
    try {
      // const response = await axios.post(`${URL}/aonde???`, requisitionData, token)
      const response = await axios.post(`http://localhost:5000/checkout`, requisitionData, token)
      console.log(response);
    } catch(err) {
      return err;
    }
  }

  function handleClick() {
    setForms(false);
  }

  const product = async () => {
    // isso muda totalmente, as requisições são enviadas ao servidor quando o usuario clica em add ao carrinho
    // e tambem sao salvas no local storage, na hora do checkout, se le do local não da API
    // se o localstorage ta vazio, entao a req busca o dado do carrinho do usuario
    // const response = await axios.get(
    //   `${URL}/products/?id=62c83418460101f3304370f9`
    // );
    // console.log(response.data[0]);
    // setTest(response.data[0]);
  };

  const ShoppingList = () => {
    return cart.length > 0 && cart.map((item) => <CartItem isCheckout={true} props={item} /> )
  }

  function verifyLoginAndProceed() {
    // varre o local storage por token, se achou, carrega pagina de pagamentos, senão da um erro
    const token = JSON.parse(localStorage.getItem("token"));
    if (token === null) {
      alert("!");
      return;
    }
    setForms(true);
  }
  // o return vai ser um map do item carrinho no localstorage/requisição de servidor
  return (
    <Container>
      {forms && (
        <PaymentForms
          handleClick={handleClick}
          setAddress={setAddress}
          setCardNumber={setCardNumber}
          address={address}
          cardNumber={cardNumber}
          handleSubmit={handleSubmit}
        />
      )}
      <ContentWrapper>
        <ShoppingList />
      </ContentWrapper>
      <Info>
        <p>N items</p>
        <p>M moneys</p>
      </Info>
      <CheckoutButton onClick={verifyLoginAndProceed}>
        Payment & Address
      </CheckoutButton>
    </Container>
  );
}

const Container = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 80vh;
  max-height: 90vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5px;
  padding: 2.5%;
  padding-top: 15vh;
  align-items: center;
  box-sizing: border-box;
  background-color: #d4d4d4;
  border-radius: 2px;
`;

const FormsContainer = styled(Container)`
  && {
    min-height: 100vh;
    max-height: 100vh;
    padding: 2.5%;
    background-color: #d4d4d4;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
`;

const ContentWrapper = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 40vh;
  max-height: 50vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-radius: 3px;
`;

const Info = styled.div`
  width: 100%;
  height: 75px;
  line-height: 50px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  p {
    font-family: "Jost";
    font-size: 28px;
  }
`;

const CheckoutButton = styled.div`
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #e4e4e4;
  box-shadow: 3px 2px 0px 1px #33333335;
  color: #393939;
  font-size: 36px;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
`;

const BrightIcon = styled(CloseIcon)`
  && {
    left: unset;
    right: 1.25vw;
    color: #ffffff;
  }
`;
