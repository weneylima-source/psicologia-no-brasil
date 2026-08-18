const LANES = {
  experimental:  { label: "Psicologia científica / experimental", color: "var(--c-experimental)" },
  psiquiatria:   { label: "Psiquiatria & higiene mental", color: "var(--c-psiquiatria)" },
  psicanalise:   { label: "Psicanálise", color: "var(--c-psicanalise)" },
  educacional:   { label: "Psicologia educacional / Escola Nova", color: "var(--c-educacional)" },
  behaviorismo:  { label: "Análise do comportamento (behaviorismo)", color: "var(--c-behaviorismo)" },
  social:        { label: "Psicologia social sócio-histórica", color: "var(--c-social)" },
};
const ERAS = ["precedentes","e1900","e1930","e1950","e1970"]; // 5 columns after label col

// dash pattern per lane, in addition to color, so lines are distinguishable without relying on hue alone
const LANE_DASH = {
  experimental: "",          // solid
  psiquiatria:  "8 5",       // dashed
  psicanalise:  "1.5 4.5",   // dotted
  educacional:  "10 4 2 4",  // dash-dot
  behaviorismo: "4 4",       // short dash
  social:       "13 5",      // long dash
  institucional:"6 3",       // medium dash (milestones)
};

const ROOTS = [
  { id:"r-wundt", name:"Wilhelm Wundt", meta:"Leipzig, Alemanha · 1879",
    blurb:"Funda o 1º laboratório de psicologia experimental do mundo; consolida o paradigma da psicologia como ciência de laboratório, referência para a psiquiatria/psicologia científica que chega ao Brasil.", refs:[6] },
  { id:"r-claparede", name:"Édouard Claparède", meta:"Genebra, Suíça",
    blurb:"Diretor do Instituto J.-J. Rousseau; psicologia funcional aplicada à educação. Formou W. Radecki (seu assistente) e recebeu H. Antipoff, ambos futuros pioneiros no Brasil.", refs:[5,6,7,8] },
  { id:"r-franca", name:"Psicologia francesa", meta:"Charcot · Janet · Ribot · Piéron · Binet-Simon",
    blurb:"Psiquiatria clínica, psicometria e testes (Binet-Simon) e psicologia experimental. Piéron leciona em São Paulo em 1927; os testes franceses inspiram os primeiros instrumentos psicológicos brasileiros.", refs:[3,4] },
  { id:"r-degeneracao", name:"Psiquiatria europeia da degeneração", meta:"Morel · Lombroso · Kraepelin",
    blurb:"Teorias de degeneração/eugenia amplamente discutidas (e em parte refutadas) pelos psiquiatras brasileiros na formação da higiene mental.", refs:[3,4] },
  { id:"r-freud", name:"Sigmund Freud", meta:"Viena, Áustria",
    blurb:"Fundador da psicanálise. Corresponde-se com Durval Marcondes a partir de 1926, incentivando a psicanálise nascente em São Paulo.", refs:[9] },
  { id:"r-dewey", name:"John Dewey", meta:"Estados Unidos",
    blurb:"Pragmatismo e educação progressiva; inspira o movimento da Escola Nova brasileira (Lourenço Filho, Anísio Teixeira, Fernando de Azevedo).", refs:[14] },
  { id:"r-skinner", name:"B. F. Skinner", meta:"Estados Unidos",
    blurb:"Análise experimental do comportamento. Chega ao Brasil por meio de seu colaborador Fred Keller, convidado como Fulbright Scholar em 1961.", refs:[10] },
  { id:"r-sovietica", name:"Psicologia soviética & Marx", meta:"Vygotsky · Luria · Leontiev · K. Marx",
    blurb:"Materialismo histórico-dialético e psicologia histórico-cultural soviética, base teórica adotada por Sílvia Lane na construção da psicologia social sócio-histórica brasileira.", refs:[11] },
  { id:"r-mira", name:"Emilio Mira y López", meta:"Catalunha, Espanha (exilado)",
    blurb:"Psiquiatra catalão exilado da Guerra Civil Espanhola; funda em 1947 o ISOP (Instituto de Seleção e Orientação Profissional) da FGV, marco da psicotécnica no Brasil.", refs:[3,4] },
];

