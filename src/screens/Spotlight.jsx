import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import CharecterModal from "./CharecterModal";
import { AccessToken, manageConfig } from "../axiosconfig";
import GreenLoader from "./Includes/GreenLoader";

function Spotlight() {
    const [isModal, setModal] = useState(false);
    const [responsedata, setResponsedata] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isFilter, setFilter] = useState(false);
    const [selected, setSelected] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // console.log(responsedata, "_______");
    // console.log(selected, "%%%%%%");

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setFilter(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        const fectdata = () => {
            manageConfig
                .get("/character", {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })
                .then(function (response) {
                    // response.json(responsedata.splice(0, 10));
                    setResponsedata(response.data.docs);
                    console.log(response);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fectdata();
    }, []);

    const searchItems = (searchValue) => {
        setFilter(true);
        setSearchInput(searchValue);
        const filteredData = responsedata.filter((item) => {
            return Object.values(item)
                .join("")
                .toLowerCase()
                .includes(searchInput.toLowerCase());
        });
        setFilteredResults(filteredData);

        console.log(filteredData, "filtereddddd");
    };

    return (
        <>
            <Wrapper>
                <Header>Character Listing</Header>
                <MainDiv ref={wrapperRef}>
                    <h3>The Lord of Rings Api</h3>
                    <p>The one API to rule them all</p>
                    {/* {question.map((item) => { */}
                    <BoxDiv>
                        <h3>Charecters</h3>
                        <Paramsdiv>
                            <Top>
                                <SearchDiv ref={wrapperRef}>
                                    <label for="search">Search</label>
                                    <input
                                        type="search"
                                        placeholder=" by name"
                                        onClick={() => setFilter(!isFilter)}
                                        onChange={(e) =>
                                            searchItems(e.target.value)
                                        }
                                    />
                                    <SearchIcon />
                                    {searchInput.length > 1
                                        ? filteredResults.map((item) => {
                                              return (
                                                  <SearchFilterDdiv
                                                      className={
                                                          isFilter
                                                              ? "active"
                                                              : ""
                                                      }
                                                  >
                                                      {" "}
                                                      <SearchBoxDiv>
                                                          <li>{item.name}</li>
                                                          <li>{item.name}</li>

                                                          <li>{item.name}</li>
                                                      </SearchBoxDiv>
                                                  </SearchFilterDdiv>
                                              );
                                          })
                                        : ""}
                                </SearchDiv>
                                <SortDiv>
                                    <label for="cars">Sort By</label>
                                    <select>
                                        <option value="by name(asc/desc)">
                                            by name(asc/desc)
                                        </option>
                                        <option value="asc">asc</option>
                                        <option value="desc">desc</option>
                                    </select>
                                </SortDiv>
                            </Top>
                            <Top>
                                <SortDiv className="bottom">
                                    <label for="cars">Race</label>
                                    <select>
                                        <option value="">
                                            list of races,multiselection
                                        </option>
                                        <option value="">asc</option>
                                        <option value="">desc</option>
                                    </select>
                                </SortDiv>
                                <SortDiv className="bottom">
                                    <label for="cars">Gender</label>
                                    <select>
                                        <option value="">
                                            male / female / any
                                        </option>
                                        <option value="">asc</option>
                                        <option value="">desc</option>
                                    </select>
                                </SortDiv>
                                <input
                                    className="button"
                                    type="button"
                                    value="submit"
                                />
                            </Top>
                        </Paramsdiv>
                        <MiddleDiv>
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th
                                        style={{
                                            width: "25%",
                                        }}
                                    >
                                        Name
                                    </th>
                                    <th>Race</th>
                                    <th>Gender</th>
                                    <th
                                        style={{
                                            width: "10%",
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                                {isLoading ? (
                                    <BottomConatainer>
                                        <GreenLoader />
                                    </BottomConatainer>
                                ) : (
                                    <>
                                        {responsedata.map((item, index) => (
                                            // <ItemDiv>
                                            <tr
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setModal(true);
                                                    setSelected(item._id);
                                                }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.race}</td>
                                                <td>{item.gender}</td>
                                                <td className="details">
                                                    Details >>
                                                </td>
                                            </tr>

                                            // </ItemDiv>
                                        ))}
                                    </>
                                )}
                            </table>
                        </MiddleDiv>
                        <BottomDiv>
                            <LeftDiv>
                                <NO>1</NO>
                                <NO>1</NO>
                                <NO>1</NO>
                                <NO>1</NO>
                                <NO>1</NO>
                            </LeftDiv>
                            <RightDiv>
                                <label for="limit">Limit</label>
                                <select>
                                    <option value="">10</option>
                                    <option
                                        value="asc"
                                        // onChange={() => {
                                        //     responsedata.splice(1, 20);
                                        // }}
                                    >
                                        20
                                    </option>
                                    <option value="desc">30</option>
                                </select>
                            </RightDiv>
                        </BottomDiv>
                    </BoxDiv>
                </MainDiv>
            </Wrapper>
            <CharecterModal
                isModal={isModal}
                setModal={setModal}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    );
}

// ________________*************___________________________
// {selectLocalBody
//     ? selectLocalBody
//         ? localsearchResult
//               .filter((value) => {
//                   if (selectLocalBody === "") {
//                       return value;
//                   } else if (
//                       value.name
//                           .toLowerCase()
//                           .includes(
//                               selectLocalBody.toLowerCase()
//                           )
//                   ) {
//                       return value;
//                   }
//               })
//               .map((detail) => {
//                   return (
//                       <Listbox
//                           key={detail.id}
//                           onClick={() => {
//                               setSelectedLocalBody(
//                                   detail.name
//                               );
//                               setLocalBodyId(
//                                   detail.id
//                               );
//                               setItem(false);
//                               setSelectedDistrict(
//                                   detail.district
//                               );
//                               dispatch({
//                                   type: "UPDATE_SAT_USER_DATA",
//                                   sat_user_data:
//                                       {
//                                           ...sat_user_data,
//                                           district:
//                                               detail.district,
//                                       },
//                               });
//                           }}
//                       >
//                           <Place
//                               style={{
//                                   color: selectLocalBody
//                                       ? "#0F8B5E"
//                                       : "",
//                               }}
//                           >
//                               {detail.name}
//                           </Place>
//                           <District>
//                               {detail.district}{" "}
//                               District
//                           </District>
//                       </Listbox>
//                   );
//               })
//         : ""
//     : ""}

export default Spotlight;
const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    z-index: 1000;
`;
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
    margin-bottom: 40px;

    /* height: 500px; */
    /* overflow-y: scroll; */
    h3 {
        font-size: 22px;
        border-bottom: 1px solid black;
        padding: 10px 0;
        margin-bottom: 0px;
    }
`;
const Paramsdiv = styled.div`
    padding: 20px;
    border-bottom: 1px solid;
`;
const Top = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    /* position: relative; */
    label {
        margin-right: 10px;
    }
    input {
        padding: 17px;
        height: 20px;
        width: 100%;
        /* position: relative; */
        &.button {
            width: 25%;
            padding: 0;
            height: 38px;
        }
    }
`;
const MiddleDiv = styled.div`
    padding: 20px;
    height: 200px;
    overflow-y: scroll;
    border-bottom: 1px solid;
`;
const BottomConatainer = styled.div`
    /* padding: 30px 200px; */
    /* margin: 0 auto; */
`;

const SearchIcon = styled(BsSearch)`
    position: absolute;
    right: 10px;
    cursor: pointer;
`;
const SearchFilterDdiv = styled.div`
    transform: scale(0, 0);
    right: -1px;
    top: 40px;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    /* height: 50px; */
    width: 90%;
    &.active {
        transform: scale(1, 1);
    }
`;
const SearchBoxDiv = styled.ul`
    width: 90%;
    margin: 10px auto;
    background: #fff;
    overflow-y: scroll;
    li {
    }
`;
const SearchDiv = styled.div`
    position: relative;
    margin-right: 10px;
    color: black;
    width: 60%;
    display: flex;
    align-items: center;
`;
const SortDiv = styled.div`
    display: flex;
    align-items: center;
    width: 30%;
    select {
        width: 60%;
        padding: 5px;
        height: 38px;
    }
    &.bottom {
        width: 80%;
    }
`;
// const IdDiv = styled.div`
//     h5 {
//         margin: 20px 0;
//         font-size: 16px;
//     }
// `;
// const NameDiv = styled.div`
//     h5 {
//         margin: 20px 0;
//         font-size: 16px;
//     }
// `;
// const RaceDiv = styled.div`
//     h5 {
//         margin: 20px 0;
//         font-size: 16px;
//     }
// `;
// const GenderDiv = styled.div`
//     h5 {
//         margin: 20px 0;
//         font-size: 16px;
//     }
// `;
// const ActionsDiv = styled.div`
//     h5 {
//         margin: 20px 0;
//         font-size: 16px;
//         cursor: pointer;
//     }
// `;
const BottomDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    /* border: 1px solid; */
`;
const LeftDiv = styled.div`
    /* width: 80%; */
    display: flex;
    justify-content: space-between;
`;
const RightDiv = styled.div`
    /* width: 30%; */
    display: flex;
    align-items: center;
    label {
        margin-right: 10px;
    }
    select {
        width: 50%;
        padding: 5px;
    }
`;
const NO = styled.div`
    padding: 5px;
    width: 50%;
    height: 15px;
    border: 1px solid;
    margin-right: 10px;
`;
