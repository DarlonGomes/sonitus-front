import styled from "styled-components";
//import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
//import { useNavigate } from "react-router-dom";
//import { UserContext } from "../../context/UserContext";

//import Skeleton from "react-loading-skeleton";
//import "react-loading-skeleton/dist/skeleton.css";

function GenreList () {

    const Test = () => {
        const arr = []
        for(let i = 0; i < 4; i++){
            arr.push({
                image: "https://cdns-images.dzcdn.net/images/cover/4ba9235bc8e6947a60e2e03642709c40/264x264.jpg",
                album: "Under The Covers",
                artist: "Ninja Sex Party"
            })
        }

        return(
            <>
            {arr.map(e => <Sample>
                    <img src={e.image} alt={e.title}/>
                    <div className="info">
                        <p className="bold">{e.album}</p>
                        <p>{e.artist}</p>
                    </div>
                </Sample>)}
            </>
        )
    }



    return (
        <>
        <Container>
            <h2> All Genres</h2>
            <GenreWrapper>
            <div className="info">
            <h3>Rock</h3><h3>more...</h3>
            </div>
            <div className="sampleWrapper">
                <Test/>
            </div>
            </GenreWrapper>

            <GenreWrapper>
            <div className="info">
            <h3>Rock</h3><h3>more...</h3>
            </div>
            <div className="sampleWrapper">
                <Test/>
            </div>
            </GenreWrapper>

            <GenreWrapper>
            <div className="info">
            <h3>Rock</h3><h3>more...</h3>
            </div>
            <div className="sampleWrapper">
                <Test/>
            </div>
            </GenreWrapper>

        </Container>
        </>
    )
}
export default GenreList;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 0 20px;
    margin-top: 150px;

    h2{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #000000;
    }
`;

const GenreWrapper = styled.div`
    width: 100%;

    h3{
        margin: 20px 0;
        font-family: 'Jost';
        font-size: 28px;
        font-weight: 500;
        color: #000000;
    }
    .info{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .sampleWrapper{
        height: 410px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-between;
    }

`;

const Sample = styled.div`
    width: 150px;
    height: 200px;
    display: flex;
    flex-direction: column;
       
    img{
        width: 150px;
        height: 150px;
    }

    .info{
        width: 150px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
`;

const EmptySample = styled.div`
    width: 150px;
    height: 200px;
    display: flex;
    background-color: #dfdfdf;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 16px;
        color: #000000;
    }
`;