const NODES = [
  // Científica / experimental
  { id:"n-roxo", lane:"experimental", era:"precedentes", name:"Henrique Roxo", meta:"1900",
    blurb:"Defende a primeira tese de psicologia/psiquiatria experimental do Brasil e organiza laboratório no Hospício Nacional (RJ), sob influência da psicofisiologia europeia.",
    refs:[3,4], parents:["r-franca"] },
  { id:"n-radecki", lane:"experimental", era:"e1900", name:"Waclaw Radecki", meta:"Polônia → Brasil, 1923–1932",
    blurb:"Ex-assistente de Claparède em Genebra; funda em 1923 o laboratório de psicologia da Colônia de Psicopatas do Engenho de Dentro (RJ), elevado a Instituto de Psicologia em 1932 (Decreto-Lei nº 21.173/1931).",
    refs:[5,6], parents:["r-claparede","p-riedel"] },
  { id:"n-discipulos", lane:"experimental", era:"e1930", name:"Nilton Campos · Jayme Grabois", meta:"Discípulos de Radecki",
    blurb:"Formados no Instituto de Psicologia do Engenho de Dentro, dão continuidade à pesquisa experimental após a partida de Radecki para Argentina/Uruguai (1932).",
    refs:[5,6], parents:["n-radecki"] },
  { id:"n-ip-ufrj", lane:"experimental", era:"e1950", name:"Instituto de Psicologia (UFRJ)", meta:"Continuidade institucional",
    blurb:"O núcleo experimental fundado por Radecki desdobra-se no Instituto de Psicologia da então Universidade do Brasil, hoje UFRJ.",
    refs:[5,6], parents:["n-discipulos"] },

  // Psiquiatria / higiene mental
  { id:"p-moreira", lane:"psiquiatria", era:"e1900", name:"Juliano Moreira", meta:"Dir. do Hospício Nacional, 1903–1930",
    blurb:"Moderniza a psiquiatria brasileira em diálogo crítico com a psiquiatria alemã, refutando teses raciais de degeneração; cria as condições institucionais para o laboratório de Radecki.",
    refs:[3,4], parents:["r-degeneracao"] },
  { id:"p-riedel", lane:"psiquiatria", era:"e1900", name:"Gustavo Riedel", meta:"1923",
    blurb:"Funda a Liga Brasileira de Higiene Mental (1923) e organiza, com Radecki, o laboratório de psicologia do Engenho de Dentro.",
    refs:[3,4,5], parents:["p-moreira"] },
  { id:"p-ulisses", lane:"psiquiatria", era:"e1930", name:"Ulisses Pernambucano", meta:"Recife, Serviço de Higiene Mental de PE, 1931",
    blurb:"Lidera a “Escola do Recife”: psiquiatria social, higiene mental e diálogo pioneiro com práticas afro-brasileiras (terreiros), unindo clínica e questão social.",
    refs:[12,13], parents:["p-moreira"] },

  // Psicanálise
  { id:"a-franco", lane:"psicanalise", era:"e1900", name:"Franco da Rocha", meta:"São Paulo, 1919",
    blurb:"Professor de psiquiatria que primeiro apresenta Freud ao público brasileiro (aula “Do delírio em geral”, 1919, publicada n’O Estado de S. Paulo).",
    refs:[9], parents:["r-freud","r-franca"] },
  { id:"a-marcondes", lane:"psicanalise", era:"e1900", name:"Durval Marcondes", meta:"1926–1927",
    blurb:"Corresponde-se com Freud a partir de 1926; funda em 1927 a primeira Sociedade Brasileira de Psicanálise (SP), reconhecida pela IPA em 1929.",
    refs:[9], parents:["a-franco","r-freud"] },
  { id:"a-nucleorj", lane:"psicanalise", era:"e1900", name:"Núcleo do Rio de Janeiro", meta:"1928, Hospital Nacional de Psicopatas",
    blurb:"Presidido por Juliano Moreira, amplia a psicanálise nascente para o Rio de Janeiro, um ano após a fundação paulista.",
    refs:[9], parents:["a-marcondes","p-moreira"] },
  { id:"a-koch", lane:"psicanalise", era:"e1930", name:"Adelheid Koch", meta:"Berlim → São Paulo, 1936",
    blurb:"Psicanalista alemã (análise didática com Otto Fenichel); com Marcondes, funda em 1937 o 1º centro de formação de psicanalistas da América Latina.",
    refs:[9], parents:["r-freud","a-marcondes"] },
  { id:"a-sbpsp", lane:"psicanalise", era:"e1930", name:"Soc. Bras. de Psicanálise de SP", meta:"Reconhecimento IPA: 1944 (provisório) / 1951 (definitivo)",
    blurb:"Marcondes é o primeiro presidente; consolida a formação psicanalítica institucionalizada no Brasil.",
    refs:[9], parents:["a-marcondes","a-koch"] },

  // Educacional / Escola Nova
  { id:"e-bomfim", lane:"educacional", era:"e1900", name:"Manoel Bomfim", meta:"1906–1928",
    blurb:"Cria em 1906 o primeiro laboratório de psicologia no Pedagogium (RJ); publica “Noções de Psychologia” (1916) e “O Método dos Tests” (1928).",
    refs:[3,4], parents:["r-franca"] },
  { id:"e-lourenco", lane:"educacional", era:"e1900", name:"Lourenço Filho", meta:"1925",
    blurb:"Assume a cátedra de psicologia da Escola Normal de SP, cria os Testes ABC e torna-se uma das principais vozes da Escola Nova.",
    refs:[3,4,14], parents:["r-dewey","e-bomfim"] },
  { id:"e-manifesto", lane:"educacional", era:"e1930", name:"Anísio Teixeira · Fernando de Azevedo", meta:"Manifesto dos Pioneiros da Educação Nova, 1932",
    blurb:"Lideram a reforma educacional brasileira sob influência do pragmatismo de Dewey, integrando psicologia à política educacional.",
    refs:[14], parents:["r-dewey","e-lourenco"] },
  { id:"e-antipoff", lane:"educacional", era:"e1930", name:"Helena Antipoff", meta:"Rússia → Minas Gerais, 1929",
    blurb:"Formada com Claparède no Instituto J.-J. Rousseau (Genebra); funda a Sociedade Pestalozzi (1932) e pioneira a psicologia aplicada à educação especial no Brasil.",
    refs:[7,8], parents:["r-claparede","e-manifesto"] },

  // Behaviorismo
  { id:"b-keller", lane:"behaviorismo", era:"e1950", name:"Fred S. Keller", meta:"USP, 1961 (bolsista Fulbright)",
    blurb:"Ministra o primeiro curso de análise experimental do comportamento da América Latina, na USP.",
    refs:[10], parents:["r-skinner"] },
  { id:"b-bori", lane:"behaviorismo", era:"e1950", name:"Carolina Bori", meta:"USP",
    blurb:"Colaboradora e ex-aluna de Keller, torna-se a principal responsável pela disseminação da análise do comportamento no Brasil.",
    refs:[10], parents:["b-keller"] },
  { id:"b-psi", lane:"behaviorismo", era:"e1950", name:"Sistema Personalizado de Ensino (PSI)", meta:"UnB, 1964 — Keller, Bori, Rodolpho Azzi",
    blurb:"Implantação do método de ensino individualizado de Keller, marco da institucionalização do behaviorismo no ensino superior brasileiro.",
    refs:[10], parents:["b-keller","b-bori"] },
  { id:"b-expansao", lane:"behaviorismo", era:"e1970", name:"Expansão nacional", meta:"PUC-SP · UFSCar · UFPA · UFSC · UEL",
    blurb:"O Brasil torna-se o maior centro de análise do comportamento fora dos Estados Unidos.",
    refs:[10], parents:["b-psi"] },

  // Social sócio-histórica
  { id:"s-lane", lane:"social", era:"e1970", name:"Sílvia Lane", meta:"PUC-SP, 1970–1971",
    blurb:"Doutora em 1970 (diferencial semântico de Osgood); funda em 1971 a Faculdade de Psicologia da PUC-SP; sintetiza materialismo histórico-dialético e psicologia soviética (Vygotsky, Luria, Leontiev) numa psicologia social brasileira original.",
    refs:[11], parents:["r-sovietica"] },
  { id:"s-abrapso", lane:"social", era:"e1970", name:"ABRAPSO", meta:"Fundada por Lane, 10/07/1980",
    blurb:"Associação Brasileira de Psicologia Social; formaliza a psicologia sócio-histórica como corrente brasileira, em rede com a psicologia latino-americana crítica (Martín-Baró, Montero, González Rey).",
    refs:[11], parents:["s-lane"] },
  { id:"s-legado", lane:"social", era:"e1970", name:"Bader Sawaia · Antônio Ciampa e sucessores", meta:"Psicologia comunitária, identidade",
    blurb:"Continuam e ampliam a psicologia sócio-histórica e a psicologia comunitária no Brasil.",
    refs:[11], parents:["s-lane","s-abrapso"] },
];

