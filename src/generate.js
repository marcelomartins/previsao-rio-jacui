import { marked } from "marked";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { buildForecastPrompt } from "./prompt.js";

const LAT = -29.94, LON = -51.72;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const publicDir = resolve("public");
mkdirSync(publicDir, { recursive: true });

async function main() {
  
  const meteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    "&hourly=geopotential_height_500hPa,geopotential_height_300hPa,cape,lifted_index,wind_speed_10m,wind_gusts_10m,precipitation_probability,temperature_2m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum"
    "&forecast_hours=120&timezone=America%2FSao_Paulo";
  const meteo = await fetch(meteoURL).then(r => r.json());

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
  const html = `<!DOCTYPE html><html lang="pt-BR"><meta charset="utf-8">
  <title>Previsão – Bacia do Jacuí - ${ts}</title>
  <style>body{font-family:system-ui,Arial,sans-serif;margin:2rem;line-height:1.4}</style>
  <h1>Previsão – Bacia do Jacuí</h1>
  <div>${ts} (BRT)</div><p>${htmlBody}</p>`;
  writeFileSync(resolve(publicDir, "index.html"), html);
}

main().catch(err => { console.error(err); process.exit(1); });
