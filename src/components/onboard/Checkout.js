import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem } from "../shared/CartItem";
import { InputButton, CloseIcon } from "../shared/Header";
import { FormsWrapper } from "../../handlers/loginHandlers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  const { dataRequest, cartProducts, setCartProducts } = useContext(DataContext);
  const [cart, setCart] = useState(cartProducts);
  const [forms, setForms] = useState(false);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    dataRequest();
  }, [cartProducts]);

  async function handleSubmit(e) {
    e.preventDefault();
    const userEmail = JSON.parse(localStorage.getItem("sonitusData")).email
    const token = JSON.parse(localStorage.getItem("sonitusToken"));
    const requisitionData = {
      address: address,
      cardNumber: cardNumber,
      email: userEmail,
      data: cart
    }
    console.log(requisitionData, token, cart);
    setAddress("");
    setCardNumber("");
    try {
      const response = await axios.post(`${URL}/checkout`, requisitionData, token)
      // const response = await axios.post(`http://localhost:5000/checkout`, requisitionData, token)
      setCartProducts([]);
      setCart([])
      setForms(false);
    } catch(err) {
      console.log(err.response.data)
      return err;
    }
  }

  function handleClick() {
    setForms(false);
  }

  const ShoppingList = () => {
    return cart.length > 0 && cart.map((item, index) => <CartItem key={index} isCheckout={true} props={item} /> )
  }

  const ShoppingInfo = () => {
    let items = 0;
    let value = 0;
    cart.length > 0 &&
      cart.map((item) => {
        items += 1 * item.quantity;
        value += item.quantity * item.price;
        return item;
      });
    return (
      <Info>
        <p>{items} item(s)</p>
        <p>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value)}
        </p>
      </Info>
    );
  };

  function isCartEmpty() {
    if(cartProducts.length === 0) {
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
      return false;
    }
    return true;
  }

  function isTokenEmpty() {
    const token = JSON.parse(localStorage.getItem("sonitusToken"));
    if (token === null) {
      toast.info("Login is required.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    return true;
  }

  function verifyLoginAndProceed() {
    if(isCartEmpty() && isTokenEmpty()) {
      setForms(true);
      return;
    }
    return;
  }
  return (
    <Container>
      <ToastContainer />
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
        <ShoppingInfo />
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
  min-height: 45vh;
  max-height: 45vh;
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

  p:last-child {
    color: green;
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