const MILESTONES = [
  { id:"m1", name:"Decreto-Lei nº 21.173", meta:"1931", blurb:"Reconhece oficialmente o Instituto de Psicologia do Engenho de Dentro (RJ).", parents:["n-radecki"] },
  { id:"m2", name:"Primeiro diploma de especialização", meta:"1946", blurb:"Primeira habilitação formal em psicologia autorizada no país.", parents:["m1"] },
  { id:"m3", name:"ISOP / FGV", meta:"1947", blurb:"Instituto de Seleção e Orientação Profissional, sob Emilio Mira y López — psicotécnica e orientação profissional.", parents:["r-mira","m2"] },
  { id:"m4", name:"Primeiros cursos de graduação", meta:"PUC-Rio (1953) · PUC-RS (1954)", blurb:"Convergência das correntes anteriores no primeiro currículo universitário de Psicologia do Brasil.", parents:["m3","e-antipoff","a-sbpsp","p-ulisses"] },
  { id:"m5", name:"Lei nº 4.119", meta:"27/08/1962", blurb:"Regulamenta a profissão de psicólogo no Brasil.", parents:["m4"] },
  { id:"m6", name:"Lei nº 5.766 / CFP", meta:"1971 (instalado em 1973)", blurb:"Cria o Conselho Federal de Psicologia, instalado em 1973.", parents:["m5"] },
];

