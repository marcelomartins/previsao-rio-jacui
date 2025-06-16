import fetch from "node-fetch";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const LAT = -29.94, LON = -51.72;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const publicDir = resolve("public");
mkdirSync(publicDir, { recursive: true });

async function main() {
  // 1. Open-Meteo
  const meteoURL =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    "&hourly=geopotential_height_500hPa&forecast_hours=120&timezone=America%2FSao_Paulo";
  const meteo = await fetch(meteoURL).then(r => r.json());
  const meteoMin = JSON.stringify({ hourly: meteo.hourly });

  // 2. OpenAI
  const prompt = [
    { role: "system",
      content: "Você é um meteorologista brasileiro. Produza um boletim objetivo em português, destacando bloqueios atmosféricos e impactos hidrológicos na bacia do Jacuí." },
    { role: "user",
      content: `Dados brutos Open-Meteo (Z500 5 dias):\n${meteoMin}\n\nGere um resumo (máx. 300 palavras).` }
  ];

  const gpt = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({ model: "gpt-4o-mini", temperature: 0.7, messages: prompt })
  }).then(r => r.json());

  const texto = gpt.choices[0].message.content
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  // 3. Grava HTML em /public/index.html
  const ts = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const html = `<!DOCTYPE html><html lang="pt-BR"><meta charset="utf-8">
  <title>Boletim Jacuí – ${ts}</title>
  <style>body{font-family:system-ui,Arial,sans-serif;margin:2rem;line-height:1.4}</style>
  <h1>Boletim Hidrometeorológico – Bacia do Jacuí</h1>
  <div>${ts} (BRT)</div><p>${texto}</p>`;
  writeFileSync(resolve(publicDir, "index.html"), html);
}

main().catch(err => { console.error(err); process.exit(1); });
