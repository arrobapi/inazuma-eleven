// Inazuma Eleven – Enciclopedia Fan
// 100% estático, para GitHub Pages
let CHARACTERS = [];

async function load() {
  try {
    const res = await fetch('data/characters.json');
    CHARACTERS = await res.json();
  } catch(e){
    // fallback por si abres file://
    const res = await fetch('./data/characters.json');
    CHARACTERS = await res.json();
  }
  render();
  showJsonPreview();
  document.getElementById('stat-count').textContent = CHARACTERS.length;
}

function match(c, q, pos, elem, equipo) {
  const hay = (q === '' ) || [
    c.nombre, c.nombre_japones, c.alias?.join(' '), c.descripcion, c.personalidad,
    ...(c.tags||[]),
    ...(c.supertécnicas_anime||[]).map(t=>t.nombre)
  ].join(' ').toLowerCase().includes(q.toLowerCase());
  const posOk = !pos || (c.posicion||'').toLowerCase().includes(pos.toLowerCase());
  const elemOk = !elem || c.elemento === elem;
  const equipoOk = !equipo || (c.equipos||[]).some(e => e.includes(equipo));
  return hay && posOk && elemOk && equipoOk;
}

function elemClass(el){
  return 'elem-badge elem-'+(el||'').replace(' ','');
}

function cardHTML(c){
  const techCount = (c.supertécnicas_anime?.length || 0) + (c.supertécnicas_videojuego?.length || 0);
  return `
  <article class="card" data-id="${c.id}">
    <div class="card-img">
      <img src="${c.imagen}" alt="${c.nombre}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300/0f1a33/87baff?text=Inazuma'">
      <div class="${elemClass(c.elemento)}">${c.elemento||''}</div>
      <div class="dorsal-badge">#${c.dorsal||'?'}</div>
    </div>
    <div class="card-body">
      <h3>${c.nombre}</h3>
      <div class="jp">${c.nombre_japones||''}</div>
      <div class="meta">
        <span class="pill">${c.posicion||'—'}</span>
        <span class="pill">${(c.equipos&&c.equipos[0])||'Raimon'}</span>
      </div>
      <p class="desc">${c.descripcion||''}</p>
      <div class="card-foot">
        <span><strong>${techCount}</strong> técnicas</span>
        <span>ver ficha →</span>
      </div>
    </div>
  </article>`;
}

function render(){
  const q = document.getElementById('q').value.trim();
  const pos = document.getElementById('f-posicion').value;
  const elem = document.getElementById('f-elemento').value;
  const equipo = document.getElementById('f-equipo').value;
  const grid = document.getElementById('grid');
  const list = CHARACTERS.filter(c => match(c,q,pos,elem,equipo));
  if(!list.length){
    grid.innerHTML = `<div class="empty">No hay resultados para “${q||pos||elem||equipo}”.<br>Prueba con Axel, Mark, Jude…</div>`;
    return;
  }
  grid.innerHTML = list.map(cardHTML).join('');
  grid.querySelectorAll('.card').forEach(el=>{
    el.addEventListener('click', ()=> openModal(el.dataset.id));
  });
}

function openModal(id){
  const c = CHARACTERS.find(x=>x.id===id);
  if(!c) return;
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  const techAnime = (c.supertécnicas_anime||[]).map(t=>`
    <div class="tech">${t.nombre}<small>${t.tipo||'Tiro'} · ${t.elemento||c.elemento||''}${t.compañero? ' · con '+t.compañero:''}</small></div>
  `).join('') || '<span style="color:#8aa6cc">—</span>';

  const techGame = (c.supertécnicas_videojuego||[]).map(t=>`
    <div class="tech">${t.nombre}<small>${t.juego||''} · ${t.tipo||''}</small></div>
  `).join('');

  // Estadísticas – tomamos la primera disponible
  let statsHtml = '';
  if(c.estadisticas){
    const firstKey = Object.keys(c.estadisticas)[0];
    const st = c.estadisticas[firstKey];
    statsHtml = `<div class="section-title">Estadísticas – ${firstKey}</div>
      <div class="stat-grid">
        ${Object.entries(st).map(([k,v])=>`<div class="stat"><b>${v}</b><span>${k}</span></div>`).join('')}
      </div>`;
  }

  body.innerHTML = `
  <div class="modal-grid">
    <div class="modal-left">
      <img src="${c.imagen}" alt="${c.nombre}" onerror="this.style.opacity=.3">
      <div class="left-pad">
        <div class="tags">
          ${(c.tags||[]).map(t=>`<span class="tag">#${t}</span>`).join('')}
        </div>
        <div class="kv">
          <b>Posición</b><span>${c.posicion||'—'}</span>
          <b>Elemento</b><span>${c.elemento||'—'}</span>
          <b>Dorsal</b><span>${c.dorsal||'—'}</span>
          <b>Género</b><span>${c.genero||'—'}</span>
          <b>Curso</b><span>${c.curso||'—'}</span>
        </div>
        ${c.fuente ? `<div class="source-link">Fuente: <a href="${c.fuente}" target="_blank" rel="noopener">Inazuma Eleven Wiki</a></div>`:''}
      </div>
    </div>
    <div class="modal-right">
      <h2>${c.nombre}</h2>
      <div class="sub">${c.nombre_japones||''} ${c.alias? '· '+c.alias.slice(0,2).join(' / '):''}</div>
      <p style="color:#cfe1ff;line-height:1.6;margin:8px 0 6px">${c.descripcion||''}</p>
      ${c.personalidad ? `<p style="color:#9fb7d9;font-size:14px;line-height:1.55"><em>${c.personalidad}</em></p>`:''}
      ${c.historia_breve ? `<p style="color:#b9cde8;font-size:13.5px">${c.historia_breve}</p>`:''}

      <div class="section-title">Equipos</div>
      <div class="tags">${(c.equipos||[]).map(e=>`<span class="tag">${e}</span>`).join('')}</div>

      <div class="section-title">Supertécnicas (anime)</div>
      <div class="tech-list">${techAnime}</div>

      ${techGame ? `<div class="section-title">Supertécnicas (videojuego)</div><div class="tech-list">${techGame}</div>`:''}

      ${statsHtml}
    </div>
  </div>`;
  modal.showModal();
}

function showJsonPreview(){
  const el = document.getElementById('json-preview');
  if(!el) return;
  const axel = CHARACTERS.find(c=>c.id==='axel_blaze') || CHARACTERS[0];
  el.textContent = JSON.stringify(axel, null, 2);
}

document.getElementById('q').addEventListener('input', render);
['f-posicion','f-elemento','f-equipo'].forEach(id=>{
  document.getElementById(id).addEventListener('change', render);
});
document.getElementById('clear').addEventListener('click', ()=>{
  document.getElementById('q').value='';
  document.getElementById('f-posicion').value='';
  document.getElementById('f-elemento').value='';
  document.getElementById('f-equipo').value='';
  render();
});
document.getElementById('modal-close').addEventListener('click', ()=> document.getElementById('modal').close());
document.getElementById('modal').addEventListener('click', (e)=>{
  const r = e.target.getBoundingClientRect();
  if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom){
    e.currentTarget.close();
  }
});
document.getElementById('btn-copy')?.addEventListener('click', async ()=>{
  const txt = document.getElementById('json-preview').textContent;
  await navigator.clipboard.writeText(txt);
  const btn = document.getElementById('btn-copy');
  const old = btn.textContent;
  btn.textContent = '¡Copiado!';
  setTimeout(()=>btn.textContent = old, 1300);
});

load();
