import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

//import { UserContext } from "../../context/UserContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import MainCarousel from "../shared/Carousel";
import SmallBanner from "../shared/banners/smallBanner";
import MainBanner from "../shared/banners/bigBanner";


const URL=process.env.REACT_APP_API_URI;

export default function Home (){
    const { dataRequest, reqData } = useContext(DataContext);
    const [ isLoading, setIsLoading] = useState(true);
    const [albumRequest, setAlbumRequest] = useState(null)
    
    
    const getData = async() =>{
        try {
            const response = await axios.get(`${URL}/products/?home=all`);
            setAlbumRequest(response.data);
            setTimeout(()=>setIsLoading(false), "1000");
        } catch (error) {
            console.log(error);
        }
    }

    const Render = () => {
        if(isLoading){
            return(
                <>
                <BigScreen>
                    <h2> S  O  N  I  T  U  S</h2>
                    <h3>The old pleasure of <br/>listening is back</h3>
                </BigScreen>
                <Container>
                    <h2><Skeleton width={200} height={30}/></h2>
                    <Loader>
                        <Skeleton  height={450} />
                    </Loader>
                    <Loader>
                        <Skeleton  height={450} />
                    </Loader>
                    <LoadCarousel>
                        <div className="title"><Skeleton width={200} height={30}/></div>
                        <div className="carousel">
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        </div>
                    </LoadCarousel>
                    <Loader>
                        <div className="small">
                        <Skeleton height={250} />
                        </div>
                    </Loader>
                    <LoadCarousel>
                        <div className="title"><Skeleton width={200} height={30}/></div>
                        <div className="carousel">
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        <div className="item">
                            <Skeleton width={250} height={320}/>
                        </div>
                        </div>

                    </LoadCarousel>
                    <Loader>
                        <div className="small">
                        <Skeleton height={250} />
                        </div>
                    </Loader>
                </Container>
                
                </>
            )
        }
        else{
            return(
                <>
                <BigScreen>
                    <h2> S  O  N  I  T  U  S</h2>
                    <h3>The old pleasure of <br/>listening is back</h3>
                </BigScreen>
                <Container>
                    <h2>Our Selection</h2>
                    <MainBanner title="Gigg's code playlist" image="https://i.pinimg.com/originals/77/dd/b9/77ddb90eee4b413ecdbf6b624315928c.png" id="giggs"/>
                    <MainBanner title="Chico's odd playlist" image="https://yt3.ggpht.com/ytc/AKedOLRCU7jn-QSPH2EVwGiT7sSjDvdsPfX3svE9n_CAbg=s900-c-k-c0x00ffffff-no-rj" id="Chico"/>
        
                    <MainCarousel title="Best Seller" arr={albumRequest.best}/>
                    
                    <SmallBanner text="Run To The Hills" image="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/04/iron-maiden-ft-lauderdale-2019-jmc-53197.jpg" genre="Rock" id="62c8a93f9088872ba4856467"/>
                    
                    <MainCarousel title="Discover" arr={albumRequest.discover}/>
                </Container>
                </>
            )
        }


    }
    useEffect(() => {
        dataRequest();
        getData();
        // eslint-disable-next-line
    }, [])

    return(
        <>
        <Render/>
        </>
    )
}


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 0 20px;

    h2{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #000000;
        z-index: 0;
    }
`;


const BigScreen = styled.div`
    
    width: 100%;
    height: 400px;
    background-image: url("https://secureservercdn.net/45.40.152.13/e5f.02f.myftpupload.com/wp-content/uploads/2018/12/MonostereoVinyl.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 400px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;

    
    h3{ 
        margin-top: 20px;
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 400;
        color: #DFDFDF;
        text-align: center;
    }

    h2{
        margin-top: 250px;
        font-family: 'Roboto';
        font-size: 24px;
        font-weight: 700;
        color: #C79A00;
        text-align: center;
        text-shadow: 10px 4px 5px rgba(0, 0, 0, 0.3);
    }

`;


const LoadCarousel = styled.div`
    max-width: 100vw;
    margin-top: 30px;
    z-index: 0;
    .title{
        margin: 20px 0;
    }
    .carousel{
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    }
    .item{
        width: 250px;
        height: 320px;
        margin: 0 5px;
    }

`;

const Loader = styled.div`
    max-width: 100vw;
    height: auto;
    z-index: 0;
    margin: 5px 0;

    .small{
        margin: 50px auto 10px;
    }
`;