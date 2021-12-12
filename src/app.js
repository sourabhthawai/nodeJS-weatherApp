// import express from 'express';
// //import path, {dirname} from 'path'
// import path from 'path'
// import { fileURLToPath } from 'url';
const path = require('path');
const express = require('express');
const hbs= require('hbs');
const geoCode= require('./utils/geoCode');
const foreCast= require('./utils/forecast');


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname('');
console.log(__dirname);
console.log(path.join(__dirname, '../../public'))
 const app= express();
 const publicDirectoryPath = path.join(__dirname, '../public');
 const viewspath = path.join(__dirname, '../templates/views');
 const partialsPath= path.join(__dirname, '../templates/partials');

console.log('path');
 console.log(publicDirectoryPath);
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// app.get('', (req, res)=>{
//     res.send('<h1>Hello express...</h1>');
// })

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name :'Sourabh Thawai'
    });
})

app.get('/about',(req,res)=>{
res.render('about', {

    title:'About Dunder Mifflin',
    name:'Sourabh Thawai'
})

});

app.get('/help', (req, res)=>{
res.render('help', {
    helptext:'Contact Pam - 9999999999',
    title:'Help Desk',
    name:'Sourabh Thawai'
})
});

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide search term'    
        });
    }

    console.log(req.query.search);
    res.send({
        products:[]
    });

});

app.get('/help', (req,res)=>{
    res.send([
        {
        name: 'Sourabh',
        bike: 'hornet'
        },
        {
        name: 'Parag',
        bike:'Bullet'
        }
]);
});


app.get('/about', (req,res)=>{
    res.send('About Page');
});



app.get('/about/*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Sourabh Thawai',
        errorMessage:'About Page not found'
    });
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }


    geoCode(req.query.address, (error,{latitude,longitude, places } = {})=>{
        if(error){
            return res.send({ error })
        }
        else{
            const coodinates = latitude.toString() +", "+ longitude.toString(); 
            foreCast(coodinates, (error, forecastdata)=>{
            if(error){
                return res.send({ error })
             }  
             else{
              //  const parsedJson= JSON.parse(forecastdata);
              console.log(forecastdata);
                      //
                        res.send([
                            {
                            forecast : forecastdata.weatherbrief,    
                            address: req.query.address,
                            humidity: forecastdata.humidity,
                            feelsLike: forecastdata.feelsLike,
                            temp: forecastdata.temp,
                            precip: forecastdata.precip

                            },
                        
                        ]);

             }     
          })
           // console.log(places);
        }
    });
});

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Sourabh Thawai',
       errorMessage:'Page not found'     
    });
});


app.listen(3000, ()=>{
console.log('Server is up on port 3000')

});
