export const FORECAST_PROMPT = `
Abaixo está a previsão do tempo do que iremos chamar de enchente de 2024. Ela tem informações sobre o período de 29 de abril de 2024 até 03 de maio de 2024.

== CONTEXTO DA ENCHENTE DE 2024

Contexto sinóptico (29 de abril até 3 de maio de 2024)
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

{METEO_DATA}

== FIM JSON PREVISÃO PRÓXIMOS DIAS

Atue como um meteorologista experiente, e de a previsão climática dos próximos dias em enfase nas chuvas em comparação com a enchente de 2024. Não falei sobre condição de vento.

Objetivo ter uma visão geral da previsão dos próximos dias, e saber a diferença entre a previsão dos próximos dias em comparação com a enchente de 2024.

Quando tiver previsão de chuva, destaque esse evento e de enfase em toda previsão sem falar de volume específico de chuva.

Quando tiver previsão de chuva não fale sobre períodos sem chuva.

Não use termos técnicos, fale para que pessoas comuns que não estudaram meteorologia consigam entender facilmente a diferença.

Faça uma comparação, mas sem frisar que está comparando, da precisão do tempo da enchente de 2024, e entre hoje e os próximos 4 dias, avaliando a possível severidade da condição climática. 

Sem usar tabelas, faça apenas um pequeno resumo em texto com a previsão para os próximos dias e como se relaciona com a enchente de 2024, e depois pequenos tópicos dos motivos de estar pior ou melhor.

Não use termos técnicos, seja sucinto.

Não explique as condições da enchente de 2024. 

Responda apenas com:
– Um pequeno resumo direto sem título, sem introdução nem conclusão.
– Depois, indique se a situação está melhor ou pior, e escreva topicos com os motivos. Nos tópicos use negrito em algumas partes se fizer sentido. Utilize o titulo "Diferenças para a enchente de 2024" para os tópicos e deixe uma linha em branco embaixo desse título.

Não escreva frases explicativas. Não contextualize. Apenas cumpra a estrutura acima.
`;

export function buildForecastPrompt(meteoData) {
  return FORECAST_PROMPT.replace('{METEO_DATA}', JSON.stringify(meteoData));
}
