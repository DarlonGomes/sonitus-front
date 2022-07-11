import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { DataContext } from "../../context/DataContext.js";

const URL = process.env.REACT_APP_API_URI;

export default function History () {
    const { history, setHistory } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [ isOpen, setIsOpen ] = useState(false);
   
    const token = JSON.parse(localStorage.getItem("sonitusToken"));


    const Render = () =>{
        if(isLoading){
            return(
                <Container>

                    <h2><Skeleton width={200} height={40} /></h2>
                    <Purchase>
                        <Skeleton width={"100%"} height={160} />
                    </Purchase>

                </Container>
            )
        }
        else{
            return(
                <Container>
                    <h2>History</h2>

                    {history.map(element => <Purchase> 
                        <div className="header">
                            <p className="date">{element.date}</p>
                            <p >{element.addres}</p>
                            <Limiter open={isOpen}>
                                {element.albums.map(e =>
                                <div className="item">
                                <img src={e.image} alt={e.album}/>
                                <div className="info">
                                    <h4>{e.artist}</h4>
                                    <p>{e.album}</p>
                                    <p className="green">$ {e.price}</p>
                                    <p>{e.quantity}</p>
                                </div>
                            </div>)}
                            </Limiter>
                            <div className="footer">
                            <p>Total :</p> <p className="total">{element.value}</p>
                            {isOpen ? <ion-icon name="chevron-up-circle-outline" onClick={()=>{setIsOpen(false)}}></ion-icon> : <ion-icon name="chevron-down-circle-outline" onClick={()=>{setIsOpen(true)}}></ion-icon>}
                        </div>
                        </div>

                    </Purchase>)}

                    <Purchase>
                        <div className="header">
                            <p className="date">11/07</p>
                            <p >Rua do Bilulu, 2000</p>
                        </div>
                        <Limiter open={isOpen}>
                            <div className="item">
                                <img src="https://www.billboard.com/wp-content/uploads/media/ninja-sex-party-press-photo-2018-cr-Fernando-Escovar-billboard-1548.jpg" alt="NSP"/>
                                <div className="info">
                                    <h4>Ninja Sex Party</h4>
                                    <p>Cool Patrol</p>
                                    <p className="green">$ 27.83</p>
                                </div>
                            </div>
                            <div className="item">
                                <img src="https://www.billboard.com/wp-content/uploads/media/ninja-sex-party-press-photo-2018-cr-Fernando-Escovar-billboard-1548.jpg" alt="NSP"/>
                                <div className="info">
                                    <h4>Ninja Sex Party</h4>
                                    <p>Cool Patrol</p>
                                    <p className="green">$ 27.83</p>
                                </div>
                            </div>
                            <div className="item">
                                <img src="https://www.billboard.com/wp-content/uploads/media/ninja-sex-party-press-photo-2018-cr-Fernando-Escovar-billboard-1548.jpg" alt="NSP"/>
                                <div className="info">
                                    <h4>Ninja Sex Party</h4>
                                    <p>Cool Patrol</p>
                                    <p className="green">$ 27.83</p>
                                </div>
                            </div>
                        </Limiter>
                        <div className="footer">
                            <p>Total :</p> <p className="total">$83.49</p>
                            {isOpen ? <ion-icon name="chevron-up-circle-outline" onClick={()=>{setIsOpen(false)}}></ion-icon> : <ion-icon name="chevron-down-circle-outline" onClick={()=>{setIsOpen(true)}}></ion-icon>}
                        </div>
                        
                    </Purchase>

                </Container>
            )
        }
    }


    async function getHistory(token) {
        if (token === null) {
          return;
        }
        try {
          const response = await axios.get(`${URL}/history`, token);
          setHistory(response.data);
          setTimeout(setIsLoading(false), "1000");
          return;
        } catch (error) {
          console.log(error);
        }
      }


    useEffect(()=>{
        getHistory(token)
    },[])

    return(
        <Render/>
    )
    
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #DFDFDF;
  padding: 0 20px 30px;
  margin-top: 120px;
  background-color: #dfdfdf;
  flex: 1;
  z-index: 0;

  h2 {
    margin: 30px 0 20px;
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

const Purchase = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    
    h4{
        font-family: "Jost";
        font-size: 22px;
        font-weight: 500;
        color: #292929;
        margin-bottom: 10px;
    }
    p{
    font-family: "Jost";
    font-size: 18px;
    font-weight: 400;
    color: #292929;
    margin: 0;
    }

    .green{
        color: green;
        font-size: 20px;
        font-weight: 500;
        position: absolute;
        bottom: 20px;
    }


    .header{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid gray;
        position: relative;
    }
    .footer{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-top: 1px solid #DFDFDF;
        position: relative;
    }

    .total{
        margin-left: 15px;
        color: green;
    }

    .item{
        width: 100%;
        height: 160px;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid gray;
        position: relative;
    }

    img{
        width: 150px;
        height: 150px;
        object-fit: fill;
    }

    .info{
        height: 110px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ion-icon{
        position: absolute;
        right: 7px;
        font-size: 25px;
    }
    .date{
        position: absolute;
        left: 10px;
    }

    
`;

const Limiter = styled.div`
    height: ${(props) => props.open ? "auto" : "160px"};
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: ${(props) => props.open ? "none" : "hidden"};
`;