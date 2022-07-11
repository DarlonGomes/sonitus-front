import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { toast, ToastContainer } from "react-toastify";
import Spotify from "react-spotify-embed";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import MainCarousel from "../shared/Carousel";
import SmallBanner from "../shared/banners/smallBanner";
import MainBanner from "../shared/banners/bigBanner";
import PartnerBanner from "../shared/banners/partner"

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
            return error;
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
        
                    <MainCarousel title="Best Seller" arr={albumRequest.discover}/>
                    
                    <SmallBanner text="Run To The Hills" image="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/04/iron-maiden-ft-lauderdale-2019-jmc-53197.jpg" genre="Rock" id="62cbe90e94101861fbe5edc4"/>
                    
                    <MainCarousel title="Discover" arr={albumRequest.best}/>
                
                    <SmallBanner text="So What" image="https://polimorfismoperveso.files.wordpress.com/2016/11/miles-davis-foto-principal.jpg?w=1000&h=500&crop=1" genre="Jazz" id="62cbe90e94101861fbe5edda" />
                    <h2 className="partners">Partners</h2>
                    <PartnerBanner title="Night Owl" image="https://www.msc.com/-/media/images/msc-cargo/sectors/agriculture/coffee/msc21008133/msc21008133_s.jpg" link="https://projeto-14-front-eta.vercel.app/"/>
                    <PartnerBanner title="FreeShop" image="https://www.gemius.com/assets/images/f/online%20shopping-681f3faf.jpg" link="https://freestore-project.vercel.app"/>   
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
    background-color: #DFDFDF;
    padding: 0 20px 30px;

    h2{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 700;
        color: #292929;
        z-index: 0;
    }

    .partners{
        margin: 30px 0 0;
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
    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none;  
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


