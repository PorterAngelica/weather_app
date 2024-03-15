import React, {useState} from 'react'
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=ea4b5e7e658ba18257f059f57064ca77&lang=en";
    let cityUrl = "&q="
    let UrlForecast = "https://api.openweathermap.org/data/2.5/forecast?&appid=ea4b5e7e658ba18257f059f57064ca77&lang=en"

    const [weather, setWeather] = useState([])
    const [forecast, setForecast] = useState([])
    const [loading, setloading] = useState(false)
    const [show, setShow] = useState(false)
    const [location, setlocation] = useState("")

    const getlocation = async(loc) => {
        setloading(true);
        setlocation(loc);

        // ! weather

        // * concatenating the city URl and location to the weather URL
        urlWeather = urlWeather + cityUrl + loc;

        // * fetching weather data from the API asynchronously
        await fetch(urlWeather).then((response) => {
            // * checking if the response is not okay and throwing an error if so
            if(!response.ok) throw{response}
            // * parsing the response as JSON
            return response.json();

        }).then((weatherData) => {
            // * logging the retrieved weather data
            console.log(weatherData)
            // * setting the weather state with the retrieved data
            setWeather(weatherData);

        }).catch(error => {
            // * logging any errors that ocuured during the fetch
            console.log(error)
            // * setting the loading state to false as fetch operation failed
            setloading(false);
            //* hidding any UI elements associated with weather display due to error
            setShow(false);
        });
        //FORECAST

        UrlForecast = UrlForecast + cityUrl + loc;

        // * fetching forecast data from the API asynchronously
        await fetch(UrlForecast).then((response) => {
            // * checking if the response is not okay and throwing an error if so
            if(!response.ok) throw{response}
            // * parsing the response as JSON
            return response.json();

        }).then((forecastData) => {
            // * logging the retrieved forecast data
            console.log(forecastData)
            // * setting the forecast state with the retrieved data
            setForecast(forecastData);

            setloading(false);
            setShow(true)

        }).catch(error => {
            // * logging any errors that ocuured during the fetch
            console.log(error)
            // * setting the loading state to false as fetch operation failed
            setloading(false);
            //* hidding any UI elements associated with forecast display due to error
            setShow(false);
        });
    }
    
    return (
            <React.Fragment>
            <Form 
            newLocation = {getlocation}
            />

            <Card 
            showData = {show}
            loadingData = {loading}
            weather = {weather}
            forecast = {forecast}
            />
            </React.Fragment>
    );
}

export default WeatherPanel
