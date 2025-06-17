# Previsão do tempo para o Rio Grande do Sul em comparação a enchente de 2024

Sistema automatizado de monitoramento da região da Bacia do Rio Jacuí com comparações em relação à enchente histórica de 2024.

A última previsão gerada pode ser acessado em https://marcelomartins.github.io/previsao-rs/

## 📋 Sobre o Projeto

Este projeto gera previsões diárias para a região da Bacia do Rio Jacuí, no Rio Grande do Sul. O sistema utiliza dados meteorológicos em tempo real e inteligência artificial para comparar as condições atuais com o evento extremo da enchente de maio de 2024, oferecendo uma análise compreensível para o público geral.

## ⚠️ Aviso Importante

Esta comparação é gerada por inteligência artificial e tem caráter apenas informativo. Para previsões meteorológicas oficiais e situações de emergência, consulte sempre os órgãos responsáveis como <a href="https://portal.inmet.gov.br/" target="_blank">INMET</a> e <a href="https://www.defesacivil.rs.gov.br/" target="_blank">Defesa Civil</a>.

## 🎯 Características

- **Análise Automatizada**: Coleta dados meteorológicos da API Open-Meteo
- **Comparação Histórica**: Compara condições atuais com a enchente de 2024
- **Linguagem Acessível**: Relatórios sem jargões técnicos para fácil compreensão
- **Atualização Diária**: Geração automática de boletins através do GitHub Actions

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **OpenAI API** - Análise inteligente dos dados meteorológicos
- **Open-Meteo API** - Dados meteorológicos em tempo real
- **GitHub Pages** - Hospedagem da página web
- **GitHub Actions** - Automação e deploy

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20 ou superior
- Chave da API OpenAI configurada como variável de ambiente

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd previsao-rs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a variável de ambiente:
```bash
$env:OPENAI_API_KEY="sua-chave-api-aqui"  # Windows PowerShell
```

4. Execute o gerador:
```bash
npm run build
```

5. Abra o arquivo `public/index.html` no navegador

## 📊 Dados Meteorológicos

O sistema coleta os seguintes parâmetros da estação meteorológica da região de Porto Alegre (latitude: -29.94, longitude: -51.72):

- **Horários**: Altura geopotencial, CAPE, vento, precipitação, temperatura
- **Diários**: Código do tempo, temperaturas máxima/mínima, soma de precipitação
- **Previsão**: 120 horas (5 dias) no fuso horário de São Paulo

## 🔄 Automação

O projeto utiliza GitHub Actions para:

- Execução diária às 07:00 (horário de Brasília)
- Geração automática da previsão
- Deploy na GitHub Pages
- Possibilidade de execução manual

## 📖 Contexto Histórico

O sistema usa como referência a enchente histórica de abril-maio de 2024, que:

- Registrou 300-500mm de chuva generalizada
- Causou o maior desastre hidrometeorológico do RS
- Superou os recordes de 1941 na calha do Jacuí
- Manteve Porto Alegre inundada por semanas

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Melhorar a documentação

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## ⚠️ Aviso Importante

Este sistema é para fins informativos e educacionais. Para situações de emergência ou decisões críticas relacionadas ao clima, consulte sempre fontes oficiais como INMET, Defesa Civil e órgãos competentes.


