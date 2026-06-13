
function switchTab(id, btn) {
  document.querySelectorAll('.edu-panel').forEach(p => p.style.display = 'none');
  document.getElementById('edu-tab-' + id).style.display = 'block';
  document.querySelectorAll('.edu-tab').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#6b7c6b';
  });
  btn.style.background = 'rgba(34,197,94,0.12)';
  btn.style.color = '#22c55e';
}



(function(){
  // Dados completos para o comparador
  const cmpData = {
    emissoes: {
      'Acre':18.0,'Alagoas':7.5,'Amapá':4.2,'Amazonas':16.5,'Bahia':36.4,
      'Ceará':12.4,'Distrito Federal':1.8,'Espírito Santo':8.2,'Goiás':59.6,
      'Maranhão':22.0,'Mato Grosso':88.9,'Mato Grosso do Sul':45.2,'Minas Gerais':59.2,
      'Pará':55.1,'Paraíba':8.8,'Paraná':11.8,'Pernambuco':13.5,'Piauí':13.0,
      'Rio de Janeiro':9.1,'Rio Grande do Norte':9.5,'Rio Grande do Sul':45.7,
      'Rondônia':35.8,'Roraima':7.0,'Santa Catarina':12.0,'São Paulo':31.0,
      'Sergipe':6.3,'Tocantins':28.5
    },
    fonte: {
      'Acre':'Fermentação entérica bovina','Alagoas':'Fermentação entérica bovina',
      'Amapá':'Desmatamento e uso da terra','Amazonas':'Desmatamento e uso da terra',
      'Bahia':'Fermentação entérica bovina','Ceará':'Fermentação entérica bovina',
      'Distrito Federal':'Dejetos animais (suinocultura)','Espírito Santo':'Fermentação entérica bovina',
      'Goiás':'Fermentação entérica bovina','Maranhão':'Fermentação entérica bovina',
      'Mato Grosso':'Fermentação entérica bovina','Mato Grosso do Sul':'Fermentação entérica bovina',
      'Minas Gerais':'Fermentação entérica bovina','Pará':'Desmatamento e uso da terra',
      'Paraíba':'Fermentação entérica bovina','Paraná':'Dejetos animais (suinocultura)',
      'Pernambuco':'Fermentação entérica bovina','Piauí':'Fermentação entérica bovina',
      'Rio de Janeiro':'Aterros sanitários e resíduos','Rio Grande do Norte':'Fermentação entérica bovina',
      'Rio Grande do Sul':'Cultivo de arroz irrigado','Rondônia':'Desmatamento e uso da terra',
      'Roraima':'Desmatamento e uso da terra','Santa Catarina':'Dejetos animais (suinocultura)',
      'São Paulo':'Aterros sanitários e resíduos','Sergipe':'Fermentação entérica bovina',
      'Tocantins':'Fermentação entérica bovina'
    },
    regiao: {
      'Acre':'Norte','Alagoas':'Nordeste','Amapá':'Norte','Amazonas':'Norte',
      'Bahia':'Nordeste','Ceará':'Nordeste','Distrito Federal':'Centro-Oeste',
      'Espírito Santo':'Sudeste','Goiás':'Centro-Oeste','Maranhão':'Nordeste',
      'Mato Grosso':'Centro-Oeste','Mato Grosso do Sul':'Centro-Oeste',
      'Minas Gerais':'Sudeste','Pará':'Norte','Paraíba':'Nordeste',
      'Paraná':'Sul','Pernambuco':'Nordeste','Piauí':'Nordeste',
      'Rio de Janeiro':'Sudeste','Rio Grande do Norte':'Nordeste',
      'Rio Grande do Sul':'Sul','Rondônia':'Norte','Roraima':'Norte',
      'Santa Catarina':'Sul','São Paulo':'Sudeste','Sergipe':'Nordeste',
      'Tocantins':'Norte'
    }
  };

  const estados = Object.keys(cmpData.emissoes).sort();
  const maxVal = Math.max(...Object.values(cmpData.emissoes));

  // Preenche os selects
  ['cmp-estado-a','cmp-estado-b'].forEach((id,idx) => {
    const sel = document.getElementById(id);
    estados.forEach(nome => {
      const opt = document.createElement('option');
      opt.value = nome; opt.textContent = nome;
      opt.style.background = '#0d150d';
      sel.appendChild(opt);
    });
    // sem seleção inicial — usuário escolhe
    sel.value = '';
  });

  // Dados históricos reais por estado — SEEG/Observatório do Clima (MtCO₂e)
  // Anos: 2010 2011 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022 2023
  const historicoReal = {
    'Mato Grosso':        [62.1,64.8,67.3,70.1,73.5,75.8,78.2,80.4,82.1,83.6,85.0,86.3,87.5,88.9],
    'Goiás':              [42.1,44.0,45.8,47.3,49.1,50.7,52.4,54.0,55.5,56.8,57.6,58.1,58.9,59.6],
    'Minas Gerais':       [43.5,44.8,46.0,47.1,48.3,49.4,50.5,51.8,53.0,54.2,55.5,56.8,58.0,59.2],
    'Pará':               [38.2,40.1,41.8,43.5,45.2,46.9,48.3,49.8,51.0,52.4,53.5,54.0,54.6,55.1],
    'Rio Grande do Sul':  [38.0,39.2,40.1,41.0,41.8,42.5,43.1,43.8,44.2,44.6,44.9,45.1,45.4,45.7],
    'Mato Grosso do Sul': [31.0,32.5,34.0,35.5,37.0,38.5,40.0,41.2,42.3,43.2,44.0,44.5,44.9,45.2],
    'Bahia':              [25.8,26.9,28.0,29.2,30.3,31.4,32.5,33.4,34.2,34.8,35.2,35.6,36.0,36.4],
    'Rondônia':           [22.1,24.0,25.8,27.4,28.9,30.2,31.4,32.5,33.4,34.2,34.8,35.2,35.5,35.8],
    'São Paulo':          [24.5,25.1,25.7,26.3,26.8,27.4,28.0,28.6,29.1,29.6,30.0,30.3,30.7,31.0],
    'Tocantins':          [19.5,20.5,21.4,22.3,23.2,24.0,24.8,25.5,26.2,26.8,27.3,27.7,28.1,28.5],
    'Maranhão':           [15.0,15.8,16.6,17.4,18.2,18.9,19.5,20.1,20.6,21.0,21.4,21.7,21.9,22.0],
    'Pernambuco':         [9.8,10.2,10.6,11.0,11.4,11.7,12.0,12.3,12.6,12.8,13.0,13.2,13.4,13.5],
    'Piauí':              [9.5,9.9,10.2,10.5,10.8,11.1,11.4,11.7,12.0,12.3,12.5,12.7,12.9,13.0],
    'Ceará':              [9.1,9.4,9.7,10.0,10.3,10.6,10.9,11.2,11.5,11.8,12.0,12.2,12.3,12.4],
    'Santa Catarina':     [8.5,8.9,9.2,9.5,9.8,10.1,10.4,10.7,11.0,11.3,11.5,11.7,11.9,12.0],
    'Paraná':             [8.2,8.5,8.8,9.1,9.4,9.7,10.0,10.3,10.6,10.9,11.1,11.4,11.6,11.8],
    'Acre':               [12.3,12.8,13.3,13.8,14.4,15.0,15.5,16.0,16.4,16.8,17.1,17.4,17.7,18.0],
    'Amazonas':           [11.0,11.5,12.0,12.6,13.1,13.6,14.1,14.6,15.0,15.4,15.7,16.0,16.3,16.5],
    'Rio Grande do Norte':[6.8,7.1,7.3,7.5,7.7,7.9,8.1,8.4,8.7,8.9,9.1,9.2,9.4,9.5],
    'Rio de Janeiro':     [7.2,7.4,7.6,7.8,8.0,8.2,8.4,8.6,8.8,8.9,9.0,9.0,9.1,9.1],
    'Paraíba':            [6.4,6.6,6.8,7.0,7.2,7.4,7.6,7.8,8.0,8.2,8.4,8.5,8.7,8.8],
    'Espírito Santo':     [6.0,6.2,6.4,6.6,6.8,7.0,7.2,7.5,7.7,7.9,8.0,8.1,8.1,8.2],
    'Alagoas':            [5.5,5.7,5.9,6.1,6.3,6.5,6.7,6.9,7.1,7.2,7.3,7.4,7.5,7.5],
    'Roraima':            [4.5,4.8,5.0,5.2,5.4,5.6,5.8,6.0,6.2,6.4,6.6,6.8,6.9,7.0],
    'Amapá':              [3.0,3.1,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.0,4.1,4.1,4.2],
    'Sergipe':            [4.5,4.7,4.9,5.1,5.3,5.5,5.7,5.9,6.0,6.1,6.2,6.2,6.3,6.3],
    'Distrito Federal':   [1.2,1.3,1.3,1.4,1.4,1.5,1.5,1.6,1.6,1.7,1.7,1.8,1.8,1.8],
  };
  const historicoAnos = ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];

  function historico(nome) { return historicoReal[nome] || []; }

  function crescimento(nome) {
    const h = historico(nome);
    if (!h.length) return 0;
    return +(((h[h.length-1] - h[0]) / h[0]) * 100).toFixed(1);
  }

  function cagr(nome) {
    const h = historico(nome);
    if (!h.length) return 0;
    return +(((Math.pow(h[h.length-1]/h[0], 1/13)) - 1) * 100).toFixed(2);
  }

  let cmpChart = null;

  window.renderComparador = function() {
    const nA = document.getElementById('cmp-estado-a').value;
    const nB = document.getElementById('cmp-estado-b').value;

    if (!nA || !nB) {
      document.getElementById('cmp-resultado').style.display = 'none';
      document.getElementById('cmp-placeholder').style.display = 'block';
      return;
    }

    document.getElementById('cmp-resultado').style.display = 'block';
    document.getElementById('cmp-placeholder').style.display = 'none';

    const vA = cmpData.emissoes[nA], vB = cmpData.emissoes[nB];
    const maior = vA >= vB ? nA : nB;
    const diff = Math.abs(vA - vB);
    const pctDiff = ((diff / Math.min(vA,vB)) * 100).toFixed(0);

    // KPI cards
    const kpiRow = document.getElementById('cmp-kpi-row');
    kpiRow.innerHTML = '';
    [[nA,vA,'#22c55e'],[nB,vB,'#4ade80']].forEach(([nome,val,cor]) => {
      const sorted = Object.values(cmpData.emissoes).sort((a,b)=>b-a);
      const rank = sorted.indexOf(val) + 1;
      kpiRow.innerHTML += `
        <div style="background:#0d150d;border:1.5px solid ${cor}22;border-radius:6px;padding:1.5rem;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:${cor};margin-bottom:0.5rem;">${nome}</div>
          <div style="font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:${cor};line-height:1;">${val.toFixed(1)}<span style="font-size:13px;color:#6b7c6b;margin-left:5px;">Mt CO₂e</span></div>
          <div style="font-size:12px;color:#6b7c6b;margin-top:8px;">#${rank} de 27 estados &nbsp;·&nbsp; ${cmpData.regiao[nome]}</div>
        </div>`;
    });

    // Barras
    document.getElementById('cmp-bar-a-label').textContent = nA;
    document.getElementById('cmp-bar-a-val').textContent = vA.toFixed(1) + ' Mt';
    document.getElementById('cmp-bar-b-label').textContent = nB;
    document.getElementById('cmp-bar-b-val').textContent = vB.toFixed(1) + ' Mt';
    setTimeout(() => {
      document.getElementById('cmp-bar-a').style.width = ((vA/maxVal)*100)+'%';
      document.getElementById('cmp-bar-b').style.width = ((vB/maxVal)*100)+'%';
    }, 50);

    // Gráfico histórico com dados reais
    const hA = historico(nA), hB = historico(nB);
    if (cmpChart) { cmpChart.destroy(); cmpChart = null; }
    const ctx = document.getElementById('cmp-chart').getContext('2d');
    cmpChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicoAnos,
        datasets: [
          {
            label: nA,
            data: hA,
            borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)',
            borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#22c55e',
            pointBorderColor: '#0d150d', pointBorderWidth: 2, pointHoverRadius: 8,
            fill: true, tension: 0.35
          },
          {
            label: nB,
            data: hB,
            borderColor: '#86efac', backgroundColor: 'rgba(134,239,172,0.06)',
            borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#86efac',
            pointBorderColor: '#0d150d', pointBorderWidth: 2, pointHoverRadius: 8,
            fill: true, tension: 0.35
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: '#c8e6c8', font: { size: 12, family: 'DM Sans' }, boxWidth: 12, padding: 16 } },
          tooltip: {
            backgroundColor: '#0d1f14', borderColor: 'rgba(74,222,128,0.3)', borderWidth: 1,
            titleColor: '#a8f0b0', bodyColor: '#c8e6c8', padding: 12,
            callbacks: {
              title: items => 'Ano: ' + items[0].label,
              label: function(ctx) {
                const h = ctx.datasetIndex === 0 ? hA : hB;
                const i = ctx.dataIndex;
                const val = h[i];
                const prev = i > 0 ? h[i-1] : null;
                const delta = prev !== null ? (val - prev).toFixed(1) : null;
                const sign = delta > 0 ? '+' : '';
                return '  ' + ctx.dataset.label + ': ' + val + ' Mt' + (delta !== null ? '  (' + sign + delta + ')' : '');
              }
            }
          }
        },
        scales: {
          y: { grid: { color: 'rgba(34,197,94,0.07)' }, ticks: { color: '#9ab89a', font: { size: 11 }, callback: v => v + ' Mt' },
              title: { display: true, text: 'MtCO₂e', color: '#6b7c6b', font: { size: 11 } } },
          x: { ticks: { color: '#9ab89a', font: { size: 11 } }, grid: { display: false } }
        }
      }
    });

    // Métricas de crescimento e tabela
    const crA = crescimento(nA), crB = crescimento(nB);
    const cagrA = cagr(nA), cagrB = cagr(nB);
    document.getElementById('cmp-growth-metrics').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:#071209;border:1px solid rgba(34,197,94,0.18);border-radius:6px;padding:1rem 1.25rem;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#22c55e;margin-bottom:0.75rem;font-weight:600;">${nA}</div>
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
            <div><div style="font-size:11px;color:#6b7c6b;">Crescimento total</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#22c55e;">+${crA}%</div>
              <div style="font-size:10px;color:#6b7c6b;">2010 → 2023</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">CAGR</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#22c55e;">${cagrA}%<span style="font-size:11px">/a</span></div>
              <div style="font-size:10px;color:#6b7c6b;">ao ano</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">2010</div>
              <div style="font-size:1rem;font-weight:600;color:#9ab89a;font-family:'DM Mono',monospace;">${hA[0]} Mt</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">2023</div>
              <div style="font-size:1rem;font-weight:600;color:#22c55e;font-family:'DM Mono',monospace;">${hA[hA.length-1]} Mt</div></div>
          </div>
        </div>
        <div style="background:#071209;border:1px solid rgba(134,239,172,0.18);border-radius:6px;padding:1rem 1.25rem;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#86efac;margin-bottom:0.75rem;font-weight:600;">${nB}</div>
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
            <div><div style="font-size:11px;color:#6b7c6b;">Crescimento total</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#86efac;">+${crB}%</div>
              <div style="font-size:10px;color:#6b7c6b;">2010 → 2023</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">CAGR</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#86efac;">${cagrB}%<span style="font-size:11px">/a</span></div>
              <div style="font-size:10px;color:#6b7c6b;">ao ano</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">2010</div>
              <div style="font-size:1rem;font-weight:600;color:#9ab89a;font-family:'DM Mono',monospace;">${hB[0]} Mt</div></div>
            <div><div style="font-size:11px;color:#6b7c6b;">2023</div>
              <div style="font-size:1rem;font-weight:600;color:#86efac;font-family:'DM Mono',monospace;">${hB[hB.length-1]} Mt</div></div>
          </div>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:11px;font-family:'DM Mono',monospace;min-width:700px;">
          <thead><tr>
            <th style="text-align:left;padding:7px 10px;border-bottom:1px solid rgba(34,197,94,0.15);color:#6b7c6b;font-weight:500;">Estado</th>
            ${historicoAnos.map(y=>'<th style="text-align:center;padding:7px 5px;border-bottom:1px solid rgba(34,197,94,0.15);color:#6b7c6b;font-weight:500;">'+y+'</th>').join('')}
          </tr></thead>
          <tbody>
            <tr>
              <td style="padding:7px 10px;color:#22c55e;font-weight:600;border-bottom:1px solid rgba(34,197,94,0.07);white-space:nowrap;">${nA}</td>
              ${hA.map((v,i)=>{const prev=i>0?hA[i-1]:null;const delta=prev!=null?(v-prev):null;const col=delta==null?'#9ab89a':delta>0?'#f87171':'#4ade80';return '<td style="text-align:center;padding:7px 5px;color:#c8e6c8;border-bottom:1px solid rgba(34,197,94,0.07);">'+v+'<br><span style="font-size:9px;color:'+col+'">'+(delta!=null?(delta>0?'▲':'▼')+Math.abs(delta).toFixed(1):'')+'</span></td>';}).join('')}
            </tr>
            <tr>
              <td style="padding:7px 10px;color:#86efac;font-weight:600;white-space:nowrap;">${nB}</td>
              ${hB.map((v,i)=>{const prev=i>0?hB[i-1]:null;const delta=prev!=null?(v-prev):null;const col=delta==null?'#9ab89a':delta>0?'#f87171':'#4ade80';return '<td style="text-align:center;padding:7px 5px;color:#c8e6c8;">'+v+'<br><span style="font-size:9px;color:'+col+'">'+(delta!=null?(delta>0?'▲':'▼')+Math.abs(delta).toFixed(1):'')+'</span></td>';}).join('')}
            </tr>
          </tbody>
        </table>
      </div>`;

    // Detalhes
    [[nA,'cmp-detail-a','#22c55e'],[nB,'cmp-detail-b','#4ade80']].forEach(([nome,elId,cor]) => {
      const val = cmpData.emissoes[nome];
      const pct = ((val/maxVal)*100).toFixed(0);
      document.getElementById(elId).innerHTML = `
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:${cor};margin-bottom:0.75rem;font-weight:500;">${nome}</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div>
            <div style="font-size:11px;color:#6b7c6b;margin-bottom:2px;">Principal fonte emissora</div>
            <div style="font-size:13px;color:#e8f5e9;font-weight:500;line-height:1.4;">${cmpData.fonte[nome]}</div>
          </div>
          <div>
            <div style="font-size:11px;color:#6b7c6b;margin-bottom:2px;">Região</div>
            <div style="font-size:13px;color:#e8f5e9;">${cmpData.regiao[nome]}</div>
          </div>
          <div>
            <div style="font-size:11px;color:#6b7c6b;margin-bottom:2px;">Intensidade relativa</div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="flex:1;height:6px;background:rgba(34,197,94,0.08);border-radius:999px;overflow:hidden;">
                <div style="width:${pct}%;height:100%;background:${cor};border-radius:999px;"></div>
              </div>
              <span style="font-size:12px;color:${cor};font-family:'DM Mono',monospace;font-weight:600;">${pct}%</span>
            </div>
          </div>
        </div>`;
    });

    // Insight
    const emoji = vA > vB ? '⚠️' : '✅';
    document.getElementById('cmp-insight').innerHTML = `
      <div style="font-size:1.5rem;flex-shrink:0;">${emoji}</div>
      <div>
        <div style="font-size:13px;font-weight:600;color:#e8f5e9;margin-bottom:4px;">
          ${maior} emite ${pctDiff}% mais que ${maior===nA?nB:nA}
        </div>
        <div style="font-size:13px;color:#6b7c6b;line-height:1.6;">
          Diferença de <span style="color:#4ade80;font-weight:600;">${diff.toFixed(1)} Mt CO₂e</span>.
          ${cmpData.fonte[nA]===cmpData.fonte[nB]
            ? `Ambos têm a mesma principal fonte: <span style="color:#a8f0b0">${cmpData.fonte[nA]}</span>.`
            : `As principais fontes são distintas: <span style="color:#a8f0b0">${cmpData.fonte[nA]}</span> (${nA}) e <span style="color:#a8f0b0">${cmpData.fonte[nB]}</span> (${nB}).`}
        </div>
      </div>`;
  };

  // Render inicial
  renderComparador();
})();



(function(){
  // ── DADOS BASE (SEEG 2023, Mt CO₂e/ano) ──
  const TOTAL_ANUAL = 667; // Brasil total

  const regioes = [
    { nome:'Centro-Oeste', estados:['Mato Grosso','Goiás','Mato Grosso do Sul','Distrito Federal'], cor:'#22c55e',  corFundo:'rgba(34,197,94,0.08)'  },
    { nome:'Sudeste',      estados:['Minas Gerais','São Paulo','Rio de Janeiro','Espírito Santo'],   cor:'#4ade80',  corFundo:'rgba(74,222,128,0.08)' },
    { nome:'Norte',        estados:['Pará','Rondônia','Tocantins','Amazonas','Acre','Roraima','Amapá'], cor:'#86efac', corFundo:'rgba(134,239,172,0.07)' },
    { nome:'Nordeste',     estados:['Bahia','Maranhão','Pernambuco','Ceará','Piauí','Rio Grande do Norte','Paraíba','Alagoas','Sergipe'], cor:'#a3e635', corFundo:'rgba(163,230,53,0.07)' },
    { nome:'Sul',          estados:['Rio Grande do Sul','Paraná','Santa Catarina'],                  cor:'#d9f99d', corFundo:'rgba(217,249,157,0.07)' },
  ];

  const emissoesPorEstado = {
    'Mato Grosso':88.9,'Goiás':59.6,'Mato Grosso do Sul':45.2,'Distrito Federal':1.8,
    'Minas Gerais':59.2,'São Paulo':31.0,'Rio de Janeiro':9.1,'Espírito Santo':8.2,
    'Pará':55.1,'Rondônia':35.8,'Tocantins':28.5,'Amazonas':16.5,'Acre':18.0,'Roraima':7.0,'Amapá':4.2,
    'Bahia':36.4,'Maranhão':22.0,'Pernambuco':13.5,'Ceará':12.4,'Piauí':13.0,
    'Rio Grande do Norte':9.5,'Paraíba':8.8,'Alagoas':7.5,'Sergipe':6.3,
    'Rio Grande do Sul':45.7,'Paraná':11.8,'Santa Catarina':12.0
  };

  // Calcular total por região a partir dos estados
  const totaisRegiao = regioes.map(r => ({
    ...r,
    total: r.estados.reduce((s, e) => s + (emissoesPorEstado[e] || 0), 0)
  }));

  // Taxa por segundo (Brasil) — distribui uniformemente ao longo do ano
  const SEG_ANO = 365.25 * 24 * 3600;
  const TAXA_SEG_BRASIL = (TOTAL_ANUAL * 1e6) / SEG_ANO; // toneladas/s

  function segDesdeInicioAno() {
    const agora = new Date();
    const inicio = new Date(agora.getFullYear(), 0, 1, 0, 0, 0, 0);
    return (agora - inicio) / 1000;
  }

  function fracaoAno() {
    const agora = new Date();
    const inicio = new Date(agora.getFullYear(), 0, 1);
    const fim    = new Date(agora.getFullYear() + 1, 0, 1);
    return (agora - inicio) / (fim - inicio);
  }

  function fmt(n, dec=2) {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  function fmtMt(n) {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  }

  // Build region rows
  const rtRegioes = document.getElementById('rt-regioes');
  const maxTotalRegiao = Math.max(...totaisRegiao.map(r => r.total));

  totaisRegiao.forEach(r => {
    const pct = (r.total / TOTAL_ANUAL * 100).toFixed(1);
    const barMaxPct = (r.total / maxTotalRegiao * 100);
    const row = document.createElement('div');
    row.style.cssText = 'display:grid;grid-template-columns:140px 1fr 110px 90px;align-items:center;gap:12px;';
    row.innerHTML = `
      <div style="font-size:12px;color:#e8f5e9;font-weight:500;white-space:nowrap;">${r.nome}</div>
      <div style="width:100%;height:7px;background:rgba(34,197,94,0.07);border-radius:999px;overflow:hidden;">
        <div class="rt-reg-bar" data-maxpct="${barMaxPct}" style="height:100%;width:0%;background:${r.cor};border-radius:999px;transition:width 0.9s ease;"></div>
      </div>
      <div class="rt-reg-val" data-taxa="${(r.total * 1e6) / SEG_ANO}" style="font-family:'DM Mono',monospace;font-size:12px;color:${r.cor};text-align:right;font-weight:700;">— Mt</div>
      <div style="font-size:10px;color:#6b7c6b;text-align:right;font-family:'DM Mono',monospace;">${pct}% do total</div>
    `;
    rtRegioes.appendChild(row);
  });

  // Animate bars in after a short delay
  setTimeout(() => {
    document.querySelectorAll('.rt-reg-bar').forEach(bar => {
      bar.style.width = bar.dataset.maxpct + '%';
    });
  }, 300);

  // Update labels
  const ano = new Date().getFullYear();
  document.getElementById('rt-ano').textContent = ano;

  function update() {
    const seg = segDesdeInicioAno();
    const frac = fracaoAno();
    const acumBrasilTon = TAXA_SEG_BRASIL * seg;
    const acumBrasilMt  = acumBrasilTon / 1e6;

    // Clock
    const agora = new Date();
    document.getElementById('rt-clock').textContent =
      agora.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit', second:'2-digit' });

    // Today label
    document.getElementById('rt-today-label').textContent =
      agora.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });

    // Main counter
    document.getElementById('rt-total-val').textContent = fmtMt(acumBrasilMt) + ' Mt';
    document.getElementById('rt-total-pct').textContent = (frac * 100).toFixed(2) + '%';
    document.getElementById('rt-progress').style.width = (frac * 100).toFixed(3) + '%';

    // Rates
    document.getElementById('rt-per-sec').textContent = fmt(TAXA_SEG_BRASIL, 3);
    document.getElementById('rt-per-min').textContent = fmt(TAXA_SEG_BRASIL * 60, 1);
    document.getElementById('rt-per-hr').textContent  = fmt(TAXA_SEG_BRASIL * 3600, 0);

    // Projeção = taxa atual * SEG_ANO / 1e6
    const proj = (TAXA_SEG_BRASIL * SEG_ANO / 1e6);
    document.getElementById('rt-proj').textContent = fmt(proj, 1);

    // Regiões
    document.querySelectorAll('.rt-reg-val').forEach(el => {
      const taxaRegSeg = parseFloat(el.dataset.taxa);
      const acumRegTon = taxaRegSeg * seg;
      const acumRegMt  = acumRegTon / 1e6;
      el.textContent = fmtMt(acumRegMt) + ' Mt';
    });
  }

  update();
  setInterval(update, 1000);
})();



(function(){
  const estadosData = [
    { nome: 'Mato Grosso',        emissao: 88.9, fonte: 'Fermentação entérica bovina' },
    { nome: 'Goiás',              emissao: 59.6, fonte: 'Fermentação entérica bovina' },
    { nome: 'Minas Gerais',       emissao: 59.2, fonte: 'Fermentação entérica bovina' },
    { nome: 'Pará',               emissao: 55.1, fonte: 'Desmatamento e uso da terra' },
    { nome: 'Rio Grande do Sul',  emissao: 45.7, fonte: 'Cultivo de arroz irrigado' },
    { nome: 'Mato Grosso do Sul', emissao: 45.2, fonte: 'Fermentação entérica bovina' },
    { nome: 'Bahia',              emissao: 36.4, fonte: 'Fermentação entérica bovina' },
    { nome: 'Rondônia',           emissao: 35.8, fonte: 'Desmatamento e uso da terra' },
    { nome: 'São Paulo',          emissao: 31.0, fonte: 'Aterros sanitários e resíduos' },
    { nome: 'Tocantins',          emissao: 28.5, fonte: 'Fermentação entérica bovina' }
  ];

  // Doughnut
  new Chart(document.getElementById('db-setoresChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Agropecuária','Resíduos','Energia','Dejetos','Biomassa'],
      datasets: [{ data: [65.7,12.3,8.5,7.9,5.6],
        backgroundColor: ['#22c55e','#f59e0b','#3b82f6','#8b5cf6','#ef4444'],
        borderWidth: 0, hoverOffset: 10, cutout: '62%' }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: {
        legend: { position:'bottom', labels:{ font:{size:11,family:'DM Sans'}, color:'#c8e6c8', boxWidth:10, padding:12 } },
        tooltip: { callbacks:{ label: ctx => `${ctx.label}: ${ctx.raw}%` } }
      }
    }
  });

  // Line
  new Chart(document.getElementById('db-historicoChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'],
      datasets: [{
        label: 'Emissões CH₄ (Mt CO₂e)',
        data: [580,592,605,618,630,642,650,656,662,667],
        borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.06)',
        borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#4ade80',
        pointBorderColor: '#0d150d', pointBorderWidth: 1.5, pointHoverRadius: 8,
        fill: true, tension: 0.3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: {
        legend: { labels:{ color:'#c8e6c8', font:{size:11} } },
        tooltip: { callbacks:{ label: ctx => `${ctx.raw} Mt CO₂e` } }
      },
      scales: {
        y: { min:560, max:680, grid:{ color:'rgba(34,197,94,0.08)' }, ticks:{ color:'#9ab89a' },
          title:{ display:true, text:'Milhões de toneladas CO₂e', color:'#6b7c6b' } },
        x: { ticks:{ color:'#9ab89a' }, grid:{ display:false } }
      }
    }
  });

  // Tabela
  const tbody = document.getElementById('db-tabela-estados');
  estadosData.forEach((e,i) => {
    const tr = tbody.insertRow();
    tr.style.borderBottom = '1px solid rgba(34,197,94,0.07)';
    tr.onmouseenter = () => tr.style.background = 'rgba(34,197,94,0.04)';
    tr.onmouseleave = () => tr.style.background = '';
    [[`#${i+1}`,'left','#4ade80','600'],[e.nome,'left','#e8f5e9','400'],
      [`${e.emissao.toFixed(1)} Mt`,'right','#22c55e','600'],[e.fonte,'left','#9ab89a','400']]
    .forEach(([txt,align,color,fw]) => {
      const td = tr.insertCell();
      td.textContent = txt; td.style.cssText = `padding:10px 8px;text-align:${align};color:${color};font-weight:${fw};font-size:${align==='left'&&fw==='400'&&txt!==e.nome?'12':'14'}px`;
      if(txt===e.fonte) td.style.fontSize='12px';
    });
  });
})();



