require('dotenv').config()
const axios = require('axios')

const CHAVE = process.env.OPENWEATHER_API_KEY

const obterPrevisao = async (lat, lon) => {
  try {
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CHAVE}&units=metric&lang=pt_br`;
    const resposta = await axios.get(urlPrevisao);
    const { feels_like } = resposta.data.main;
    const { description } = resposta.data.weather[0];

    console.log("\nPrevisão do Tempo");
    console.log(`Sensação térmica: ${feels_like}°C`);
    console.log(`Descrição: ${description}`);
  } catch (erro) {
    console.log(`Erro ao obter a previsão do tempo:${erro}`);
  }
}

const CIDADE = "são paulo"
const urlCoordenadas = `https://api.openweathermap.org/geo/1.0/direct?q=${CIDADE}&appid=${CHAVE}`;

axios.get(urlCoordenadas)
  .then((coordenada) => {
    const { lat, lon } = coordenada.data[0]
    console.log("Coordenadas");
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lon}`);
    obterPrevisao(lat, lon);
  })
  .catch((erro) => {
    console.log(`Erro ao buscar as coordenadas: ${erro}`)
  })