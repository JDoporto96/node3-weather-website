const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

//Define paths for express paths
const publicDirPath= path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name:'Andrew Mead'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        msg:'This is a help message to test if it renders',
        name:'Andrew Mead'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an adress'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
           return res.send({error})
        }
     
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
              return res.send({error});
           }
  
           res.send({
            forecast: forecastData,
            location,
            address: req.query.address
           });
        })
     })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Andrew Mead',
        errorMsg: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Andrew Mead',
        errorMsg: 'Page not found'
    })
})


app.listen(port, ()=>{
    console.log('Server up in port' + port)
});