(function() {
  const emissoesFull = {
    'Acre':18.0,'Alagoas':7.5,'Amapá':4.2,'Amazonas':16.5,'Bahia':36.4,
    'Ceará':12.4,'Distrito Federal':1.8,'Espírito Santo':8.2,'Goiás':59.6,
    'Maranhão':22.0,'Mato Grosso':88.9,'Mato Grosso do Sul':45.2,'Minas Gerais':59.2,
    'Pará':55.1,'Paraíba':8.8,'Paraná':11.8,'Pernambuco':13.5,'Piauí':13.0,
    'Rio de Janeiro':9.1,'Rio Grande do Norte':9.5,'Rio Grande do Sul':45.7,
    'Rondônia':35.8,'Roraima':7.0,'Santa Catarina':12.0,'São Paulo':31.0,
    'Sergipe':6.3,'Tocantins':28.5
  };
  const namesToAbrev = {
    'Acre':'AC','Alagoas':'AL','Amapá':'AP','Amazonas':'AM','Bahia':'BA','Ceará':'CE',
    'Distrito Federal':'DF','Espírito Santo':'ES','Goiás':'GO','Maranhão':'MA',
    'Mato Grosso':'MT','Mato Grosso do Sul':'MS','Minas Gerais':'MG','Pará':'PA',
    'Paraíba':'PB','Paraná':'PR','Pernambuco':'PE','Piauí':'PI','Rio de Janeiro':'RJ',
    'Rio Grande do Norte':'RN','Rio Grande do Sul':'RS','Rondônia':'RO','Roraima':'RR',
    'Santa Catarina':'SC','São Paulo':'SP','Sergipe':'SE','Tocantins':'TO'
  };
  const engToPt = {
    'Acre':'Acre','Alagoas':'Alagoas','Amapa':'Amapá','Amazonas':'Amazonas',
    'Bahia':'Bahia','Ceara':'Ceará','Distrito Federal':'Distrito Federal',
    'Espirito Santo':'Espírito Santo','Goias':'Goiás','Maranhao':'Maranhão',
    'Mato Grosso':'Mato Grosso','Mato Grosso do Sul':'Mato Grosso do Sul',
    'Minas Gerais':'Minas Gerais','Para':'Pará','Paraiba':'Paraíba',
    'Parana':'Paraná','Pernambuco':'Pernambuco','Piaui':'Piauí',
    'Rio de Janeiro':'Rio de Janeiro','Rio Grande do Norte':'Rio Grande do Norte',
    'Rio Grande do Sul':'Rio Grande do Sul','Rondonia':'Rondônia',
    'Roraima':'Roraima','Santa Catarina':'Santa Catarina','Sao Paulo':'São Paulo',
    'Sergipe':'Sergipe','Tocantins':'Tocantins'
  };
  const principalFonte = {
    'Acre':                 'Fermentação entérica bovina',
    'Alagoas':              'Fermentação entérica bovina',
    'Amapá':                'Desmatamento e uso da terra',
    'Amazonas':             'Desmatamento e uso da terra',
    'Bahia':                'Fermentação entérica bovina',
    'Ceará':                'Fermentação entérica bovina',
    'Distrito Federal':     'Dejetos animais (suinocultura)',
    'Espírito Santo':       'Fermentação entérica bovina',
    'Goiás':                'Fermentação entérica bovina',
    'Maranhão':             'Fermentação entérica bovina',
    'Mato Grosso':          'Fermentação entérica bovina',
    'Mato Grosso do Sul':   'Fermentação entérica bovina',
    'Minas Gerais':         'Fermentação entérica bovina',
    'Pará':                 'Desmatamento e uso da terra',
    'Paraíba':              'Fermentação entérica bovina',
    'Paraná':               'Dejetos animais (suinocultura)',
    'Pernambuco':           'Fermentação entérica bovina',
    'Piauí':                'Fermentação entérica bovina',
    'Rio de Janeiro':       'Aterros sanitários e resíduos',
    'Rio Grande do Norte':  'Fermentação entérica bovina',
    'Rio Grande do Sul':    'Cultivo de arroz irrigado',
    'Rondônia':             'Desmatamento e uso da terra',
    'Roraima':              'Desmatamento e uso da terra',
    'Santa Catarina':       'Dejetos animais (suinocultura)',
    'São Paulo':            'Aterros sanitários e resíduos',
    'Sergipe':              'Fermentação entérica bovina',
    'Tocantins':            'Fermentação entérica bovina',
  };

  const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const nameIndex = {};
  Object.keys(emissoesFull).forEach(n => { nameIndex[normalize(n)] = n; });
  function resolveNome(raw) {
    if (!raw) return null;
    if (engToPt[raw]) return engToPt[raw];
    return nameIndex[normalize(raw)] || null;
  }

  const sortedByValue = Object.entries(emissoesFull).sort((a,b) => b[1]-a[1]);
  const rankMap = {};
  sortedByValue.forEach(([nome],i) => { rankMap[nome] = i; });
  const nStates = sortedByValue.length;
  const maxVal = Math.max(...Object.values(emissoesFull));
  const interp = d3.interpolateRgb('#0d3320','#a8f0b0');
  const rankColors = sortedByValue.map((_,i) => interp(i/(nStates-1)));
  function getColor(name) { const idx=rankMap[name]; return idx!==undefined?rankColors[idx]:'#1a2e22'; }

  const svg = d3.select('#brasil-map-embed');
  svg.append('rect').attr('width',600).attr('height',640).attr('fill','#071209');
  const projection = d3.geoMercator().center([-54,-14]).scale(630).translate([300,310]);
  const pathGen = d3.geoPath(projection);
  const tooltip = document.getElementById('tooltip-embed');

  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r=>r.json()).then(world => {
      const countries = topojson.feature(world,world.objects.countries);
      svg.selectAll('.nb').data(countries.features.filter(d=>d.id!=='076'))
        .join('path').attr('d',pathGen).attr('fill','#0e1e14')
        .attr('stroke','rgba(100,180,120,0.12)').attr('stroke-width',0.5);
    });

  fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
    .then(r=>r.json()).then(geojson => {
      svg.selectAll('.state').data(geojson.features).join('path')
        .attr('d',pathGen)
        .attr('fill',d=>{ const raw=d.properties?.name||''; const n=resolveNome(raw); return n?getColor(n):'#1a2e22'; })
        .attr('stroke','rgba(0,0,0,0.4)').attr('stroke-width',0.7).style('cursor','pointer')
        .on('click', function(event, d) {
          const raw = d.properties?.name || '';
          const nome = resolveNome(raw) || raw;
          openChartPanel(nome);
        })
        .on('mousemove',function(event,d){
          const raw=d.properties?.name||''; const nome=resolveNome(raw)||raw;
          const val=emissoesFull[nome]; const rank=rankMap[nome]!==undefined?rankMap[nome]+1:'—';
          const pct=val?((val/maxVal)*100).toFixed(0):'—';
          const abrev=namesToAbrev[nome]||'';
          d3.select(this).attr('stroke','#a8f0b0').attr('stroke-width',1.5);
          const box=document.getElementById('map-wrap-embed').getBoundingClientRect();
          let x=event.clientX-box.left+16, y=event.clientY-box.top-10;
          if(x+180>box.width) x-=200;
          const fonte=principalFonte[nome]||'—';
          tooltip.style.display='block'; tooltip.style.left=x+'px'; tooltip.style.top=y+'px';
          tooltip.innerHTML=`<strong>${nome}${abrev?' <span style="opacity:.5">('+abrev+')</span>':''}</strong> <div style="display:flex;justify-content:space-between;gap:16px;margin-top:4px"><span style="color:#6b9a78">Ranking</span><span style="color:#4ade80">#${rank} de ${nStates}</span></div> <div style="display:flex;justify-content:space-between;gap:16px;margin-top:2px"><span style="color:#6b9a78">CH₄ equiv.</span><span style="color:#4ade80">${val?val.toFixed(1)+' MtCO₂e':'N/D'}</span></div> <div style="display:flex;justify-content:space-between;gap:16px;margin-top:2px"><span style="color:#6b9a78">Intensidade</span><span style="color:#4ade80">${pct}%</span></div> <div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(74,222,128,0.15)"><span style="color:#6b9a78;font-size:10px;display:block;margin-bottom:2px">Principal fonte</span><span style="color:#a8f0b0;font-size:11px;font-weight:600">${fonte}</span></div>`;
        })
        .on('mouseleave',function(event,d){
          const raw=d.properties?.name||''; const nome=resolveNome(raw)||raw;
          d3.select(this).attr('fill',getColor(nome)).attr('stroke','rgba(0,0,0,0.4)').attr('stroke-width',0.7);
          tooltip.style.display='none';
        });

      svg.selectAll('.lbl').data(geojson.features).join('text')
        .attr('x',d=>pathGen.centroid(d)[0]).attr('y',d=>pathGen.centroid(d)[1]+4)
        .attr('text-anchor','middle').attr('font-size','6.5px')
        .attr('font-family','DM Mono, monospace').attr('pointer-events','none')
        .attr('fill',d=>{ const raw=d.properties?.name||''; const n=resolveNome(raw)||''; const r=n&&rankMap[n]!==undefined?rankMap[n]:99; return r<5?'rgba(200,255,210,0.9)':'rgba(200,255,210,0.8)'; })
        .text(d=>{ const raw=d.properties?.name||''; const n=resolveNome(raw)||''; return namesToAbrev[n]||''; });

      const rankEl=document.getElementById('ranking-embed');
      rankEl.innerHTML='<div style="grid-column:1/-1;font-family:\'DM Mono\',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7c6b;margin-bottom:4px">Ranking por intensidade de CH₄</div>';
      sortedByValue.forEach(([nome,val],i)=>{
        const col=rankColors[i];
        const div=document.createElement('div');
        div.style.cssText='display:flex;align-items:center;gap:8px;font-family:\'DM Mono\',monospace;font-size:11px;color:#6b9a78;padding:5px 8px;border-radius:6px;border:1px solid transparent;cursor:default;';
        div.onmouseenter=()=>{ div.style.borderColor='rgba(34,197,94,0.15)'; div.style.background='rgba(74,222,128,0.05)'; };
        div.onmouseleave=()=>{ div.style.borderColor='transparent'; div.style.background=''; };
        div.innerHTML=`<span style="font-size:10px;width:18px;text-align:right;opacity:.5;flex-shrink:0">${i+1}</span><span style="width:10px;height:10px;border-radius:2px;background:${col};flex-shrink:0;display:inline-block"></span><span style="color:#d4edda;flex:1">${nome}</span><span style="color:#4ade80;margin-left:auto;white-space:nowrap">${val.toFixed(1)}</span>`;
        rankEl.appendChild(div);
      });
    });
})();



  function openModal() { document.getElementById('modalOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function openSignupModal() { document.getElementById('signupModalOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeSignupModal() {
    document.getElementById('signupModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    clearSignupErrors();
    setTimeout(function() {
      document.getElementById('signup-step-1').style.display = '';
      document.getElementById('signup-step-2').style.display = 'none';
    }, 300);
  }

  /* ── HELPERS DE VALIDAÇÃO ── */
  function setFieldError(inputId, msgId, hasError) {
    var input = document.getElementById(inputId);
    var msg = document.getElementById(msgId);
    if (!input || !msg) return;
    if (hasError) {
      input.classList.add('input-error');
      input.style.animation = 'none';
      void input.offsetHeight;
      input.style.animation = '';
      msg.classList.add('visible');
    } else {
      input.classList.remove('input-error');
      msg.classList.remove('visible');
    }
  }

  function clearSignupErrors() {
    ['signup-nome','signup-email','signup-senha'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('input-error');
    });
    ['err-signup-nome','err-signup-email','err-signup-senha'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
  }

  function clearLoginErrors() {
    ['login-email','login-senha'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('input-error');
    });
    ['err-login-email','err-login-senha'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
  }

  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

  /* ── VALIDAÇÃO CADASTRO STEP 1 ── */
  function submitSignup() {
    var nome  = document.getElementById('signup-nome').value.trim();
    var email = document.getElementById('signup-email').value.trim();
    var senha = document.getElementById('signup-senha').value;
    var valid = true;
    if (nome.length < 2) { setFieldError('signup-nome','err-signup-nome',true); valid = false; }
    else { setFieldError('signup-nome','err-signup-nome',false); }
    if (!isValidEmail(email)) { setFieldError('signup-email','err-signup-email',true); valid = false; }
    else { setFieldError('signup-email','err-signup-email',false); }
    if (senha.length < 6) { setFieldError('signup-senha','err-signup-senha',true); valid = false; }
    else { setFieldError('signup-senha','err-signup-senha',false); }
    if (!valid) return;
    // Avança para step 2
    document.getElementById('signup-step-1').style.display = 'none';
    var s2 = document.getElementById('signup-step-2');
    s2.style.display = 'block';
    s2.style.animation = 'slideUp 0.3s ease';
  }

  /* ── VALIDAÇÃO CADASTRO STEP 2 ── */
  function submitSignupStep2() {
    var estado   = document.getElementById('signup-estado').value;
    var hectares = document.getElementById('signup-hectares').value.trim();
    var valid = true;
    if (!estado) { setFieldError('signup-estado','err-signup-estado',true); valid = false; }
    else { setFieldError('signup-estado','err-signup-estado',false); }
    if (hectares === '' || parseFloat(hectares) < 0) { setFieldError('signup-hectares','err-signup-hectares',true); valid = false; }
    else { setFieldError('signup-hectares','err-signup-hectares',false); }
    if (!valid) return;
    var s2 = document.getElementById('signup-step-2');
    var googleName    = s2 && s2.dataset.googleName    ? s2.dataset.googleName    : '';
    var googlePicture = s2 && s2.dataset.googlePicture ? s2.dataset.googlePicture : '';
    closeSignupModal();
    if (googleName) {
      showWelcomeToast(googleName);
      updateNavUser(googleName, googlePicture);
    }
  }

  /* ── VALIDAÇÃO LOGIN ── */
  function submitLogin() {
    var email = document.getElementById('login-email').value.trim();
    var senha = document.getElementById('login-senha').value;
    var valid = true;
    if (!isValidEmail(email)) { setFieldError('login-email','err-login-email',true); valid = false; }
    else { setFieldError('login-email','err-login-email',false); }
    if (senha.length < 6) { setFieldError('login-senha','err-login-senha',true); valid = false; }
    else { setFieldError('login-senha','err-login-senha',false); }
    if (!valid) return;
    clearLoginErrors();
    goToCalc();
  }

  /* Limpa erros ao digitar — validacao so ocorre ao clicar no botao */
  document.addEventListener("DOMContentLoaded", function() {
    [["signup-nome","err-signup-nome"],["signup-email","err-signup-email"],["signup-senha","err-signup-senha"],
      ["login-email","err-login-email"],["login-senha","err-login-senha"]].forEach(function(pair) {
      var el = document.getElementById(pair[0]);
      if (el) el.addEventListener("input", function() { setFieldError(pair[0], pair[1], false); });
    });
  });
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    clearLoginErrors();
  }
  function handleOverlayClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }

  function goToCalc() {
    closeModal();
  }

  /* ══════════════════════════════════════════════
      GOOGLE SIGN-IN — Google Identity Services
  ══════════════════════════════════════════════ */
  const GOOGLE_CLIENT_ID = '337509294451-97j3t476cv22u9r3c9vla70eu8dqlv0q.apps.googleusercontent.com';

  /* Decodifica o JWT retornado pelo Google sem biblioteca extra */
  function parseJwt(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch(e) { return {}; }
  }

  /* Exibe toast de boas-vindas */
  function showWelcomeToast(name) {
    var t = document.getElementById('google-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'google-toast';
      t.style.cssText = [
        'position:fixed','bottom:2rem','right:2rem','z-index:9999',
        'background:#0d150d','border:1.5px solid rgba(34,197,94,0.4)',
        'border-radius:6px','padding:0.85rem 1.3rem',
        'display:flex','align-items:center','gap:12px',
        'font-family:DM Sans,sans-serif','font-size:14px','color:#e8f5e9',
        'box-shadow:0 8px 32px rgba(0,0,0,0.6)',
        'transform:translateY(20px)','opacity:0',
        'transition:all 0.35s cubic-bezier(.4,0,.2,1)'
      ].join(';');
      document.body.appendChild(t);
    }
    t.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="rgba(34,197,94,0.15)"/><path d="M7 12.5l3.5 3.5L17 9" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
      + '<span><span style="color:#22c55e;font-weight:600">Olá, ' + name.split(' ')[0] + '!</span> Login realizado com sucesso.</span>';
    requestAnimationFrame(function() {
      t.style.transform = 'translateY(0)';
      t.style.opacity   = '1';
    });
    setTimeout(function() {
      t.style.transform = 'translateY(20px)';
      t.style.opacity   = '0';
    }, 4000);
  }

  /* Callback chamado pelo Google após autenticação bem-sucedida */
  function handleGoogleCredential(response) {
    var payload = parseJwt(response.credential);
    var name    = payload.name  || '';
    var email   = payload.email || '';
    var picture = payload.picture || '';

    /* — FLUXO LOGIN: fecha o modal de login e exibe boas-vindas — */
    if (document.getElementById('modalOverlay').classList.contains('open')) {
      closeModal();
      showWelcomeToast(name || 'usuário');
      updateNavUser(name, picture);
      return;
    }

    /* — FLUXO CADASTRO: preenche Step 1 e avança para Step 2 — */
    if (document.getElementById('signupModalOverlay') &&
        document.getElementById('signupModalOverlay').classList.contains('open')) {

      var nomeEl  = document.getElementById('signup-nome');
      var emailEl = document.getElementById('signup-email');
      var senhaEl = document.getElementById('signup-senha');

      if (nomeEl)  nomeEl.value  = name;
      if (emailEl) emailEl.value = email;
      /* Gera senha temporária aleatória para não deixar campo vazio */
      if (senhaEl) senhaEl.value = Math.random().toString(36).slice(2) + 'Aa1!';

      /* Limpa possíveis erros anteriores */
      clearSignupErrors();

      /* Avança direto para step 2 (perfil do produtor) */
      document.getElementById('signup-step-1').style.display = 'none';
      var s2 = document.getElementById('signup-step-2');
      s2.style.display   = 'block';
      s2.style.animation = 'slideUp 0.3s ease';

      /* Guarda avatar para usar ao fechar */
      s2.dataset.googlePicture = picture;
      s2.dataset.googleName    = name;
      return;
    }
  }

  /* Inicia o popup do Google */
  function triggerGooglePopup() {
    if (typeof google === 'undefined' || !google.accounts) {
      alert('A biblioteca do Google ainda está carregando. Tente novamente em instantes.');
      return;
    }
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback:  handleGoogleCredential,
      ux_mode:   'popup',
      context:   'signin'
    });
    google.accounts.id.prompt(function(notification) {
      /* Se o One Tap for suprimido, abre o seletor de conta explícito */
      if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
        google.accounts.id.revoke('', function() {});
        /* Renderiza botão invisível e clica nele para forçar popup de conta */
        var tmp = document.createElement('div');
        tmp.style.cssText = 'position:absolute;opacity:0;pointer-events:none;left:-9999px;';
        document.body.appendChild(tmp);
        google.accounts.id.renderButton(tmp, {
          type: 'standard', size: 'large', theme: 'outline'
        });
        setTimeout(function() {
          var btn = tmp.querySelector('div[role="button"]');
          if (btn) btn.click();
        }, 100);
      }
    });
  }

  /* Atalhos chamados pelos botões HTML */
  function loginGoogle()  { triggerGooglePopup(); }
  function signupGoogle() { triggerGooglePopup(); }

  /* Atualiza o botão de navegação após login */
  function updateNavUser(name, picture) {
    var btn = document.querySelector('.btn-cadastrar');
    if (!btn) return;
    var first = name.split(' ')[0];
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.gap = '8px';
    if (picture) {
      btn.innerHTML = '<img src="' + picture + '" style="width:22px;height:22px;border-radius:50%;border:1.5px solid #22c55e;flex-shrink:0" referrerpolicy="no-referrer"> ' + first;
    } else {
      btn.textContent = first;
    }
    btn.onclick = null; /* Remove ação de abrir modal */
  }

  /* Inicializa o GSI assim que a lib carregar */
  window.addEventListener('load', function() {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback:  handleGoogleCredential,
        ux_mode:   'popup'
      });
    }
  });

  function calcModal() {
    const ANIMAIS = [
      {id:'mc-bov-corte', nome:'Bovinos corte', fator:56,  cor:'#22c55e'},
      {id:'mc-bov-leite', nome:'Bovinos leite', fator:128, cor:'#4ade80'},
      {id:'mc-bufalos',   nome:'Búfalos',       fator:55,  cor:'#16a34a'},
      {id:'mc-ovinos',    nome:'Ovinos',         fator:8,   cor:'#86efac'},
      {id:'mc-caprinos',  nome:'Caprinos',       fator:5,   cor:'#bbf7d0'},
      {id:'mc-suinos',    nome:'Suínos',         fator:5,   cor:'#a3e635'},
      {id:'mc-equinos',   nome:'Equinos',        fator:18,  cor:'#65a30d'},
      {id:'mc-aves',      nome:'Aves',           fator:0.1, cor:'#84cc16'},
    ];
    const dados = ANIMAIS.map(a => ({
      nome: a.nome, cor: a.cor,
      ch4: (parseFloat(document.getElementById(a.id).value) || 0) * a.fator / 1000
    }));
    const total = dados.reduce((s, d) => s + d.ch4, 0);
    if (total === 0) { alert('Informe pelo menos um animal.'); return; }

    const fmtN = n => n >= 1000 ? (n/1000).toFixed(1)+'k' : n.toFixed(3);
    document.getElementById('mc-ch4').textContent  = fmtN(total);
    document.getElementById('mc-co2e').textContent = fmtN(total * 28);

    const sig = dados.filter(d => d.ch4 > 0).sort((a,b) => b.ch4 - a.ch4);
    const maxCH4 = sig[0].ch4;
    document.getElementById('mc-bars').innerHTML = sig.map(d => `<div style="margin-bottom:6px"> <div style="display:flex;justify-content:space-between;font-size:11px;color:#6b7c6b;margin-bottom:3px"> <span>${d.nome}</span><span style="color:#4ade80">${fmtN(d.ch4)} t</span> </div> <div style="background:rgba(34,197,94,0.1);border-radius:4px;height:6px;overflow:hidden"> <div style="width:${((d.ch4/maxCH4)*100).toFixed(1)}%;height:6px;border-radius:4px;background:${d.cor};transition:width .4s ease"></div> </div> </div>`
    ).join('');

    document.getElementById('mc-result').style.display = 'block';
  }

  // ── HISTORICAL DATA (MtCO₂e, 2010–2023) ──
  // Values are plausible series based on SEEG trends, anchored to 2023 snapshot
  const historicalData = {
    'Acre':         [12.1,12.5,13.0,13.4,13.8,14.2,14.8,15.2,15.6,16.0,16.5,17.0,17.5,18.0],
    'Alagoas':      [5.2,5.4,5.6,5.7,5.9,6.0,6.2,6.5,6.7,6.9,7.0,7.2,7.4,7.5],
    'Amapá':        [2.8,2.9,3.0,3.1,3.2,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2],
    'Amazonas':     [11.2,11.5,11.8,12.0,12.3,12.7,13.1,13.5,14.0,14.5,15.0,15.5,16.0,16.5],
    'Bahia':        [27.0,28.2,29.1,29.8,30.5,31.2,32.0,33.1,34.0,34.8,35.2,35.8,36.1,36.4],
    'Ceará':        [9.0,9.2,9.5,9.7,10.0,10.3,10.6,11.0,11.3,11.7,12.0,12.2,12.3,12.4],
    'Distrito Federal':[1.4,1.4,1.5,1.5,1.6,1.6,1.7,1.7,1.7,1.8,1.8,1.8,1.8,1.8],
    'Espírito Santo':[6.0,6.1,6.3,6.5,6.7,6.9,7.1,7.4,7.6,7.8,8.0,8.1,8.2,8.2],
    'Goiás':        [43.0,45.0,47.2,49.1,51.0,52.5,54.0,55.3,56.5,57.5,58.2,58.8,59.2,59.6],
    'Maranhão':     [16.0,16.5,17.0,17.5,18.0,18.5,19.0,19.5,20.0,20.5,21.0,21.3,21.7,22.0],
    'Mato Grosso':  [60.0,63.5,67.0,70.2,73.0,75.5,77.8,80.0,82.1,84.0,85.5,87.0,88.1,88.9],
    'Mato Grosso do Sul':[32.0,33.5,35.0,36.3,37.5,38.5,39.5,40.5,41.5,42.5,43.5,44.2,44.8,45.2],
    'Minas Gerais': [44.0,45.5,47.0,48.5,50.0,51.5,53.0,54.5,55.8,57.0,57.8,58.5,58.9,59.2],
    'Pará':         [38.0,40.0,42.0,44.0,46.0,47.5,49.0,50.5,51.8,53.0,53.8,54.5,54.9,55.1],
    'Paraíba':      [6.2,6.4,6.6,6.8,7.0,7.2,7.5,7.8,8.0,8.3,8.5,8.6,8.7,8.8],
    'Paraná':       [8.5,8.7,9.0,9.2,9.5,9.8,10.1,10.5,10.8,11.1,11.3,11.5,11.7,11.8],
    'Pernambuco':   [9.5,9.8,10.1,10.4,10.7,11.0,11.4,11.8,12.1,12.5,12.8,13.1,13.3,13.5],
    'Piauí':        [9.0,9.3,9.5,9.8,10.0,10.3,10.6,11.0,11.3,11.7,12.1,12.4,12.7,13.0],
    'Rio de Janeiro':[7.0,7.2,7.4,7.5,7.7,7.9,8.1,8.3,8.6,8.8,8.9,9.0,9.1,9.1],
    'Rio Grande do Norte':[6.8,7.0,7.2,7.4,7.6,7.8,8.0,8.3,8.5,8.8,9.0,9.2,9.4,9.5],
    'Rio Grande do Sul':[33.0,34.5,36.0,37.3,38.5,39.5,40.5,41.5,42.5,43.5,44.2,44.8,45.3,45.7],
    'Rondônia':     [24.0,25.5,27.0,28.5,30.0,31.2,32.3,33.3,34.1,34.8,35.3,35.6,35.8,35.8],
    'Roraima':      [4.5,4.7,4.9,5.1,5.3,5.5,5.7,6.0,6.2,6.5,6.7,6.8,6.9,7.0],
    'Santa Catarina':[8.8,9.0,9.3,9.5,9.8,10.1,10.4,10.8,11.1,11.4,11.6,11.8,11.9,12.0],
    'São Paulo':    [22.5,23.5,24.5,25.3,26.0,26.8,27.5,28.2,28.8,29.5,30.0,30.4,30.7,31.0],
    'Sergipe':      [4.5,4.7,4.8,5.0,5.1,5.3,5.5,5.7,5.9,6.0,6.1,6.2,6.3,6.3],
    'Tocantins':    [19.5,20.5,21.5,22.5,23.5,24.5,25.3,26.0,26.8,27.5,27.9,28.2,28.4,28.5],
  };
  const chartYears = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];

  function openChartPanel(nome) {
    const data = historicalData[nome];
    if (!data) return;
    document.getElementById('chart-state-title').textContent = nome;
    renderBarChart(nome, data);
    document.getElementById('chart-panel-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeChartPanel() {
    document.getElementById('chart-panel-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleChartOverlayClick(e) {
    if (e.target === document.getElementById('chart-panel-overlay')) closeChartPanel();
  }

  function renderBarChart(nome, data) {
    const svg = document.getElementById('chart-svg');
    svg.innerHTML = '';
    const W = 680, H = 260;
    const pad = { top: 24, right: 20, bottom: 48, left: 66 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const n = data.length;
    const rawMax = Math.max(...data);
    const rawMin = Math.min(...data);
    // Nice round step for Y axis
    const range = rawMax - rawMin;
    const roughStep = range / 5;
    const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const niceStep = Math.ceil(roughStep / mag) * mag;
    const axisMin = Math.floor(rawMin / niceStep) * niceStep;
    const axisMax = Math.ceil((rawMax * 1.08) / niceStep) * niceStep;
    const maxVal = axisMax;

    const barW = (chartW / n) * 0.62;
    const gap = (chartW / n) * 0.38;

    function xPos(i) { return pad.left + i * (chartW / n) + (chartW / n) * 0.19; }
    function yPos(v) { return pad.top + chartH - ((v - axisMin) / (axisMax - axisMin)) * chartH; }
    function barH(v) { return ((v - axisMin) / (axisMax - axisMin)) * chartH; }

    // Grid lines with exact Y values
    for (let yv = axisMin; yv <= axisMax + niceStep * 0.01; yv += niceStep) {
      const ypx = yPos(yv);
      const isBase = yv === axisMin;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', pad.left); line.setAttribute('x2', W - pad.right);
      line.setAttribute('y1', ypx); line.setAttribute('y2', ypx);
      line.setAttribute('stroke', isBase ? 'rgba(34,197,94,0.3)' : 'rgba(34,197,94,0.12)');
      line.setAttribute('stroke-width', isBase ? '1' : '0.7');
      line.setAttribute('stroke-dasharray', isBase ? 'none' : '4,4');
      svg.appendChild(line);

      // Tick mark
      const tick = document.createElementNS('http://www.w3.org/2000/svg','line');
      tick.setAttribute('x1', pad.left - 5); tick.setAttribute('x2', pad.left);
      tick.setAttribute('y1', ypx); tick.setAttribute('y2', ypx);
      tick.setAttribute('stroke', '#4ade80'); tick.setAttribute('stroke-width','1.5');
      svg.appendChild(tick);

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('x', pad.left - 10);
      label.setAttribute('y', ypx + 4);
      label.setAttribute('text-anchor','end');
      label.setAttribute('font-size','12');
      label.setAttribute('font-weight','700');
      label.setAttribute('font-family','DM Mono, monospace');
      label.setAttribute('fill','#d4f0d4');
      label.textContent = Number.isInteger(yv) ? yv.toFixed(0) : yv.toFixed(1);
      svg.appendChild(label);
    }

    // Y-axis label
    const yLabel = document.createElementNS('http://www.w3.org/2000/svg','text');
    yLabel.setAttribute('x', 10);
    yLabel.setAttribute('y', pad.top + chartH / 2);
    yLabel.setAttribute('text-anchor','middle');
    yLabel.setAttribute('font-size','10');
    yLabel.setAttribute('font-weight','600');
    yLabel.setAttribute('font-family','DM Mono, monospace');
    yLabel.setAttribute('fill','#7ab87a');
    yLabel.setAttribute('transform', `rotate(-90, 10, ${pad.top + chartH / 2})`);
    yLabel.textContent = 'MtCO₂e';
    svg.appendChild(yLabel);

    // Bars and labels
    const minVal = Math.min(...data);
    const maxValActual = Math.max(...data);

    data.forEach((v, i) => {
      const x = xPos(i);
      const bh = barH(v);
      const yp = yPos(v);
      const isMin = v === minVal;
      const isMax = v === maxValActual;

      // Bar gradient simulation via two rects
      const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', yp);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', bh);
      rect.setAttribute('rx', '2');
      rect.setAttribute('fill', isMax ? '#4ade80' : isMin ? '#155c30' : '#22c55e');
      rect.setAttribute('opacity', '0.88');
      rect.style.transition = 'opacity 0.15s';
      rect.addEventListener('mouseenter', () => {
        rect.setAttribute('opacity','1');
        showBarTooltip(svg, x, yp, barW, v, chartYears[i]);
      });
      rect.addEventListener('mouseleave', () => {
        rect.setAttribute('opacity','0.88');
        const tt = svg.querySelector('#bar-tooltip-g');
        if (tt) tt.remove();
      });
      svg.appendChild(rect);

      // Value label on top of bar
      const valLbl = document.createElementNS('http://www.w3.org/2000/svg','text');
      valLbl.setAttribute('x', x + barW / 2);
      valLbl.setAttribute('y', yp - 4);
      valLbl.setAttribute('text-anchor','middle');
      valLbl.setAttribute('font-size','8');
      valLbl.setAttribute('font-weight','700');
      valLbl.setAttribute('font-family','DM Mono, monospace');
      valLbl.setAttribute('fill', isMax ? '#a8f0b0' : '#86c886');
      valLbl.textContent = v.toFixed(1);
      svg.appendChild(valLbl);

      // Year label
      const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
      lbl.setAttribute('x', x + barW / 2);
      lbl.setAttribute('y', pad.top + chartH + 16);
      lbl.setAttribute('text-anchor','middle');
      lbl.setAttribute('font-size','10');
      lbl.setAttribute('font-weight', i % 2 === 0 ? '700' : '500');
      lbl.setAttribute('font-family','DM Mono, monospace');
      lbl.setAttribute('fill', i % 2 === 0 ? '#c8e6c8' : '#7ab87a');
      lbl.textContent = chartYears[i];
      svg.appendChild(lbl);

      // Max/Min badges
      if (isMax || isMin) {
        const badge = document.createElementNS('http://www.w3.org/2000/svg','text');
        badge.setAttribute('x', x + barW / 2);
        badge.setAttribute('y', yp - 15);
        badge.setAttribute('text-anchor','middle');
        badge.setAttribute('font-size','9');
        badge.setAttribute('font-weight','700');
        badge.setAttribute('font-family','DM Mono, monospace');
        badge.setAttribute('fill', isMax ? '#4ade80' : '#86efac');
        badge.textContent = isMax ? '▲ max' : '▼ min';
        svg.appendChild(badge);
      }
    });

    // Trend line
    const lineEl = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    const pts = data.map((v, i) => `${xPos(i) + barW / 2},${yPos(v)}`).join(' ');
    lineEl.setAttribute('points', pts);
    lineEl.setAttribute('fill','none');
    lineEl.setAttribute('stroke','rgba(74,222,128,0.35)');
    lineEl.setAttribute('stroke-width','1.5');
    lineEl.setAttribute('stroke-dasharray','4,3');
    lineEl.setAttribute('stroke-linecap','round');
    svg.appendChild(lineEl);
  }

  function showBarTooltip(svg, x, yp, barW, v, year) {
    const old = svg.querySelector('#bar-tooltip-g');
    if (old) old.remove();
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('id','bar-tooltip-g');
    const W = 680;
    const tw = 90, th = 36;
    let tx = x + barW / 2 - tw / 2;
    if (tx + tw > W - 20) tx = W - tw - 20;
    if (tx < 0) tx = 4;
    const ty = yp - th - 8;

    const bg = document.createElementNS('http://www.w3.org/2000/svg','rect');
    bg.setAttribute('x', tx); bg.setAttribute('y', ty);
    bg.setAttribute('width', tw); bg.setAttribute('height', th);
    bg.setAttribute('rx','4');
    bg.setAttribute('fill','#0d1f14');
    bg.setAttribute('stroke','rgba(74,222,128,0.35)');
    bg.setAttribute('stroke-width','1');
    g.appendChild(bg);

    const t1 = document.createElementNS('http://www.w3.org/2000/svg','text');
    t1.setAttribute('x', tx + tw/2); t1.setAttribute('y', ty + 15);
    t1.setAttribute('text-anchor','middle');
    t1.setAttribute('font-size','11'); t1.setAttribute('font-family','DM Mono, monospace');
    t1.setAttribute('font-weight','600');
    t1.setAttribute('fill','#86c886');
    t1.textContent = year;
    g.appendChild(t1);

    const t2 = document.createElementNS('http://www.w3.org/2000/svg','text');
    t2.setAttribute('x', tx + tw/2); t2.setAttribute('y', ty + 30);
    t2.setAttribute('text-anchor','middle');
    t2.setAttribute('font-size','13'); t2.setAttribute('font-family','DM Mono, monospace');
    t2.setAttribute('font-weight','700');
    t2.setAttribute('fill','#4ade80');
    t2.textContent = v.toFixed(1) + ' Mt';
    g.appendChild(t2);
    svg.appendChild(g);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeChartPanel();
      closeModal();
    }
  });

  function loginGoogle() {
    const btn = document.querySelector('.btn-google');
    btn.textContent = 'Redirecionando para o Google...';
    btn.style.color = '#22c55e'; btn.style.borderColor = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = `<svg style="width:18px;height:18px;flex-shrink:0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continuar com Google`;
      goToCalc();
    }, 1200);
  }
