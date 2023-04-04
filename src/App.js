import {useState} from "react";
import WeatherBlock from "./components/WeatherBlock";
import AnimationBlock from "./components/AnimationBlock";
import Header from "./components/Header";
import SearchArea from "./components/SearchArea";
import Footer from "./components/Footer";


function App() {
    const [weatherData, setWeatherData] = useState();
    const [isLoading, setIsLoading]= useState(false);
    const [isError, setIsError] = useState(false);

    const getMainBlock = ()=> {
        if(isLoading){
            return  <AnimationBlock/>
        }
        if(isError){
            return  <h3>Oops.. Some error</h3>
        }
        if(!weatherData){
            return  <h3>No data yet</h3>
        }

        return <WeatherBlock weatherData={weatherData} />
    }


  return (
    <div className="app">
        <div className="container">
            <Header/>
            <main className="main">
                <SearchArea
                    setWeatherData={setWeatherData}
                    setIsLoading={setIsLoading}
                    setIsError={setIsError}
                />
                <div className="main__central">
                    {getMainBlock()}
                </div>
            </main>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
