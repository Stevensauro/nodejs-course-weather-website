const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Index Page',
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address)
        return res.send({error: 'You need to provide an address'})

    const {address} = req.query

    geocode(address, 
        (error, {latitude, longitude, location} = {})=>{
    
            if(error)
                return res.send({error})
    
            forecast(latitude, longitude, (error, forecast) => {
                if(error)
                    return res.send({error})
    
                return res.send({forecast, location, address})
            })
        }
    )
})

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', 
    {
        title: '404',
        message: 'Help Article Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', 
    {
        title: '404',    
        message: 'Page Not Found'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port 3000.')
})