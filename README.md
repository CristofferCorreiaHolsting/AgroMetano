# AgroMetano

> **Plataforma de monitoramento e análise das emissões de metano (CH₄) do agronegócio brasileiro.**

![Status](https://img.shields.io/badge/dados-SEEG%202023-22c55e?style=flat-square)
![Tecnologia](https://img.shields.io/badge/tech-HTML%20%2F%20CSS%20%2F%20JS-0d150d?style=flat-square&color=22c55e)
![Idioma](https://img.shields.io/badge/idioma-Português%20(BR)-22c55e?style=flat-square)

---

## Sobre o Projeto

O **AgroMetano** é uma plataforma educativa e de dados interativos focada nos efeitos das emissões de metano (CH₄) no campo brasileiro. O site apresenta dados do SEEG 2023 de forma visual, permitindo que produtores rurais, pesquisadores e cidadãos entendam o impacto climático do agronegócio e explorem soluções de mitigação.

> O Brasil é o **4º maior emissor de metano do mundo**, com mais de **73% das emissões** provenientes do agronegócio.

---

## Funcionalidades

### Hero / Página Inicial
- Badge de status ao vivo ("Dados atualizados · SEEG 2023")
- Alerta contextual com dados nacionais de emissões
- Painel lateral com mini-cards de métricas rápidas (GWP CH₄, participação do agro, redução possível)
- Pílulas de funcionalidades disponíveis no site

### Estatísticas em Destaque
- **667 Mt CO₂e/ano** — total de emissões do Brasil
- **73,4%** — participação do agronegócio nas emissões de CH₄
- **-30%** — redução de emissões possível com tecnologias já disponíveis
- **GWP 28×** — poder de aquecimento do metano em relação ao CO₂

### Área Educativa
Seção com três abas de conteúdo aprofundado:

#### Aba 1 — O que é CH₄
- Infográfico animado da molécula de metano (SVG interativo)
- Gráfico das fontes de emissão no Brasil (fermentação entérica, resíduos, energia, dejetos, queima de biomassa)
- Explicação do **GWP (Global Warming Potential)** com comparativo entre gases (CO₂, CH₄, N₂O, SF₆)
- Cards detalhados das 5 principais fontes de emissão agropecuária:
  - Fermentação Entérica
  - Dejetos Animais
  - Cultivo de Arroz Alagado
  - Queima de Resíduos Agrícolas
  - Biodigestão sem Captura
- Link para vídeo do YouTube sobre CH₄ vs CO₂

#### Aba 2 — Impactos
- Visualização em cascata dos efeitos do metano no planeta (5 etapas interativas)
- Dados de impacto específicos para o Brasil
- Gráfico de barras comparando emissões por tipo de fonte

#### Aba 3 — Mitigação
- Conteúdo sobre políticas e compromissos climáticos

### Calculadora de Emissões
Ferramenta interativa que estima as emissões anuais de CH₄ com base no perfil do rebanho:

| Animal | Fator de Emissão |
|---|---|
| Bovinos de corte | ~56 kg CH₄/ano |
| Bovinos de leite | ~128 kg CH₄/ano |
| Búfalos | ~55 kg CH₄/ano |
| Ovinos | ~8 kg CH₄/ano |
| Caprinos | ~5 kg CH₄/ano |
| Suínos | ~5 kg CH₄/ano |
| Equinos / Muares | ~18 kg CH₄/ano |
| Aves | ~0,1 kg CH₄/ano |

Resultado exibido em **toneladas de CH₄/ano** e **t CO₂e/ano** (GWP-100), com barras visuais por categoria.

### Contador em Tempo Real
Painel ao vivo que exibe:
- Emissões acumuladas no ano corrente (atualização a cada segundo)
- Taxa de emissão por segundo, por minuto e por hora
- Projeção anual
- Distribuição por região (Centro-Oeste, Sudeste, Norte, Nordeste, Sul)

### ️ Mapa Interativo por Estado
- Visualização das emissões de CH₄ por estado (dados do SEEG)
- Abertura de painel com gráfico SVG customizado ao clicar em um estado
- Dados históricos de emissões (2010–2023)

### ⇄ Comparador de Estados
Ferramenta que permite comparar dois estados brasileiros lado a lado:
- KPIs com emissão total (Mt CO₂e) e ranking nacional
- Barras comparativas animadas
- Gráfico histórico de evolução (2010–2023) via Chart.js
- Métricas de crescimento acumulado e CAGR
- Fonte principal de emissão por estado
- Insight automático sobre qual estado emite mais e a diferença percentual

### Soluções Sustentáveis
Cards com 6 boas práticas agropecuárias e seus impactos quantificados:

| Solução | Resultado |
|---|---|
| Biodigestores | Redução de até 90% do CH₄; potencial de 55 Mt CO₂e/ano no BR |
| Recuperação de Pastagens | Redução estimada de ~180 Mt CO₂e/ano; 50 mi ha degradados |
| ILPF (Integração Lavoura-Pecuária-Floresta) | 15–30% de redução por animal; 17 mi ha adotados no BR |
| Aditivos e Manejo Alimentar | Inibição das arqueas metanogênicas no rúmen |
| Crédito de Carbono | Monetização das reduções via mercado voluntário |
| Manejo de Arroz | Técnicas de drenagem intermitente para arrozais |


### Sistema de Autenticação (AINDA NÃO DISPONÍVEL!)
- Cadastro em 2 etapas:
  1. Nome, e-mail e senha (validação em tempo real com animação de shake)
  2. Perfil do produtor: estado e tamanho da propriedade (em hectares)
- Login com e-mail e senha
- **Login social via Google (Google Identity Services)**
- Toast de boas-vindas animado após autenticação
- Alternância fluida entre modais de login e cadastro

---

## ️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 + CSS3 | Estrutura e estilização |
| JavaScript (Vanilla) | Interatividade, cálculos e animações |
| Chart.js | Gráficos históricos no comparador de estados |
| Google Fonts | Tipografia: `Playfair Display` + `DM Sans` |
| Google Identity Services | Login social com Google OAuth |
| SVG | Infográficos e molécula animada |

---

## Estrutura do Arquivo

O projeto é composto por um único arquivo `AgroMetano.html` (~2.900 linhas), com CSS e JavaScript embutidos:

```
AgroMetano.html
├── <head>         — Meta tags, fontes e estilos globais
├── <nav>          — Barra de navegação com logo e botão de login
├── <section.hero> — Seção principal com título, métricas e CTAs
├── .stats-enhanced — Painel de estatísticas em destaque
├── #educativa      — Área educativa com 3 abas (CH₄, Impactos, Mitigação)
├── Comparador de estados — Ferramenta de comparação interativa
├── Contador em tempo real — Painel de emissões ao vivo
├── Calculadora     — Estimativa de emissões por tipo de animal
├── Soluções Sustentáveis — Cards de boas práticas
├── Modais          — Login, Cadastro (step 1 e 2)
└── <footer>        — Rodapé com links
```

---

## Fonte dos Dados

- **SEEG 2023** — Sistema de Estimativas de Emissões e Remoções de Gases de Efeito Estufa (Observatório do Clima)
- **IPCC AR6** — Dados de GWP (Global Warming Potential) dos gases
- Dados históricos por estado: 2010–2023 (em Mt CO₂e)

---

## Como Usar

Por ser um arquivo HTML único e autocontido, basta abrir no navegador:


# Opção 1: Clique no link
Clique duas vezes em [AgroMetano.html](https://agro-metano-tgwu.vercel.app/)



> **Nota:** A funcionalidade de login com Google requer conexão à internet e o domínio configurado no Google Cloud Console como origem autorizada.

---

## Contexto e Objetivo

O AgroMetano foi desenvolvido com foco em **educação climática** e **transparência de dados**, direcionado a:

- **Produtores rurais** — que podem calcular e entender suas próprias emissões
- **Pesquisadores e estudantes** — com dados históricos e comparativos por estado
- **Formuladores de políticas** — com visão panorâmica do cenário nacional
- **Público geral** — com conteúdo acessível sobre o papel do agronegócio no clima

---

## Licença
Este projeto é de uso educativo. Os dados apresentados são baseados em fontes públicas (SEEG/Observatório do Clima e IPCC).
