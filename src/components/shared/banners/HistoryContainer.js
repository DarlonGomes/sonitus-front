import styled from "styled-components";
import { useState } from "react";

export default function Wrapper (props){
    const [ isOpen, setIsOpen ] = useState(false);
    const [data , setData] = useState(props.element)


    return(
        
         <Purchase> 
            <div className="header">
                <p className="date">{data.date}</p>
                <p>{data.addres}</p>
            </div>
            <Limiter open={isOpen}>
                {data.albums.map(album => <div className="item">
                    <img src={album.image} alt={album.album} />
                    <div className="info">
                        <h4>{album.artist}</h4>
                        <p>{album.album}</p>
                        <div className="wrapper">
                        <p className="qty">Qty:{album.quantity}</p>
                        <p className="green">$ {album.price}</p>
                        </div>
                    </div>
                </div>)}
            </Limiter>
            <div className="footer">
                <p>Total:</p>
                <p className="total">{data.value.toFixed(2)}</p>
                {isOpen ? <ion-icon name="chevron-up-circle-outline" onClick={()=>{setIsOpen(false)}}></ion-icon> : <ion-icon name="chevron-down-circle-outline" onClick={()=>{setIsOpen(true)}}></ion-icon>}
            </div>
        </Purchase>
        
    )
}
const Purchase = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
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
        
    }
    .qty{
        font-size: 18px;
    }
    .wrapper{
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 40px;
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
`