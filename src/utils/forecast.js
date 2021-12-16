const request= require('request');


const forecast= (geoCode, callback)=>{ //18.975,72.826
    const forecastServiceURL='http://api.weatherstack.com/current?access_key=bab0d956001275a02b0cde803db34fca&query='+geoCode;
    //const forecastServiceURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291cmFiaHRoYXdhaSIsImEiOiJja3dzdDRsbDUwdmYxMm9xbGY2Y2t0cmdlIn0.0jlMubFOq7qRvTiqR_fcLg&limit=1';
    request({url : forecastServiceURL},(error, response) => {
        debugger
        if(error){
            callback('Not able to connect to weather services', undefined);
        }  
        else if (response){
            const parsedJson= JSON.parse(response.body);
            if(parsedJson.length == 0){
                callback('No Matching results found', undefined);   
            }
            else {
                const weatherInfo= parsedJson;


                const location= weatherInfo.location;
                const city= location.name;
                
                const {temperature,feelslike :feelsLike, humidity,  precip, weather_descriptions : weatherDesc} =weatherInfo.current; 

                // const temperature= weatherInfo.current.temperature;
                // const feelsLike= weatherInfo.current.feelslike;
                // const humidity= weatherInfo.current.humidity;
                // const precip= weatherInfo.current.precip;
                // const weatherDesc= weatherInfo.current.weather_descriptions;
            
            console.log(weatherDesc + '. Current temperature in '+city +' city is '+temperature+' degrees, feels like '+feelsLike+' degrees , and humidity is '+humidity+', chances of rain are '+precip+' percent');
            const weatherbrief =  weatherDesc + '. Current temperature in '+city +' is '+temperature+' degrees, feels like '+feelsLike+' degrees , and humidity is '+humidity+', chances of rain are '+precip+' percent, Have a good day';       
             const weatherDetails ={
                     city,
                    temp: temperature,
                    feelsLike: feelsLike,
                    humidity,
                    precip,
                    weatherbrief: weatherbrief
             }                 
            callback(undefined, weatherDetails);
            }
        }   
    });

}

module.exports = forecast;