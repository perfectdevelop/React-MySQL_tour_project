import React from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";
import axios from 'axios';
import { useState, useEffect } from 'react';

import "./styles.css";
import { setDefaultNamespace } from "i18next";
import { getDefaultWatermarks } from "istanbul-lib-report";
// import { supportsGoWithoutReloadUsingHash } from "history/domutils";

const onChange = tours => {
    console.log(tours);
};

function Search() {

    // const [data, setData] = useState(null);
    const [tours, setTours] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axios('http://localhost:8081/gettours')
    //         .then(response => {
    //             console.log(response.data);
    //             setTours(response.data.json())
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error)
    //             setError(error);
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }, []);

    useEffect(() => {
        getData()
    }, []);
    
    async function getData(){
        await axios("http://localhost:8081/tours/gettours")
        .then((response) => {
            console.log('response============.', response.data.hotels)
            setTours(response.data.hotels);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <Downshift
            onChange={onChange}
            itemToString={tours => (tours ? tours.name : "")}
        >
            {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                highlightedItem,
                getLabelProps
            }) => (
                <div>
                    <label
                        style={{ marginTop: "1rem", display: "block" }}
                        {...getLabelProps()}
                    >
                        CHOOSE THE TOURS
                    </label>{" "}
                    <br />
                    <input className="searchbar" {...getInputProps({ placeholder: "SEATCH TOURS" })} />
                    {isOpen ? (
                        <div className="downshift-dropdown">
                            {tours
                                .filter(
                                    item =>
                                        !inputValue ||
                                        item.name.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((item, index) => (
                                    <div
                                        className="dropdown-item"
                                        {...getItemProps({ key: item.name, index, item })}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index ? "lightgray" : "white",
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )}
        </Downshift>
    );
}

export default Search;
