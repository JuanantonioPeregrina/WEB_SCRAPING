const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL de la página que quieres scrapear
const url = 'https://en.wikipedia.org/wiki/Web_scraping'; // Reemplaza con la URL real

// Función para realizar el scraping
async function scrapeSite() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const headlines = [];

        // Selecciona los elementos de los que quieres extraer información
        $('h2').each((index, element) => {
            headlines.push($(element).text().trim());
        });

        // Muestra los titulares en consola
        console.log(headlines);

        // Guarda los titulares en un archivo JSON
        fs.writeFileSync('headlines.json', JSON.stringify(headlines, null, 2));
    } catch (error) {
        console.error('Error al scrapear la página:', error);
    }
}

// Ejecuta la función una vez para probar
scrapeSite();

// Programa la función para que se ejecute cada hora
setInterval(scrapeSite, 120000); // 3600000ms = 1 hora
//120000:2min
