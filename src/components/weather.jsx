import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

import style from "./weather.module.css";

import wind from "./img/wind.png";
import humidity from "./img/humidity.png";
import pressure from "./img/pressure.png";

function Weather() {
    const [weather, setWeather] = useState([]);
    const [inpt, setInpt] = useState("");
    const [city, setCity] = useState("tetouan");



    useEffect(() => {
        if (inpt !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7aa369ece7e8f58bb59291029700b587`)
                .then(res => {
                    setWeather(res.data);
                    setInpt("")
                })
                .catch((e) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${inpt} is not a city!`,
                    })
                })
        }


    }, [city])

    const handchange = (e) => {
        setInpt(e.target.value)
    }
    const handclick = (e) => {
        e.preventDefault()
        if (inpt === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'input is empty!',
            })
        }
        else {
            setCity(inpt)
        }


    }

    return (
        <div className={style.parent}>
            <div className={style.child}>
                <div className={style.child2}>
                    <form className={style.form}>
                        <input onChange={handchange} value={inpt} type="text" placeholder="Enter the city..." />
                        <button onClick={handclick}>submit</button>
                    </form>
                    {weather.length !== 0 &&
                        <div className={style.info}>
                            <div className={style.head}>
                                <div>
                                    <img src={pressure} alt="" />
                                    {weather.main.pressure}hPa
                                </div>
                                <div>
                                    <img src={humidity} alt="" />
                                    {weather.main.humidity}%
                                </div>
                                <div>
                                    <img src={wind} alt="" />
                                    {weather.wind.speed}m/s
                                </div>
                            </div>
                            <div className={style.temp}>{Math.floor(weather.main.temp - 273.15)}<span>°C</span></div>
                            <div className={style.city}>{weather.name}, {weather.sys.country}</div>
                            <div className={style.desc}>{weather.weather[0].description}</div>
                            <div className={style.img}>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
export default Weather;