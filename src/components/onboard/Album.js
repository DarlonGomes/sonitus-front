import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const URL = process.env.REACT_APP_API_URI;

export default function Album() {
  const { id } = useParams();
  const { dataRequest, setCartProducts, cartProducts } =
    useContext(DataContext);
  const [albumData, setAlbumData] = useState();
  const [spotify, setSpotify] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const [limit, setLimit] = useState();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(`${URL}/products/?id=${id}`);
      setAlbumData(response.data[0]);
      setSpotify(response.data[0].embed);
      setLimit(response.data[0].stock);
      setTimeout(setIsLoading(false), "1000");
    } catch (error) {
      console.log(error);
    }
  };

  function validate(event) {
    event.preventDefault();

    if (number > limit) {
      toast.error("Quantity exceed our stock.", {
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

    const product = {
      quantity: number,
      image: albumData.image,
      album: albumData.album,
      artist: albumData.artist,
      price: albumData.price,
      id: albumData._id,
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

    setCartProducts(newArr);
  }

  const Render = () => {
    if (isLoading) {
      return (
        <Container>
          <Skeleton width={300} height={300} />
        </Container>
      );
    } else {
      return (
        <>
          <ToastContainer />
          <Container>
            <h2>{albumData.album}</h2>
            <p> {albumData.artist}</p>
            <AlbumInfo>
              <img src={albumData.image} alt={albumData.album} />
              <div className="info">
                <Quantity onSubmit={(event) => validate(event)}>
                  <div className="inputWrapper">
                    <div
                      className="decrease"
                      onClick={() => {
                        setNumber(number - 1);
                      }}
                    >
                      <ion-icon name="remove-outline"></ion-icon>
                    </div>
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.number)}
                      required
                      disabled={false}
                      min={1}
                    ></input>
                    <div
                      className="increase"
                      onClick={() => {
                        setNumber(number + 1);
                      }}
                    >
                      <ion-icon name="add-outline"></ion-icon>
                    </div>
                  </div>
                  <button type="submit">Add to cart</button>
                </Quantity>
              </div>
            </AlbumInfo>
            <h2>Description</h2>
            <DescriptionText>
              <p>{albumData.description}</p>
            </DescriptionText>
            <h2>Listen</h2>
            <AlbumSample dangerouslySetInnerHTML={{ __html: spotify }} />
          </Container>
        </>
      );
    }
  };

  useEffect(() => {
    dataRequest();
    getData();
  }, []);
  return <Render />;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 0 20px 30px;
  margin-top: 120px;
  background-color: #dfdfdf;
  flex: 1;
  z-index: 0;

  h2 {
    margin: 30px 0 10px;
    font-family: "Jost";
    font-size: 28px;
    font-weight: 700;
    color: #292929;
    z-index: 0;
  }

  p {
    margin: 0 0 15px;
    font-family: "Jost";
    font-size: 25px;
    font-weight: 400;
    color: #292929;
    z-index: 0;
  }
`;

const AlbumInfo = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  justify-content: space-between;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  img {
    width: 200px;
    height: 200px;
    object-fit: fill;
  }

  .info {
    width: 100%;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-family: "Roboto";
    font-size: 24px;
    font-weight: 500;
    color: #292929;
    margin-bottom: 15px;
    z-index: 0;
    text-align: center;
  }
`;

const AlbumSample = styled.div``;

const DescriptionText = styled.div`
  width: 100%;
  height: auto;
  padding: 5px 5px 0;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  p {
    font-family: "Jost";
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
  }
`;

const Quantity = styled.form`
  .increase {
    width: 35px;
    height: 35px;
    background-color: gray;
    border-radius: 0 25px 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .decrease {
    width: 35px;
    height: 35px;
    background-color: gray;
    border-radius: 25px 0 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inputWrapper {
    display: flex;
    flex-direction: row;
  }
  input {
    height: 35px;
    width: 35px;
    background-color: gray;
    box-sizing: border-box;
    text-align: center;
    border: none;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }

  button {
    width: 105px;
    height: 35px;
    border-radius: 17.5px;
    margin-top: 5px;
    background-color: green;
    border: none;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }

  ion-icon {
    font-size: 20px;
    color: #ffffff;
  }
`;
