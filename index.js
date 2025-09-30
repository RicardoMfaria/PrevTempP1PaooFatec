require('dotenv').config()
const axios = require('axios')

const PROTOCOL = 'https'
const BASE_URL = 'api.openweathermap.org/geo/1.0/direct'
const APPID = process.env.OPENWEATHER_API_KEY
const Q = 'são paulo'
const URL = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APPID}`


const promiseResultante = axios.get(URL)
promiseResultante.then((coordenada) =>{
    const {lat, lon} = coordenada.data[0] 
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lon}`);
})
.catch((erro) => {
    console.log(`Erro ao buscar as coordenadas ${erro}`)
})

