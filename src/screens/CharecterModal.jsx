import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AccessToken, manageConfig } from "../axiosconfig";
import { useParams } from "react-router-dom";

function CharecterModal({ isModal, setModal, selected, setSelected }) {
    // console.log(selected, "Modaaal_id");
    const [charector, setCharector] = useState([]);

    useEffect(() => {
        manageConfig
            .get(`/character/${selected}`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })
            .then(function (response) {
                // setResponsedata(response.data.docs);
                console.log(response.data.docs, "responseeeeeeModaaal");
                setCharector(response.data.docs);

                // setCharector(response.data.docs);
                // setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [selected]);
    return (
        <>
            <Overlay className={isModal ? "active" : ""}></Overlay>
            <MainContainer className={isModal ? "active" : ""}>
                <Wrapper>
                    <Header>Character Details</Header>
                    <MainDiv>
                        <h3>The Lord of Rings Api</h3>
                        <p>The one API to rule them all</p>
                        <BoxDiv>
                            <h3>Charecters - Name</h3>
                            <MiddleDiv>
                                <NameDiv>
                                    <h4>Name</h4>
                                    <h5>WikiURL</h5>
                                    <h5>Race</h5>
                                    <h5>Gender</h5>
                                    <h5>Height</h5>
                                    <h5>Hair</h5>
                                    <h5>Realm</h5>
                                    <h5>Birth</h5>
                                    <h5>Spouse</h5>
                                    <h5>Death</h5>
                                </NameDiv>
                                {charector.map((item) => (
                                    <NameDiv>
                                        <h4>{item.name}</h4>
                                        <h5>
                                            <a href={item.wikiUrl}>
                                                {item.wikiUrl
                                                    ? item.wikiUrl
                                                    : "-"}
                                            </a>
                                        </h5>
                                        <h5>{item.race ? item.race : "-"}</h5>
                                        <h5>
                                            {item.gender ? item.gender : "-"}
                                        </h5>
                                        <h5>
                                            {item.height ? item.height : "-"}
                                        </h5>
                                        <h5>{item.hair ? item.hair : "-"}</h5>
                                        <h5>{item.realm ? item.realm : "-"}</h5>
                                        <h5>{item.birth ? item.birth : "-"}</h5>
                                        <h5>
                                            {item.spouse ? item.spouse : "-"}
                                        </h5>
                                        <h5>{item.death ? item.death : "-"}</h5>
                                    </NameDiv>
                                ))}
                            </MiddleDiv>
                            <ButtonDiv>
                                <input
                                    onClick={() => {
                                        setModal(false);
                                        setCharector([]);
                                    }}
                                    className="button"
                                    type="button"
                                    value="Close"
                                />
                            </ButtonDiv>
                        </BoxDiv>
                    </MainDiv>
                </Wrapper>
            </MainContainer>
        </>
    );
}

export default CharecterModal;

const Overlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    display: none;
    &.active {
        display: block;
    }
    /* position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
    transform: scale(0, 0);
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.5);
    &.active {
        display: block;
    } */
`;
const MainContainer = styled.div`
    width: 70%;

    /* height: 60vh; */
    z-index: 11;
    background-color: #fff;
    left: 10%;
    top: 10%;
    /* transform: translate(-50%, -50%); */
    position: absolute;
    padding: 40px;
    border-radius: 10px;
    transform: scale(0, 0);
    &.active {
        transform: scale(1, 1);
    }
`;
const Wrapper = styled.div``;
const Header = styled.h3`
    padding-top: 30px;
    font-size: 30px;
`;
const MainDiv = styled.div`
    /* text-align: center; */
    margin-top: 40px;
    h3 {
        font-size: 25px;
        margin-bottom: 30px;
        text-align: center;
    }
    p {
        margin-bottom: 30px;
        font-size: 16px;
        text-align: center;
    }
`;
const BoxDiv = styled.div`
    border: 1px solid black;
    /* height: 500px; */
    h3 {
        font-size: 22px;
        border-bottom: 1px solid black;
        padding: 10px 0;
        margin-bottom: 0px;
    }
    input {
        padding: 17px;
        height: 20px;
        width: 100%;

        &.button {
            width: 25%;
            padding: 0;
            position: relative;
            right: 0;
            height: 38px;
        }
    }
`;
const MiddleDiv = styled.div`
    padding: 20px;
    display: flex;
    grid-gap: 40px;
    /* justify-content: space-between; */
    /* border-bottom: 1px solid;s */
`;
const NameDiv = styled.div`
    h5 {
        margin: 20px 0;
        font-size: 16px;
    }
`;
const ButtonDiv = styled.div`
    display: flex;
    padding: 20px;
    justify-content: flex-end;
`;
