import React, {useState} from 'react';
import currentPin from "../image/current-pin.png";
import classes from "./SearchArea.module.scss";
import axios from "axios";

const SearchArea = ({setWeatherData, setIsLoading, setIsError}) => {
    const [location, setLocation] = useState("");
    const [receivedLocations, setReceivedLocations] = useState([]);
    const [locationToFind, setLocationToFind] = useState("");

    const apiRequest = (requestData)=>{
        const param = requestData ? "search": "current";
        const request = requestData ? requestData : location;
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/'+param+'.json',
            params: {q: request},
            headers: {
                'X-RapidAPI-Key': '27803a2ef1msh945cc8c8c86cc5ep130da3jsnf05378f40712',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'}
        };

        axios.request(options).then(response=>{
            if(requestData){
                setReceivedLocations(response.data);
            }
            if(!requestData){
                setWeatherData(response.data);
                setLocationToFind("");
                setLocation("");
            }
        }).catch(error=>{
            setIsError(true);
            console.error(error);
        })
    };

    const handleInput = (e)=> {
        apiRequest(e.target.value);
        setLocation(e.target.value);
    };

    const handleLocationToFind = (pickedLocation)=> {
        const string = `${pickedLocation.name}, ${pickedLocation?.region}${pickedLocation?.region && " region, "}${pickedLocation.country}`;
        const idToFind = pickedLocation.id;
        setLocation(string);
        setLocationToFind(idToFind);
        setReceivedLocations([]);
    };


    const getMyLocation = ()=> {
        navigator.geolocation.getCurrentPosition((position)=>{
            const newLocation = position.coords.latitude + ' ' + position.coords.longitude;
            setLocationToFind(newLocation);
            return setLocation(newLocation);
        });
    };

    const getWeather = (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setWeatherData("");
        setTimeout(()=>{
            apiRequest();
            setIsLoading(false);
        }, 1000);    //imitation of pending status to see loading animation
    };


    const locationsBlock = receivedLocations.map(item=>{
        return <div
            key={item.id}
            className={classes.searchArea__locations__item}
            onClick={()=>handleLocationToFind(item)}
        >
            <span>{item?.name}, {item?.region}{item?.region && " region, "}{item?.country}</span>
        </div>
    });



    return (
        <div className={classes.searchArea}>
            <form onSubmit={getWeather}>
                <input
                    type="text"
                    value={location}
                    placeholder="Enter the place, post index or coordinates"
                    onChange={handleInput}
                />
                <button disabled={!locationToFind}>
                    Find
                </button>
            </form>
            <div
                className={classes.searchArea__locations}
                style={receivedLocations.length>0 ? {display: "flex"} : {display: "none"}}
            >
                {locationsBlock}
            </div>
            <button
                className={classes.searchArea__locationBtn}
                onClick={getMyLocation}
            >
                Get current location
                <img src={currentPin}/>
            </button>
        </div>
    );
};

export default SearchArea;