const SOURCES = [
  { t:"JACÓ-VILELA, A. M.; FERREIRA, A. A. L.; PORTUGAL, F. T. (orgs.). <em>História da Psicologia: Rumos e Percursos</em>. Rio de Janeiro: Nau (via coleção Clio-Psyché, SciELO Books).", u:"https://books.scielo.org/id/27bn3/pdf/jaco-9788575114988.pdf" },
  { t:"ANTUNES, M. A. M. <em>A Psicologia no Brasil: Leitura Histórica sobre sua Constituição</em>. São Paulo: EDUC/Unimarco.", u:"https://www.pucsp.br/educ/livro?id=127" },
  { t:"“História da Psicologia no Brasil: uma narrativa por meio de seu ensino”. <em>Psicologia: Ciência e Profissão</em>, SciELO.", u:"http://www.scielo.br/j/pcp/a/9KqzhPLhtm58PQNGQB39GLq/?lang=pt" },
  { t:"“A Psicologia no Brasil” (introdução). <em>Psicologia: Ciência e Profissão</em>, n.0, PePSIC.", u:"https://pepsic.bvsalud.org/pdf/pcp/n0/03.pdf" },
  { t:"“Radecki e a Psicologia no Brasil”. <em>Psicologia: Ciência e Profissão</em>, SciELO.", u:"https://www.scielo.br/j/pcp/a/S99LKWZM3pbmWFkW5MxSZqF/?lang=pt" },
  { t:"“Yes, nosotros tenemos a Wundt: Radecki y la historia de la psicología en Brasil”. Redalyc.", u:"https://www.redalyc.org/journal/1390/139050020004/html/" },
  { t:"“Helena Antipoff: razão e sensibilidade na psicologia e na educação”. <em>Educação e Pesquisa</em>, SciELO.", u:"http://www.scielo.br/j/ea/a/vrRrrTKm57vsYZvqDVpsgbx/?lang=pt" },
  { t:"“Helena Antipoff (1892–1974)”. <em>Psicologia: Ciência e Profissão</em>, SciELO.", u:"https://www.scielo.br/j/pcp/a/98LdGBPmKNgrPKzgZfYDLJp/?lang=pt" },
  { t:"“Notas para a história da psicanálise em São Paulo”. <em>Revista Brasileira de Psicanálise</em>, PePSIC.", u:"https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S0486-641X2012000200006" },
  { t:"“Análise do comportamento no Brasil”. <em>Psicologia: Teoria e Pesquisa</em>, SciELO.", u:"https://www.scielo.br/j/ptp/a/mxLr4CXqhTvFRppTrk3jTLL/?lang=pt" },
  { t:"“Sílvia Lane e o projeto do ‘Compromisso Social da Psicologia’”. <em>Psicologia & Sociedade</em>, SciELO.", u:"https://www.scielo.br/j/psoc/a/w5gPmcgxnB5w5ThhFkCyCtb/?format=html&lang=pt" },
  { t:"“Na história da medicina social, o grupo de Recife que levou a psiquiatria para além do muro dos sanatórios”. Casa de Oswaldo Cruz/Fiocruz.", u:"https://coc.fiocruz.br/todas-as-noticias/na-historia-da-medicina-social-o-grupo-de-recife-que-levou-a-psiquiatria-para-alem-do-muro-dos-sanatorios/" },
  { t:"“Ulisses Pernambucano, educador”. <em>Psicologia: Ciência e Profissão</em>, PePSIC.", u:"https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1414-98931992000100003" },
  { t:"“As influências do pensamento de John Dewey no movimento escolanovista brasileiro”. Revista Redescrições, UFRJ.", u:"https://revistas.ufrj.br/index.php/Redescricoes/article/download/15281/10035/33328" },
];

