import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import CartItem from "../shared/CartItem";
import { FormsWrapper, InputButton, CloseIcon } from "../shared/Header";

const URL = process.env.REACT_APP_API_URI;

function PaymentForms({
  handleClick,
  address,
  setAddress,
  cardNumber,
  setCardNumber,
}) {
  return (
    <FormsContainer>
      <FormsWrapper>
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
  const [test, setTest] = useState(null);
  const [cart, setCart] = useState([]);
  const [forms, setForms] = useState(false);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    product();
    dataRequest();
  }, []);

  async function handleClick(e) {
    e.preventDefault();
    setForms(false);
    const token = JSON.parse(localStorage.getItem("token"));
    const requisitionData = {
      address: address,
      cardNumber: cardNumber,
      data: cart
    }
    setAddress("");
    setCardNumber("");
    try {
      const response = await axios.post(`${URL}/aonde???`, requisitionData, token)
      console.log(response);
    } catch(err) {
      return err;
    }
  }

  const product = async () => {
    // isso muda totalmente, as requisições são enviadas ao servidor quando o usuario clica em add ao carrinho
    // e tambem sao salvas no local storage, na hora do checkout, se le do local não da API
    // se o localstorage ta vazio, entao a req busca o dado do carrinho do usuario
    const response = await axios.get(
      `${URL}/products/?id=62c83418460101f3304370f9`
    );
    console.log(response.data[0]);
    setTest(response.data[0]);
  };

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
        />
      )}
      <ContentWrapper>
        {test && <CartItem isCheckout={true} props={test} />}
        {test && <CartItem isCheckout={true} props={test} />}
        {test && <CartItem isCheckout={true} props={test} />}
        {test && <CartItem isCheckout={true} props={test} />}
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
