import React from 'react';
import temperature from "../image/temperature.png";
import wind from "../image/wind-direction.png";
import arrow from "../image/arrow-right.png";
import humidity from "../image/humidity.png";
import classes from "./WeatherBlock.module.scss";

const WeatherBlock = ({weatherData}) => {
    const newDate = new Date(weatherData?.location?.localtime);
    const date = newDate.toLocaleDateString("en-GB",{ month:"long", weekday:"long", day:"numeric", hour: "2-digit", hour12:false, minute:"2-digit"});

    return (
        <>
            <div className={classes.weatherBlock__titleBlock}>
                <h2>{weatherData.location?.name}, {weatherData.location?.country}</h2>
                <h3>{date}</h3>
            </div>
            <div className={classes.weatherBlock__weather}>
                <div className={classes.weatherBlock__weather__leftBlock}>
                    <img src={weatherData.current?.condition?.icon} className={classes.weatherBlock__weather__rightBlock__info__mainImg}/>
                    <span>{weatherData.current?.condition?.text}</span>
                </div>
                <div className={classes.weatherBlock__weather__rightBlock}>
                    <div className={classes.weatherBlock__weather__rightBlock__info}>
                        <img src={temperature} className={classes.weatherBlock__weather__rightBlock__info__mainImg}/>
                        <span>{weatherData.current?.temp_c}°C, feels like {weatherData.current?.feelslike_c}°C</span>
                    </div>
                    <div className={classes.weatherBlock__weather__rightBlock__info}>
                        <img src={wind} className={classes.weatherBlock__weather__rightBlock__info__mainImg}/>
                        <span>{weatherData.current?.wind_kph} km\h <img src={arrow}
                                                                        style={{transform: `rotate(${weatherData.current?.wind_degree}deg)`}}
                                                                         className={classes.weatherBlock__weather__rightBlock__info__addImg}
                                                                        />
                        </span>
                    </div>
                    <div className={classes.weatherBlock__weather__rightBlock__info}>
                        <img src={humidity} className={classes.weatherBlock__weather__rightBlock__info__mainImg}/>
                        <span>{weatherData.current?.humidity}%</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherBlock;