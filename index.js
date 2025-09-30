require('dotenv').config()
const axios = require('axios')

const { OPENWEATHER_API_KEY, NEWS_API_KEY } = process.env

const obterNoticias = async (cidade) => {
  try {
    const urlNoticias = `https://newsapi.org/v2/everything?q=${cidade}&language=pt&apiKey=${NEWS_API_KEY}`
    const resposta = await axios.get(urlNoticias)

    console.log(`\n Notícias sobre ${cidade}`)
    
    const artigos = resposta.data.articles
    
    for (let i = 0; i < artigos.length; i++) {
      const artigo = artigos[i]
      console.log(artigo.title)
    }

  } catch (erro) {
    console.log(`Erro ao obter notícias: ${erro}`)
  }
}

const obterPrevisao = async (lat, lon, cidade) => {
  try {
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    const previsao = await axios.get(urlPrevisao)
    const { feels_like } = previsao.data.main
    const { description } = previsao.data.weather[0]

    console.log("\n Previsão do Tempo")
    console.log(`Sensação térmica: ${feels_like}°C`)
    console.log(`Descrição: ${description}`)

    await obterNoticias(cidade);

  } catch (erro) {
    console.log(`Erro ao obter a previsão do tempo: ${erro}`)
  }
}

const CIDADE = "são paulo"
const urlCoordenadas = `https://api.openweathermap.org/geo/1.0/direct?q=${CIDADE}&appid=${OPENWEATHER_API_KEY}`

axios.get(urlCoordenadas)
  .then((coordenada) => {
    const { lat, lon } = coordenada.data[0]
    console.log("Coordenadas")
    console.log(`Latitude: ${lat}`)
    console.log(`Longitude: ${lon}`)
    
    obterPrevisao(lat, lon, CIDADE)
  })
  .catch((erro) => {
    console.log(`Erro ao buscar as coordenadas: ${erro}`)
  })