// ---------- render ----------
function dashSample(colorVar, dash){
  return `<svg width="30" height="10" style="flex-shrink:0;overflow:visible"><line x1="1" y1="5" x2="29" y2="5" style="stroke:${colorVar}" stroke-width="2.4" stroke-dasharray="${dash}" stroke-linecap="round"/></svg>`;
}
const legend = document.getElementById('legend');
Object.entries(LANES).forEach(([key,l]) => {
  const span = document.createElement('span');
  span.className = 'swatch legend-dash';
  span.innerHTML = `${dashSample(l.color, LANE_DASH[key])}${l.label}`;
  legend.appendChild(span);
});
legend.innerHTML += `<span class="swatch legend-dash">${dashSample('var(--c-institucional)', LANE_DASH.institucional)}Institucionalização / legislação</span>`;
legend.innerHTML += `<span class="swatch"><span class="dot root"></span>Raízes externas (Europa/EUA) — clicáveis</span>`;

function refLinks(refs){
  return refs.map(r => `<a href="#src-${r}">[${r}]</a>`).join(' ');
}

const rootsRow = document.getElementById('rootsRow');
ROOTS.forEach(r => {
  const div = document.createElement('div');
  div.className = 'root-card';
  div.id = r.id;
  div.innerHTML = `<div class="name">${r.name}</div><div class="meta">${r.meta}</div><div class="blurb">${r.blurb} ${refLinks(r.refs)}</div>`;
  div.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    toggleRoot(r.id);
  });
  rootsRow.appendChild(div);
});

const matrix = document.getElementById('matrix');
Object.entries(LANES).forEach(([key, lane]) => {
  const labelCell = document.createElement('div');
  labelCell.className = 'lane-label';
  labelCell.innerHTML = `<span class="bar" style="background:${lane.color}"></span><span>${lane.label}</span>`;
  matrix.appendChild(labelCell);

  ERAS.forEach(era => {
    const cell = document.createElement('div');
    cell.className = 'lane-cell';
    cell.dataset.lane = key;
    cell.dataset.era = era;
    matrix.appendChild(cell);
  });
});

