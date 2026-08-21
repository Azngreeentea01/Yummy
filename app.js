(()=>{
const D=window.YUMMY_DATA;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reviewCount=n=>n>=1000?`${(n/1000).toFixed(1)}K`:String(n);
const norm=s=>(s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const savedIds=()=>JSON.parse(localStorage.getItem('yummySaved')||'[]');
const setSaved=ids=>localStorage.setItem('yummySaved',JSON.stringify([...new Set(ids)]));

function nav(){
  const menu=$('[data-menu]'); if(!menu)return;
  const ov=document.createElement('div');ov.className='drawer-overlay';
  ov.innerHTML=`<aside class="drawer" aria-label="Mobile navigation"><button class="close-drawer">✕ Close</button><a href="index.html">Home</a><a href="results.html">Browse</a><a href="index.html#cuisines">Cuisines</a><a href="saved.html">Saved</a><button data-location>📍 Use current location</button></aside>`;
  document.body.appendChild(ov);
  menu.onclick=()=>ov.classList.add('open');
  $('.close-drawer',ov).onclick=()=>ov.classList.remove('open');
  ov.onclick=e=>{if(e.target===ov)ov.classList.remove('open')};
}
function toast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__tt);window.__tt=setTimeout(()=>t.classList.remove('show'),2200)}
function locationUI(){
  const stored=sessionStorage.getItem('yummyLocation'); if(stored) $$('[data-location]').forEach(x=>x.textContent=`📍 ${stored.length>19?stored.slice(0,19)+'…':stored}`);
  $$('[data-location]').forEach(b=>b.onclick=()=>{
    if(!navigator.geolocation)return openLocation();
    const original=b.textContent;b.textContent='Locating…';
    navigator.geolocation.getCurrentPosition(()=>{$$('[data-location]').forEach(x=>x.textContent='📍 Current location');sessionStorage.setItem('yummyLocation','Current location');toast('Location set for this session.')},()=>{b.textContent=original;openLocation()},{timeout:5000,maximumAge:300000});
  });
}
function openLocation(){
  let ov=$('.modal-overlay');
  if(!ov){ov=document.createElement('div');ov.className='modal-overlay';ov.innerHTML=`<div class="modal"><button class="close">×</button><h2>Where should Yummy search?</h2><p class="meta">Enter a city, ZIP code, or address. This cached build keeps it local and does not send it to a paid API.</p><form><input required placeholder="City, ZIP, or address"><button class="btn primary">Use this location</button></form></div>`;document.body.appendChild(ov);$('.close',ov).onclick=()=>ov.classList.remove('open');$('form',ov).onsubmit=e=>{e.preventDefault();const v=$('input',ov).value.trim();sessionStorage.setItem('yummyLocation',v);$$('[data-location]').forEach(x=>x.textContent=`📍 ${v.length>19?v.slice(0,19)+'…':v}`);ov.classList.remove('open');toast(`Searching near ${v}`)}}
  ov.classList.add('open'); setTimeout(()=>$('input',ov)?.focus(),30);
}
function resultCard(r){
  const saved=savedIds().includes(r.id);
  return `<article class="result-card" data-id="${r.id}" tabindex="0"><div class="thumb" style="background-image:url('${r.image}')"></div><div class="card-content"><div><span class="name">${r.name}</span><span class="status ${r.open?'':'closed'}">${r.open?'Open':'Closed'}</span></div><div class="rating"><span class="star">★</span> ${r.rating} <span class="meta">(${reviewCount(r.reviews)})</span></div><div class="meta">${r.cuisines.join(', ')} · ${r.type} · ${r.price} · ${r.distance.toFixed(1)} mi</div><div class="meta address">⌖ ${r.address}</div><div class="meta">${r.delivery}</div><button class="view-menu" data-open="${r.id}">View Menu</button><div class="source-row">${r.ratings.map(x=>`<span class="source">${x[0]} ${x[1]}</span>`).join('')}</div><button class="save-card" data-save-card="${r.id}" aria-label="${saved?'Remove from saved':'Save restaurant'}">${saved?'♥':'♡'}</button></div></article>`
}
function bindCards(){
  $$('[data-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();location.href=`restaurant.html?id=${b.dataset.open}`});
  $$('[data-save-card]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleSaved(b.dataset.saveCard,b)});
  $$('.result-card').forEach(c=>{
    c.onclick=e=>{if(e.target.closest('button'))return;location.href=`restaurant.html?id=${c.dataset.id}`};
    c.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();location.href=`restaurant.html?id=${c.dataset.id}`}};
    c.onmouseenter=()=>activateMap(c.dataset.id); c.onfocusin=()=>activateMap(c.dataset.id);
  });
}
function toggleSaved(id,btn){let ids=savedIds();const has=ids.includes(id);ids=has?ids.filter(x=>x!==id):[...ids,id];setSaved(ids);if(btn){btn.textContent=has?'♡':'♥';btn.classList.toggle('is-saved',!has)}toast(has?'Removed from saved.':'Saved restaurant.');renderSaved()}
function mapPins(items){const m=$('[data-map]');if(!m)return;m.querySelectorAll('.pin').forEach(p=>p.remove());items.forEach(r=>{const p=document.createElement('button');p.className='pin';p.style.left=r.pin[0]+'%';p.style.top=r.pin[1]+'%';p.dataset.id=r.id;p.setAttribute('aria-label',r.name);p.onclick=()=>activateMap(r.id,true);m.appendChild(p)})}
function activateMap(id){const r=D.restaurants.find(x=>x.id===id);if(!r)return;$$('.pin').forEach(p=>p.classList.toggle('active',p.dataset.id===id));$$('.result-card').forEach(c=>c.classList.toggle('is-active',c.dataset.id===id));const c=$('.map-card');if(c){c.innerHTML=`<strong>${r.name}</strong><div class="meta"><span class="star">★</span> ${r.rating} · ${r.price} · ${r.distance.toFixed(1)} mi</div><button class="btn primary" data-map-open style="margin-top:8px;padding:7px 10px">View menu</button>`;c.classList.add('show');$('[data-map-open]',c).onclick=()=>location.href=`restaurant.html?id=${r.id}`}}
function buildHay(r){
  const menu=r.menu.flatMap(c=>[c.category,...c.items.flatMap(i=>[i[0],i[2],...(i[3]||[])])]);
  return norm([r.name,r.type,...r.cuisines,...r.popular,...menu].join(' '));
}
function filtered(){
  const q=norm($('#resultsQuery')?.value||new URLSearchParams(location.search).get('q')||'');
  const terms=q.split(' ').filter(Boolean);
  const cuisines=$$('.filter[data-cuisine].active').map(x=>x.dataset.cuisine).filter(x=>x!=='All Asian');
  const open=$('.filter[data-open-now]')?.classList.contains('active'); const hi=$('.filter[data-rating]')?.classList.contains('active');
  return D.restaurants.filter(r=>{
    const hay=buildHay(r); const termMatch=!terms.length||terms.every(t=>hay.includes(t))||terms.some(t=>hay.includes(t));
    return termMatch&&(!cuisines.length||cuisines.some(c=>r.cuisines.includes(c)))&&(!open||r.open)&&(!hi||r.rating>=4.5)&&r.distance<=10;
  });
}
function sorted(items){const s=$('[data-sort]')?.value||'best';return [...items].sort((a,b)=>s==='distance'?a.distance-b.distance:s==='rating'?b.rating-a.rating:(b.rating*10-a.rating*10)+(a.distance-b.distance)*.25)}
function renderResults(){const root=$('[data-results]');if(!root)return;const items=sorted(filtered());root.classList.add('is-loading');setTimeout(()=>root.classList.remove('is-loading'),120);root.innerHTML=items.map(resultCard).join('');$('.result-empty')?.classList.toggle('show',!items.length);const count=$('[data-count]');if(count)count.textContent=`${items.length} cached matches within 10 miles`;const q=$('#resultsQuery')?.value||new URLSearchParams(location.search).get('q')||'Asian food';const title=$('[data-result-title]');if(title)title.textContent=`${q||'Asian food'} near you`;mapPins(items);bindCards();if(items.length)activateMap(items[0].id)}
function home(){const root=$('[data-home-list]');if(!root)return;const items=D.restaurants.slice(0,4);root.innerHTML=items.map(resultCard).join('');mapPins(items);bindCards();activateMap(items[0].id)}
function filters(){
  $$('.filter[data-cuisine]').forEach(b=>b.onclick=()=>{if(b.dataset.cuisine==='All Asian'){$$('.filter[data-cuisine]').forEach(x=>x.classList.remove('active'));b.classList.add('active')}else{$('.filter[data-cuisine="All Asian"]')?.classList.remove('active');b.classList.toggle('active');if(!$$('.filter[data-cuisine].active').length)$('.filter[data-cuisine="All Asian"]')?.classList.add('active')}renderResults()});
  $$('.filter[data-open-now],.filter[data-rating]').forEach(b=>b.onclick=()=>{b.classList.toggle('active');renderResults()});
  $$('.cuisine[data-cuisine]').forEach(b=>b.onclick=()=>location.href=`results.html?cuisine=${encodeURIComponent(b.dataset.cuisine)}`);
  $('[data-sort]')?.addEventListener('change',renderResults);
}
function search(){const p=new URLSearchParams(location.search),q=p.get('q'),c=p.get('cuisine');if($('#resultsQuery')&&q)$('#resultsQuery').value=q;if(c&&c!=='All Asian'){const b=$(`.filter[data-cuisine="${CSS.escape(c)}"]`);if(b){$$('.filter[data-cuisine]').forEach(x=>x.classList.remove('active'));b.classList.add('active')}}$$('form[data-search]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const inp=$('input[name="q"]',f);location.href=`results.html?q=${encodeURIComponent(inp?.value.trim()||'Asian food')}`})}
function mobileMap(){const b=$('[data-map-toggle]'),l=$('.results-layout');if(!b||!l)return;b.onclick=()=>{const m=l.classList.toggle('mobile-map');b.textContent=m?'List':'Map';b.setAttribute('aria-pressed',m)}}
function menuHTML(r){return `<p class="meta">Menu prices are cached demo data. Yummy keeps the source visible so users can verify freshness when live providers are connected.</p>${r.menu.map(c=>`<h2 class="menu-category">${c.category}</h2>${c.items.map(i=>`<div class="dish"><div><span class="dish-name">${i[0]}</span>${i[3].map(t=>`<span class="tag">${t}</span>`).join('')}<div class="meta">${i[2]}</div></div><div class="dish-price">${i[1]}</div></div>`).join('')}`).join('')}<div class="source-note">Source: ${r.menuSource}. No live API calls are used in this local build.</div>`}
function overviewHTML(r){return `<div class="info-block"><h2>About ${r.name}</h2><p>${r.name} is listed in this cached Yummy demo as a ${r.cuisines.join(', ')} ${r.type.toLowerCase()} restaurant ${r.distance.toFixed(1)} miles away.</p><div class="facts"><span>${r.price} price range</span><span>${r.open?'Open now':'Currently closed'}</span><span>${r.delivery}</span></div><h3>Popular here</h3><p>${r.popular.join(' · ')}</p></div>`}
function reviewsHTML(r){return `<div class="info-block"><h2>Ratings by source</h2><p class="meta">Yummy intentionally does not merge these into a fake universal rating.</p>${r.ratings.map(x=>`<div class="review-source"><strong>${x[0]}</strong><span><span class="star">★</span> ${x[1]}</span></div>`).join('')}</div>`}
function photosHTML(r){const gallery=[r.image,...D.restaurants.filter(x=>x.id!==r.id).slice(0,5).map(x=>x.image)];return `<div class="photo-grid">${gallery.map(im=>`<div style="background-image:url('${im}')"></div>`).join('')}</div>`}
function detail(){const root=$('[data-detail]');if(!root)return;const id=new URLSearchParams(location.search).get('id')||'seoul-garden',r=D.restaurants.find(x=>x.id===id)||D.restaurants[0];document.title=`${r.name} — Yummy`;const gallery=[r.image,...D.restaurants.filter(x=>x.id!==r.id).slice(0,4).map(x=>x.image)];const saved=savedIds().includes(r.id);root.innerHTML=`<div class="gallery">${gallery.map((im,i)=>`<div class="photo ${i===0?'main':''}" style="background-image:url('${im}')"></div>`).join('')}</div><div class="detail-head"><div><h1>${r.name}</h1><div class="meta">${r.cuisines.join(', ')} · ${r.type} · ${r.price} · ${r.distance.toFixed(1)} miles away</div><div class="rating-sources">${r.ratings.map(x=>`<span class="rating-source">${x[0]} ★ ${x[1]}</span>`).join('')}</div></div><div class="actions"><button class="btn" data-detail-save>${saved?'♥ Saved':'♡ Save'}</button><button class="btn" data-directions>Directions</button><button class="btn primary" data-official>Official menu</button></div></div><div class="detail-grid"><section><div class="tabs"><button class="tab active" data-tab="menu">Menu</button><button class="tab" data-tab="overview">Overview</button><button class="tab" data-tab="reviews">Reviews</button><button class="tab" data-tab="photos">Photos</button></div><div data-tab-content>${menuHTML(r)}</div></section><aside class="side"><h3>Restaurant details</h3><div class="side-row"><b style="color:${r.open?'var(--green)':'#9b4433'}">${r.open?'Open now':'Closed'}</b><br><span class="meta">${r.closes}</span></div><div class="side-row"><b>Price</b><br><span class="meta">${r.price} · estimated ${r.price==='$'?'$10–20':'$15–30'} per person</span></div><div class="side-row"><b>Address</b><br><span class="meta">${r.address}</span></div><div class="mini-map"></div><button class="btn primary" data-directions style="width:100%">Get directions</button><div class="side-row"><b>Features</b><br><span class="meta">Dine-in · Takeout · Delivery</span></div><div class="side-row"><b>Data mode</b><br><span class="meta">Cached local dataset</span></div></aside></div>`;
  $('[data-detail-save]').onclick=e=>toggleSaved(r.id,e.currentTarget);
  $$('[data-directions]').forEach(b=>b.onclick=()=>toast('Directions are disabled in cached mode. Live maps can be connected later.')); $('[data-official]').onclick=()=>toast('Official menu links will be connected only through permitted live sources.');
  $$('.tab').forEach(t=>t.onclick=()=>{$$('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const c=$('[data-tab-content]');c.innerHTML=t.dataset.tab==='menu'?menuHTML(r):t.dataset.tab==='overview'?overviewHTML(r):t.dataset.tab==='reviews'?reviewsHTML(r):photosHTML(r)})
}
function renderSaved(){const root=$('[data-saved-list]');if(!root)return;const items=savedIds().map(id=>D.restaurants.find(r=>r.id===id)).filter(Boolean);root.innerHTML=items.length?items.map(resultCard).join(''):`<div class="result-empty show"><h2>No saved restaurants yet</h2><p class="meta">Use the heart on a restaurant card or detail page to save it here.</p><a class="btn primary" href="results.html">Browse restaurants</a></div>`;bindCards()}
function loadMore(){const b=$('[data-load-more]');if(b)b.onclick=()=>{const current=$$('[data-home-list] .result-card').length;const root=$('[data-home-list]');root.insertAdjacentHTML('beforeend',D.restaurants.slice(current,current+4).map(resultCard).join(''));bindCards();mapPins(D.restaurants.slice(0,current+4));if(current+4>=D.restaurants.length)b.style.display='none'}}
nav();locationUI();search();filters();home();renderResults();mobileMap();detail();renderSaved();loadMore();
})();
