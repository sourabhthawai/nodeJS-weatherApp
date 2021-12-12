const request= require('request');


const geoCode= (address, callback)=>{
    const geoServiceURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291cmFiaHRoYXdhaSIsImEiOiJja3dzdDRsbDUwdmYxMm9xbGY2Y2t0cmdlIn0.0jlMubFOq7qRvTiqR_fcLg&limit=1';
    request({url : geoServiceURL},(error, {body}) => {
        debugger
        if(error){
            callback('Not able to connect to geo services', undefined);
        }  
        else if (body){
            const parseJson= JSON.parse(body);
            if(parseJson.features.length == 0){
                callback('No Matching results found', undefined);   
            }
            else {
                const coordinates= parseJson.features[0];
                const geoLocation = {
                    longitude:coordinates.center[0],
                    latitude: coordinates.center[1],
                    places: coordinates.place_name
                }
                callback(undefined, geoLocation);
            }
        }   
    });

}

module.exports = geoCode;