function cellFor(lane, era){
  return matrix.querySelector(`.lane-cell[data-lane="${lane}"][data-era="${era}"]`);
}

NODES.forEach(n => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = n.id;
  card.style.setProperty('--card-color', LANES[n.lane].color);
  card.innerHTML = `<div class="name">${n.name}</div><div class="meta">${n.meta}</div><div class="blurb">${n.blurb}</div><div class="refs">${refLinks(n.refs)}</div>`;
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    card.classList.toggle('expanded');
  });
  cellFor(n.lane, n.era).appendChild(card);
});

const milestonesTrack = document.getElementById('milestonesTrack');
MILESTONES.forEach(m => {
  const div = document.createElement('div');
  div.className = 'm-card';
  div.id = m.id;
  div.innerHTML = `<div class="name">${m.name}</div><div class="meta">${m.meta}</div><div class="blurb">${m.blurb}</div>`;
  milestonesTrack.appendChild(div);
});

const sourcesList = document.getElementById('sourcesList');
SOURCES.forEach((s, i) => {
  const li = document.createElement('li');
  li.id = `src-${i+1}`;
  li.innerHTML = `${s.t} <a href="${s.u}" target="_blank" rel="noopener">${s.u}</a>`;
  sourcesList.appendChild(li);
});

// ---------- connectors ----------
const ALL_NODES = [...ROOTS, ...NODES, ...MILESTONES];
const EDGES = [];
ALL_NODES.forEach(n => {
  if (n.parents) n.parents.forEach(p => EDGES.push([p, n.id]));
});

function laneKeyOf(id){
  const n = NODES.find(x => x.id === id) || MILESTONES.find(x => x.id === id);
  if (!n) return null;
  return n.lane || 'institucional';
}

function laneColorOf(id){
  const key = laneKeyOf(id);
  if (!key) return getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
  return getComputedStyle(document.documentElement).getPropertyValue(`--c-${key}`);
}

function drawConnectors(){
  const svg = document.getElementById('connSvg');
  const wrap = document.getElementById('treeWrap');
  const wrapRect = wrap.getBoundingClientRect();
  svg.setAttribute('width', wrap.scrollWidth);
  svg.setAttribute('height', wrap.scrollHeight);
  svg.innerHTML = '';

  function pt(el, side){
    const r = el.getBoundingClientRect();
    const x0 = r.left - wrapRect.left, y0 = r.top - wrapRect.top;
    if (side === 'bottom') return { x: x0 + r.width/2, y: y0 + r.height };
    if (side === 'top')    return { x: x0 + r.width/2, y: y0 };
    if (side === 'left')   return { x: x0, y: y0 + r.height/2 };
    return { x: x0 + r.width, y: y0 + r.height/2 }; // right
  }

  EDGES.forEach(([fromId, toId]) => {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    if (!from || !to) return;
    const fr = from.getBoundingClientRect(), tr = to.getBoundingClientRect();
    const dx = (tr.left + tr.width/2) - (fr.left + fr.width/2);
    const dy = (tr.top + tr.height/2) - (fr.top + fr.height/2);
    let start, end, d;
    if (Math.abs(dy) > Math.abs(dx) * 0.5) {
      start = pt(from, dy >= 0 ? 'bottom' : 'top');
      end = pt(to, dy >= 0 ? 'top' : 'bottom');
      const midY = (start.y + end.y) / 2;
      d = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
    } else {
      start = pt(from, dx >= 0 ? 'right' : 'left');
      end = pt(to, dx >= 0 ? 'left' : 'right');
      const midX = (start.x + end.x) / 2;
      d = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
    }
    const laneKey = laneKeyOf(toId);
    const dash = LANE_DASH[laneKey] || "";
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', laneColorOf(toId).trim() || '#999');
    path.setAttribute('stroke-width', '1.6');
    path.setAttribute('stroke-opacity', '0.55');
    path.setAttribute('stroke-dasharray', dash);
    path.setAttribute('stroke-linecap', 'round');
    path.dataset.from = fromId; path.dataset.to = toId;
    path.classList.add('conn-path');
    svg.appendChild(path);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', end.x);
    dot.setAttribute('cy', end.y);
    dot.setAttribute('r', '2.6');
    dot.setAttribute('fill', laneColorOf(toId).trim() || '#999');
    dot.setAttribute('fill-opacity', '0.8');
    dot.dataset.from = fromId; dot.dataset.to = toId;
    dot.classList.add('conn-dot');
    svg.appendChild(dot);
  });

  if (activeRoot) applyHighlight(activeRoot);
}

