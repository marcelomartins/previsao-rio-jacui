import { marked } from "marked";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { buildForecastPrompt } from "./prompt.js";

// const LAT = -29.94, LON = -51.72; // Porto Alegre, RS, Brasil
// const LAT = -28.95, LON = -51.55; // Veranópolis, RS, Brasil
//const LAT = -29.1681, LON = -51.1794; // Caxias do Sul, RS, Brasil
const LAT_LAJEADO = -29.46694, LON_LAJEADO = -51.96083; // Lajeado, RS, Brasil
const LAT_PORTO_ALEGRE = -29.94, LON_PORTO_ALEGRE = -51.72; // Porto Alegre, RS, Brasil

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const publicDir = resolve("public");
mkdirSync(publicDir, { recursive: true });

async function main() {

  const  meteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT_PORTO_ALEGRE}&longitude=${LON_PORTO_ALEGRE}`+
              '&hourly=geopotential_height_500hPa,geopotential_height_300hPa,cape,lifted_index,wind_speed_10m,wind_gusts_10m,precipitation_probability,temperature_2m'+
              '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum'+
              '&timezone=America%2FSao_Paulo' +
              '&forecast_days=4';
  
  const meteo = await fetch(meteoURL).then(r => r.json());

  const meteoURL2 = `https://api.open-meteo.com/v1/forecast?latitude=${LAT_LAJEADO}&longitude=${LON_LAJEADO}`+
            '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum'+
            '&timezone=America%2FSao_Paulo'+
            '&forecast_days=4';

  const meteo2 = await fetch(meteoURL2).then(r => r.json());

  if (meteo.daily && meteo.daily.precipitation_sum && meteo2.daily && meteo2.daily.precipitation_sum) {
    for (let i = 0; i < meteo.daily.precipitation_sum.length; i++) {
      meteo.daily.precipitation_sum[i] = parseInt(meteo.daily.precipitation_sum[i] + meteo2.daily.precipitation_sum[i]);
    }
  }

  const promptForecast = buildForecastPrompt(meteo);

  const prompt = [ { role: "user", content: promptForecast } ];

  const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer  ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({ model: "gpt-4.1-mini", temperature: 0.7, messages: prompt })
  }).then(r => r.json());

  const texto = gpt.choices[0].message.content
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const htmlBody = marked.parse(texto)
  const ts = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }); 
    const html = `<!DOCTYPE html><html lang="pt-BR">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projeto DESATIVADO</title>
  <style>body{font-family:system-ui,Arial,sans-serif;margin:1rem;line-height:1.5;font-size:16px}h1{font-size:1.5rem;margin-bottom:1rem}a{color:#0066cc}</style>
  <h1>Projeto DESATIVADO.</h1>
  <p>⚠️ Usar somente a previsão do tempo se mostrou <strong>ineficiente</strong> para comparar o cenário atual com a enchente de 2024. Seria necessário levar em conta o volume de agua nos rios e bloqueio atmosférico.</p>
  <p>Por segurança desativei as previsões. </p>
  <p>Para informações consulte sempre os órgãos responsáveis como 
    <a href="https://portal.inmet.gov.br/" target="_blank">INMET</a> e 
    <a href="https://www.defesacivil.rs.gov.br/" target="_blank">Defesa Civil</a>.
  </p>
  <p>Caso eu consiga mais dados para ter alertas mais corretos, retormo esse projeto.</p>
  <p>&nbsp;</p>
  <footer style="margin-top:1rem;font-size:14px;color:#666;text-align:left">
    <p>Código fonte disponível em: <a href="https://github.com/marcelomartins/previsao-rs" target="_blank">github.com/marcelomartins/previsao-rs</a></p>
  </footer>`;
  writeFileSync(resolve(publicDir, "index.html"), html);
}

main().catch(err => { console.error(err); process.exit(1); });
