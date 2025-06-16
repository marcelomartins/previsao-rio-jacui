import { marked } from "marked";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const LAT = -29.94, LON = -51.72;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const publicDir = resolve("public");
mkdirSync(publicDir, { recursive: true });

async function main() {
  // 1. Open-Meteo
  const meteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    "&hourly=geopotential_height_500hPa,geopotential_height_300hPa,cape,lifted_index,wind_speed_10m,wind_gusts_10m,precipitation_probability,temperature_2m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum"
    "&forecast_hours=120&timezone=America%2FSao_Paulo";

  const meteo = await fetch(meteoURL).then(r => r.json());
//  const meteoMin = JSON.stringify({ hourly: meteo.hourly });

// const meteo = `{"latitude":-30.0,"longitude":-51.75,"generationtime_ms":3.481149673461914,"utc_offset_seconds":-10800,"timezone":"America/Sao_Paulo","timezone_abbreviation":"GMT-3","elevation":23.0,"hourly_units":{"time":"iso8601","geopotential_height_500hPa":"m","geopotential_height_300hPa":"m","cape":"J/kg","lifted_index":"","wind_speed_10m":"km/h","wind_gusts_10m":"km/h","precipitation_probability":"%","temperature_2m":"°C"},"hourly":{"time":["2025-06-15T22:00","2025-06-15T23:00","2025-06-16T00:00","2025-06-16T01:00","2025-06-16T02:00","2025-06-16T03:00","2025-06-16T04:00","2025-06-16T05:00","2025-06-16T06:00","2025-06-16T07:00","2025-06-16T08:00","2025-06-16T09:00","2025-06-16T10:00","2025-06-16T11:00","2025-06-16T12:00","2025-06-16T13:00","2025-06-16T14:00","2025-06-16T15:00","2025-06-16T16:00","2025-06-16T17:00","2025-06-16T18:00","2025-06-16T19:00","2025-06-16T20:00","2025-06-16T21:00","2025-06-16T22:00","2025-06-16T23:00","2025-06-17T00:00","2025-06-17T01:00","2025-06-17T02:00","2025-06-17T03:00","2025-06-17T04:00","2025-06-17T05:00","2025-06-17T06:00","2025-06-17T07:00","2025-06-17T08:00","2025-06-17T09:00","2025-06-17T10:00","2025-06-17T11:00","2025-06-17T12:00","2025-06-17T13:00","2025-06-17T14:00","2025-06-17T15:00","2025-06-17T16:00","2025-06-17T17:00","2025-06-17T18:00","2025-06-17T19:00","2025-06-17T20:00","2025-06-17T21:00","2025-06-17T22:00","2025-06-17T23:00","2025-06-18T00:00","2025-06-18T01:00","2025-06-18T02:00","2025-06-18T03:00","2025-06-18T04:00","2025-06-18T05:00","2025-06-18T06:00","2025-06-18T07:00","2025-06-18T08:00","2025-06-18T09:00","2025-06-18T10:00","2025-06-18T11:00","2025-06-18T12:00","2025-06-18T13:00","2025-06-18T14:00","2025-06-18T15:00","2025-06-18T16:00","2025-06-18T17:00","2025-06-18T18:00","2025-06-18T19:00","2025-06-18T20:00","2025-06-18T21:00","2025-06-18T22:00","2025-06-18T23:00","2025-06-19T00:00","2025-06-19T01:00","2025-06-19T02:00","2025-06-19T03:00","2025-06-19T04:00","2025-06-19T05:00","2025-06-19T06:00","2025-06-19T07:00","2025-06-19T08:00","2025-06-19T09:00","2025-06-19T10:00","2025-06-19T11:00","2025-06-19T12:00","2025-06-19T13:00","2025-06-19T14:00","2025-06-19T15:00","2025-06-19T16:00","2025-06-19T17:00","2025-06-19T18:00","2025-06-19T19:00","2025-06-19T20:00","2025-06-19T21:00","2025-06-19T22:00","2025-06-19T23:00","2025-06-20T00:00","2025-06-20T01:00","2025-06-20T02:00","2025-06-20T03:00","2025-06-20T04:00","2025-06-20T05:00","2025-06-20T06:00","2025-06-20T07:00","2025-06-20T08:00","2025-06-20T09:00","2025-06-20T10:00","2025-06-20T11:00","2025-06-20T12:00","2025-06-20T13:00","2025-06-20T14:00","2025-06-20T15:00","2025-06-20T16:00","2025-06-20T17:00","2025-06-20T18:00","2025-06-20T19:00","2025-06-20T20:00","2025-06-20T21:00"],"geopotential_height_500hPa":[5743.00,5751.00,5760.00,5767.00,5772.00,5774.00,5777.00,5780.00,5787.00,5795.00,5804.00,5811.00,5821.00,5823.00,5825.00,5821.00,5817.00,5813.00,5815.00,5816.00,5818.00,5821.00,5820.00,5818.00,5817.00,5818.00,5815.00,5813.00,5811.00,5809.00,5805.00,5798.00,5798.00,5800.00,5798.00,5814.00,5821.00,5821.00,5821.00,5816.00,5812.00,5812.00,5813.00,5818.00,5822.00,5825.00,5827.00,5828.00,5828.00,5828.00,5827.00,5827.00,5826.00,5823.00,5818.00,5815.00,5817.00,5822.00,5822.00,5822.00,5828.00,5830.00,5822.00,5810.00,5801.00,5797.00,5796.00,5796.00,5798.00,5795.00,5794.00,5792.00,5793.00,5796.00,5797.00,5795.00,5792.00,5789.00,5786.00,5782.00,5780.00,5780.00,5781.00,5782.00,5782.00,5781.00,5779.00,5776.00,5772.00,5770.00,5770.00,5772.00,5774.00,5775.00,5775.00,5775.00,5774.00,5773.00,5770.00,5765.00,5760.00,5754.00,5749.00,5744.00,5741.00,5740.00,5740.00,5740.00,5741.00,5742.00,5742.00,5739.00,5734.00,5730.00,5722.00,5725.00,5728.00,5731.00,5735.00,5738.00],"geopotential_height_300hPa":[9425.81,9440.32,9453.23,9461.29,9469.35,9470.97,9474.19,9477.42,9483.87,9493.55,9503.23,9509.68,9522.58,9525.81,9527.42,9522.58,9519.35,9516.13,9519.35,9520.97,9524.19,9527.42,9530.65,9532.26,9532.26,9537.10,9538.71,9540.32,9541.94,9538.71,9537.10,9537.10,9546.77,9551.61,9556.45,9566.13,9570.97,9574.19,9569.35,9564.52,9556.45,9551.61,9550.00,9550.00,9551.61,9554.84,9556.45,9558.06,9561.29,9561.29,9561.29,9561.29,9559.68,9556.45,9553.23,9550.00,9551.61,9558.06,9559.68,9561.29,9570.97,9574.19,9567.74,9559.68,9550.00,9545.16,9543.55,9545.16,9545.16,9545.16,9540.32,9537.10,9532.26,9527.42,9522.58,9516.13,9511.29,9504.84,9500.00,9495.16,9491.94,9491.94,9495.16,9496.77,9495.16,9491.94,9488.71,9485.48,9482.26,9479.03,9475.81,9470.97,9467.74,9462.90,9459.68,9454.84,9451.61,9446.77,9441.94,9435.48,9427.42,9420.97,9414.52,9409.68,9406.45,9403.23,9401.61,9401.61,9403.23,9404.84,9404.84,9401.61,9396.77,9393.55,9390.32,9395.16,9398.39,9401.61,9404.84,9406.45],"cape":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,10.0,10.0,0.0,10.0,10.0,10.0,10.0,10.0],"lifted_index":[11.40,12.10,13.20,14.90,16.10,17.00,17.40,17.70,18.00,18.00,17.80,16.00,14.20,12.80,11.50,10.50,9.70,9.10,8.50,9.80,11.70,11.70,11.80,11.60,11.30,10.70,8.60,8.00,7.10,8.00,7.90,7.10,6.10,6.10,5.40,4.60,3.90,3.60,0.60,1.40,1.10,1.00,0.90,0.80,1.50,1.70,2.10,2.20,1.60,1.70,1.70,2.30,1.60,1.70,1.20,3.30,2.90,3.20,3.20,3.40,4.10,3.60,2.90,2.60,3.40,3.60,3.80,4.30,4.00,4.50,4.20,4.50,4.10,4.80,4.50,5.10,5.00,4.60,4.80,3.70,3.70,3.30,2.70,2.50,1.40,2.40,1.10,1.80,1.40,0.10,1.00,1.00,0.60,0.50,1.70,1.60,2.20,1.60,1.60,1.50,1.90,2.10,2.60,3.00,2.50,3.10,3.70,4.30,3.20,2.60,2.40,2.70,2.70,3.00,3.00,3.00,3.10,3.10,3.20,3.80],"wind_speed_10m":[4.3,3.7,2.3,1.5,1.6,3.1,3.8,2.8,2.5,2.4,3.3,3.8,5.8,7.2,9.7,11.5,12.3,13.0,13.1,11.3,8.8,11.0,10.4,9.6,7.4,10.6,8.6,7.3,9.8,8.9,2.9,2.9,5.4,4.3,10.2,3.4,5.2,4.3,1.0,3.6,3.1,4.1,4.4,3.4,3.1,3.5,4.6,4.0,4.2,3.3,3.9,4.8,4.3,1.8,2.8,2.6,3.4,3.0,4.0,6.3,7.1,6.2,5.4,4.9,6.3,4.6,2.3,4.6,5.5,6.4,4.3,5.4,5.8,7.7,9.8,10.6,11.0,10.9,9.8,8.2,7.4,7.7,8.7,9.8,10.3,10.6,11.3,12.6,14.1,14.9,14.6,14.1,13.3,13.0,13.0,12.5,10.8,8.8,7.3,7.3,8.0,9.2,10.7,12.5,13.6,13.1,11.8,11.3,11.2,10.9,10.7,9.4,8.0,7.6,13.2,12.2,11.7,11.7,12.0,11.7],"wind_gusts_10m":[7.6,6.8,5.8,2.9,1.8,4.3,6.8,6.5,4.3,4.7,6.8,7.9,11.9,14.4,19.1,22.3,23.4,24.5,25.6,23.4,20.2,19.8,20.5,18.4,16.9,18.7,22.3,15.8,19.4,17.6,15.8,9.0,10.8,26.6,32.4,17.3,9.4,16.2,6.8,6.8,9.0,10.4,18.4,18.0,18.7,19.4,16.2,19.1,21.2,20.9,26.3,26.6,26.3,7.2,17.6,19.4,14.4,7.6,7.9,10.8,13.7,15.5,14.0,11.9,11.9,12.6,7.2,8.3,11.2,12.2,11.5,10.4,13.0,15.1,17.6,18.4,18.7,19.4,17.3,15.5,13.3,14.8,16.6,18.0,18.7,19.8,20.5,22.7,24.8,27.0,27.7,28.8,29.5,27.4,25.6,23.4,21.6,19.4,17.6,19.4,21.6,23.4,23.8,24.5,24.8,23.4,21.6,20.2,20.5,20.9,21.2,19.8,18.7,17.3,26.3,24.8,23.8,23.0,22.0,21.2],"precipitation_probability":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,13,23,25,38,28,28,35,35,45,60,80,88,93,96,95,93,89,84,78,69,59,53,52,54,58,65,73,80,84,86,88,91,93,95,94,94,95,96,97,98,99,100,100,100,100,100,100,99,98,97,95,94,92,90,88,86,83,80,77,75,73,72,71,71,71,71,70,69,67,65,63,61,60,59,58,57,56,56,55,57,56,56,55,54,53,52,50,48,46,43,41,39,36,34,32,30,28],"temperature_2m":[11.6,10.8,10.3,10.0,9.7,9.4,9.1,8.9,8.3,8.3,8.2,8.9,10.8,13.0,15.1,17.0,17.9,18.4,18.2,17.2,16.0,15.8,15.6,15.7,15.4,15.6,15.7,15.5,15.8,15.8,16.0,15.7,15.5,15.7,16.0,16.8,17.1,17.6,17.7,18.3,18.6,18.7,19.2,19.0,18.4,18.1,17.9,17.8,17.7,17.5,17.4,17.3,17.4,17.4,17.2,17.2,17.3,17.4,17.5,17.9,18.3,18.4,18.6,18.6,18.6,18.4,18.1,17.8,17.8,17.8,17.7,17.4,17.3,17.3,17.1,16.8,16.3,16.0,16.0,16.1,16.3,16.4,16.5,16.6,16.8,17.1,17.3,17.3,17.3,17.2,17.0,16.8,16.6,16.6,16.6,16.6,16.6,16.5,16.5,16.7,16.9,17.1,17.2,17.3,17.3,17.2,17.1,17.1,17.2,17.3,17.5,17.6,17.6,17.7,16.3,16.2,15.9,15.6,15.2,14.7]},"daily_units":{"time":"iso8601","weather_code":"wmo code","temperature_2m_max":"°C","temperature_2m_min":"°C","precipitation_sum":"mm"},"daily":{"time":["2025-06-15","2025-06-16","2025-06-17","2025-06-18","2025-06-19","2025-06-20","2025-06-21"],"weather_code":[95,80,95,95,61,95,45],"temperature_2m_max":[15.9,18.4,19.2,18.6,17.3,17.7,16.4],"temperature_2m_min":[10.8,8.2,15.5,17.2,16.0,13.8,8.7],"precipitation_sum":[3.40,0.80,35.10,134.20,7.20,9.30,0.00]}}`;


  const promptForecast = `
  
  Abaixo está a previsão do tempo do que iremos chamar de Enchente de 2024. Ela tem informações sobre o período de 29 de abril de 2024 até 03 de maio de 2024.

== CONTEXTO DA ENCHENTE DE 2024

Contexto sinóptico (29 de abril → 3 de maio de 2024)
Cavado profundo + jato de baixos níveis canalizaram ar úmido da Amazônia sobre o RS.

Uma frente quase estacionária ficou ancorada no Centro-Sul do estado; sucessivos núcleos convectivos se formaram sobre as bacias do Jacuí e avançaram para o Guaíba.

O INMET emitiu 26 avisos de tempo severo entre 26/4 e 5/5; o 1.º aviso vermelho (chuva > 100 mm/24 h) saiu em 29/4, cobrindo praticamente todo o Rio Grande do Sul.

O que as previsões indicavam – e o que de fato ocorreu
Dia	Previsão dominante (modelos + boletins)	Observado nos pontos-chave da bacia*
29/04 (seg)	100–150 mm em 24 h no Centro/Leste do RS; risco de cheias rápidas	Santa Maria quebrou recorde secular: 213,6 mm/24 h; alagamentos já em Santa Cruz, Venâncio e Salto do Jacuí
30/04 (ter)	Frente quase parada; mais 100 mm no Jacuí médio; rajadas > 60 km/h	Precipitação localmente superou 200 mm; RS contabiliza primeiras mortes em Paverama
01/05 (qua)	Persistência dos núcleos; acumulados extras de 70–120 mm	Estações de Cachoeira, São Jerônimo e Candelária passam dos 300 mm acumulados desde 29/04
02/05 (qui)	Core da chuva migra para o baixo Jacuí e RM-POA; 100 mm adicionais previstos	Caxias marca 266,2 mm/24 h (novo recorde); Jacuí entra em regime de cheia histórica
03/05 (sex)	Tendência de redução gradual, mas ainda 50–80 mm junto ao Guaíba	Lago Guaíba atinge 4,77 m às 21 h, superando 1941; Porto Alegre começa a inundar

*Valores referem-se ao período 29 abr → 3 mai. Totais acumulados em Salto do Jacuí ultrapassaram 650 mm até 4/5.

Desdobramentos hidrológicos
Rio Jacuí: pico de 28,48 m em Cachoeira do Sul na manhã de 4 / 5 (1,98 m acima de 1941). A cheia propagou-se rio abaixo, elevando rapidamente o Guaíba.

Porto Alegre / Lago Guaíba: recorde preliminar de 4,77 m em 3 / 5; dias depois chegaria a 5,3 m.

A sobre-carga simultânea dos rios Jacuí, Taquari, Caí, Sinos e Gravataí foi decisiva para o transbordamento do sistema Guaíba.

Acurácia e limitações das previsões
Magnitude identificada – Já nos boletins de 28-29/4, os modelos globais (ECMWF, GFS) e o INMET convergiam para totais > 100 mm/dia; o aviso vermelho acertou a sinalização de chuva extrema.

Sub-estimativa local – Mesmo com cenários agressivos, estimativas ficaram 20-40 % abaixo dos picos reais de 24 h em Santa Maria, Caxias e Vale do Taquari, reflexo da dificuldade em resolver convecção orográfica e feedbacks do solo saturado.

Persistência bem captada – A anomalia de bloqueio atmosférico estava nos campos de altura geopotencial desde 26/4; isso ajudou os modelos a manter a chuva estacionária sobre o Jacuí por cinco dias seguidos.

Comunicação de risco – Defesa Civil e municípios acionaram planos de contingência, mas a escala da inundação ultrapassou os padrões de 1941, deixando barreiras de proteção e casas de bombas subdimensionadas.

Síntese para o período 29 / 4 → 3 / 5 / 2024
Volumetria: 300–500 mm generalizados; picos > 600 mm em afluentes do Alto Jacuí.

Ventania: rajadas de 60–80 km/h associadas à baixa pressão.

Temperatura: máxima variando de 18 °C (sob chuva) a 24 °C nos intervalos secos; mínimas sem frio intenso.

Impacto: maior desastre hidrometeorológico do RS; calha do Jacuí rompeu marcas de 1941; Porto Alegre permaneceu inundada por semanas.

Em resumo, as previsões acertaram a persistência e a severidade geral do evento, mas sub-estimaram os extremos locais e a resposta hidrológica em cadeia nas bacias que alimentam o Guaíba — fator que acabou definindo a catástrofe histórica de maio de 2024.

== FIM DO CONTEXTO DA ENCHENTE DE 2024


E abaixo está o JSON com a previsão do tempo para os próximos dias:


== JSON PREVISÃO PRÓXIMOS DIAS

${meteo}

== FIM JSON PREVISÃO PRÓXIMOS DIAS


Atue como um meteorologista experiente, e de informações sobre a previsão dos próximos dias em comparação com a enchente de 2024. Objetivo não é saber se vai chover ou fazer sol nos próximos dias, mas sim saber a diferença entre a previsão dos próximos dias em comparação com a enchente de 2024.

Não use termos técnicos, fale para que pessoas comuns que não estudaram meteorologia consigam entender facilmente a diferença.

Faça uma comparação, mas sem frisar que está comparando, da precisão do tempo da enchente de 2024, e entre hoje e os próximos 4 dias, avaliando a possível severidade da condição climática. Sem usar tabelas, faça apenas um pequeno resumo em texto, e depois pequenos tópicos dos motivos de estar pior ou melhor.

Não use termos técnicos, seja sucinto.

Não explique as condições da enchente de 2024. 

Responda apenas com:
– Um pequeno resumo direto sem título, sem introdução nem conclusão.
– Depois, apenas os tópicos com os motivos de estar pior ou melhor. Nos tópicos use negrito se fizer sentido. Utilize o titulo "Diferenças para a Enchente de 2024" para os tópicos.

Não escreva frases explicativas ou voltadas ao "morador comum". Não contextualize. Apenas cumpra a estrutura acima.
`;


const prompt = [
  { role: "user", content: promptForecast }   // tudo em uma só
];


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

  // 3. Grava HTML em /public/index.html
  const ts = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const html = `<!DOCTYPE html><html lang="pt-BR"><meta charset="utf-8">
  <title>Boletim Jacuí – ${ts}</title>
  <style>body{font-family:system-ui,Arial,sans-serif;margin:2rem;line-height:1.4}</style>
  <h1>Boletim Hidrometeorológico – Bacia do Jacuí</h1>
  <div>${ts} (BRT)</div><p>${htmlBody}</p>`;
  writeFileSync(resolve(publicDir, "index.html"), html);
}

main().catch(err => { console.error(err); process.exit(1); });