// ---------- trajectory highlight ----------
const ADJ = {};
EDGES.forEach(([f, t]) => { (ADJ[f] = ADJ[f] || []).push(t); });

function trajectoryFrom(rootId){
  const visited = new Set([rootId]);
  const usedEdges = new Set();
  const stack = [rootId];
  while (stack.length){
    const cur = stack.pop();
    (ADJ[cur] || []).forEach(next => {
      usedEdges.add(cur + '->' + next);
      if (!visited.has(next)){ visited.add(next); stack.push(next); }
    });
  }
  return { visited, usedEdges };
}

let activeRoot = null;

function clearHighlight(){
  document.querySelectorAll('.root-card, .card, .m-card').forEach(el => {
    el.classList.remove('dimmed', 'lit', 'active-root');
  });
  document.querySelectorAll('#connSvg .conn-path').forEach(p => {
    p.setAttribute('stroke-width', '1.6');
    p.setAttribute('stroke-opacity', '0.55');
    p.style.filter = '';
  });
  document.querySelectorAll('#connSvg .conn-dot').forEach(c => {
    c.setAttribute('fill-opacity', '0.8');
    c.style.filter = '';
  });
}

function applyHighlight(rootId){
  const { visited, usedEdges } = trajectoryFrom(rootId);
  document.querySelectorAll('.root-card, .card, .m-card').forEach(el => {
    el.classList.remove('lit', 'active-root');
    el.classList.toggle('dimmed', !visited.has(el.id));
  });
  visited.forEach(id => document.getElementById(id)?.classList.add('lit'));
  document.getElementById(rootId)?.classList.add('active-root');
  document.getElementById(rootId)?.classList.remove('dimmed');

  document.querySelectorAll('#connSvg .conn-path').forEach(p => {
    const key = p.dataset.from + '->' + p.dataset.to;
    if (usedEdges.has(key)){
      p.setAttribute('stroke-width', '3');
      p.setAttribute('stroke-opacity', '1');
      p.style.filter = `drop-shadow(0 0 4px ${p.getAttribute('stroke')})`;
    } else {
      p.setAttribute('stroke-width', '1.6');
      p.setAttribute('stroke-opacity', '0.06');
      p.style.filter = '';
    }
  });
  document.querySelectorAll('#connSvg .conn-dot').forEach(c => {
    const key = c.dataset.from + '->' + c.dataset.to;
    if (usedEdges.has(key)){
      c.setAttribute('fill-opacity', '1');
      c.style.filter = `drop-shadow(0 0 3px ${c.getAttribute('fill')})`;
    } else {
      c.setAttribute('fill-opacity', '0.06');
      c.style.filter = '';
    }
  });
}

function toggleRoot(rootId){
  if (activeRoot === rootId){
    activeRoot = null;
    clearHighlight();
  } else {
    activeRoot = rootId;
    applyHighlight(rootId);
  }
}

window.addEventListener('load', () => { drawConnectors(); });
window.addEventListener('resize', () => { drawConnectors(); });
document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const cur = root.getAttribute('data-theme');
  root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  setTimeout(drawConnectors, 50);
});
// redraw after fonts/layout settle & when cards expand (heights may change)
document.addEventListener('click', () => setTimeout(drawConnectors, 220));
setTimeout(drawConnectors, 300);
