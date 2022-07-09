import styled from "styled-components";
//import axios from "axios";
//import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

function Footer (){
    return (
        <FooterWrapper>
            <InfoBox>
                <div className="wrapper">
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <h4>ABOUT US</h4>
                    </a> 
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </InfoBox>
            <InfoBox>
                <div className="wrapper">
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <h4>GIFT CARDS</h4>
                    </a> 
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </InfoBox>
            <InfoBox>
                <div className="wrapper">
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <h4>PROMO CODES</h4>
                    </a> 
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </InfoBox>
            <InfoBox>
                <div className="wrapper">
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <h4>HELP</h4>
                    </a> 
                    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </InfoBox>
            <MediaWrapper>
            <div className="nav-social">
            <a href="https://facebook.com/RickAstley" title="Facebook Nike" target="_blank" rel="noopener noreferrer">
            <img src="https://images.lojanike.com.br/site/ni/icones/facebook.svg"/>
            </a>
            </div>
            <div className="nav-social">
                <a href="https://youtu.be/dQw4w9WgXcQ" title="YouTube Nike" target="_blank" rel="noopener noreferrer">
                <img src="https://images.lojanike.com.br/site/ni/icones/youtube.svg"/>
                </a>
            </div>
            <div className="nav-social">
                <a href="https://www.instagram.com/officialrickastley/" title="Instagram Nike" target="_blank" rel="noopener noreferrer">
                <img src="https://images.lojanike.com.br/site/ni/icones/instagram.svg"/>
                </a>
            </div>
            </MediaWrapper>
            <PolicyInfo>
            <p>Galaxy</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            </PolicyInfo>
            <LastInfo>
                <p>© 2022 Sonitus. All reserved rights . Sonitus Trade in Musical Products and Antiques Ltda - CNPJ: 66.666.666/6666-66<br/>
                 Starway to Heaven, S/N 7000Km  - Module Shed 666 - CEP 99999-999 - Heaven - Sky
                </p>
            </LastInfo>
        </FooterWrapper>
    )
}

export default Footer;

const FooterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoBox = styled.div`
    width: 100%;
    height: 52px;
    background-color: #111111;
    border-bottom: 2px solid #202020;
    box-sizing: border-box;
    padding: 0 35px;
    display: flex;
    align-items: center;

    .wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h4{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 18px;
        color: #DFDFDF;
    }

    ion-icon{
        color: #DFDFDF;
        font-size: 18px;
    }

    a{
        text-decoration: none;
    }
`;

const MediaWrapper = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    border-bottom: 1px solid #202020;
    justify-content: center;
    align-items: center;
    background-color: #111111;

    .nav-social{
        width: 40px;
        height: 24px;
    }
`;

const PolicyInfo = styled.div`
    width: 100%;
    height: 52px;
    background-color: #111111;
    border-bottom: 1px solid #202020;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    p{
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 300;
        color: #DFDFDF;
    }
`;

const LastInfo = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #292929;
    padding: 15px;
    background-color: #292929;

    p{
        font-family: 'Roboto';
        font-size: 12px;
        font-weight: 300;
        color: #8D8D8D;
        text-align: center;
    }
`;