import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function MainCarousel (props) {
    const [carouselData, setCarouselData] = useState(props.arr); 
    const { cartProducts, setCartProducts } = useContext(DataContext);
    const navigate = useNavigate();
    
    function validate(element) {  
    
        const product = {
          quantity: 1,
          image: element.image,
          album: element.album,
          artist: element.artist,
          price: element.price,
          id: element._id,
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
        toast.success("Added to cart.",{
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setCartProducts(newArr);
      }

    return (
        <CarouselWrapper>
            <h2>{props.title}</h2>
            <Carousel>
 
                {carouselData.map(element => 
                    <Item key={element._id}>
                        <img src={element.image} alt={element.album} 
                        onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>
                                {element.artist}
                            </p>
                            <p className="bold">
                                $ {element.price}
                            </p>
                            <ion-icon name="cart-outline" onClick={()=>{validate(element)}}></ion-icon>
                        </div>
                    </Item>)} 
                
            </Carousel>

        </CarouselWrapper>

    );
}

export default MainCarousel;

const CarouselWrapper = styled.div`
    max-width: 100vw;
    margin-top: 30px;

    h2{
        margin: 20px 0 ;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #292929;
    }
    
`;

const Carousel = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none;  
`;

const Item = styled.div`
    width: 250px;
    height: 325px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px 5px 0 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    img{
        width: 240px;
        height: 240px;
        object-fit: fill;
        margin-bottom: 5px;
    }

    .info{  
        height: 70px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    p{
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 14px;
        color: #202020;
    }

    .bold{
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }

    ion-icon{
        font-size: 35px;
        color: #535A53;
        position: absolute;
        right: 15px;
        bottom: 10px;
    }
`;

export function GenreCarousel (props){

    const [carouselData, setCarouselData] = useState(props.arr); 
    const { cartProducts, setCartProducts } = useContext(DataContext);

    function validate(element) {  
    
        const product = {
          quantity: 1,
          image: element.image,
          album: element.album,
          artist: element.artist,
          price: element.price,
          id: element._id,
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
        toast.success("Added to cart.",{
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setCartProducts(newArr);
      }


    const navigate = useNavigate();
    function goTo (param){
        navigate(`/${props.title}`);
    }
    return (
        <GenreWrapper>
            <div className="more">
            <h2>{props.title}</h2><ion-icon name="add-outline" onClick={()=>{goTo(props.title)}}></ion-icon>
            </div>
            <CarouselGenre>

                {carouselData.map(element => 
                    <GenreItem key={element._id} >
                        <img src={element.image} alt={element.album} 
                        onClick={()=>{navigate(`/${element.genre}/${element._id}`)}}/>
                        <div className="info">
                            <p className="bold">
                                {element.album}
                            </p>
                            <p>
                                {element.artist}
                            </p>
                            <p className="bold">
                                $ {element.price}
                            </p>
                            <ion-icon name="cart-outline" onClick={()=>{validate(element)}}></ion-icon>
                        </div>
                    </GenreItem>)} 
                    
            </CarouselGenre>

        </GenreWrapper>

    );


}


const GenreWrapper = styled.div`
    max-width: 100vw;

    .more{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2{
        margin: 20px 0 ;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #292929;
    }
    ion-icon{
        font-size: 28px;
        color: #292929;
    }
`;

const CarouselGenre = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none;  
`;

const GenreItem = styled.div`
    width: 200px;
    height: 275px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    position: relative;

    img{
        width: 190px;
        height: 190px;
        object-fit: fill;
        margin-bottom: 5px;
    }

    .info{  
        height: 70px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    p{
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 14px;
        color: #202020;
    }

    .bold{
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }

    ion-icon{
        position: absolute;
        bottom: 10px;
        right: 15px;
        font-size: 25px;
        color: #6F6F6F;
    }
`;

const MoreItem = styled.div`
    min-width: 60px;
    height: 60px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
    margin:105px 30px;
    box-shadow: 0 3px 9px 0 rgb(213 217 217 / 50%);
   ion-icon{
    font-size: 28px;
    color: #DFDFDF;
   }
`;