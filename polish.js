(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const D=window.YUMMY_DATA;

  function sortHome(){
    const select=$('[data-home-sort]'), root=$('[data-home-list]');
    if(!select||!root||!D)return;
    const cards=$$('.result-card',root);
    cards.sort((a,b)=>{
      const ra=D.restaurants.find(r=>r.id===a.dataset.id), rb=D.restaurants.find(r=>r.id===b.dataset.id);
      if(!ra||!rb)return 0;
      return select.value==='rating'?rb.rating-ra.rating:ra.distance-rb.distance;
    }).forEach(card=>root.appendChild(card));
  }

  function applyRadius(){
    const sel=$('[data-radius]'), root=$('[data-results]');
    if(!sel||!root||!D)return;
    const radius=Number(sel.value||10);
    const allowed=new Set(D.restaurants.filter(r=>r.distance<=radius).map(r=>r.id));
    const visibleCards=[];
    $$('.result-card',root).forEach(card=>{const show=allowed.has(card.dataset.id);card.hidden=!show;if(show)visibleCards.push(card)});
    $$('.pin').forEach(pin=>{pin.hidden=!allowed.has(pin.dataset.id)});
    const count=$('[data-count]');if(count)count.textContent=`${visibleCards.length} cached matches within ${radius} miles`;
    const empty=$('.result-empty');if(empty)empty.classList.toggle('show',visibleCards.length===0);
    const mapCard=$('.map-card');
    if(mapCard&&visibleCards.length===0){mapCard.classList.remove('show');mapCard.innerHTML=''}
    if(visibleCards.length){const active=$('.result-card.is-active',root);if(!active||active.hidden)visibleCards[0].dispatchEvent(new Event('mouseenter'))}
  }

  function clearFilters(){
    const clear=$('[data-clear]');if(!clear)return;
    clear.addEventListener('click',()=>{ location.href='results.html'; });
  }

  function cachedModeControls(){
    $$('[data-directions]').forEach(btn=>{
      btn.disabled=true;
      btn.classList.add('cached-disabled');
      btn.textContent='Directions · live map';
      btn.title='Directions will be enabled when a permitted live map provider is connected.';
    });
    const official=$('[data-official]');
    if(official){
      official.disabled=true;
      official.classList.add('cached-disabled');
      official.textContent='Official menu · live source';
      official.title='Official menu links will be enabled when a permitted live menu source is connected.';
    }
  }

  function keepDetailSaveLabel(){
    const btn=$('[data-detail-save]');if(!btn)return;
    const id=new URLSearchParams(location.search).get('id')||'seoul-garden';
    const sync=()=>{let ids=[];try{ids=JSON.parse(localStorage.getItem('yummySaved')||'[]')}catch{}const on=ids.includes(id);btn.textContent=on?'♥ Saved':'♡ Save';btn.setAttribute('aria-pressed',String(on))};
    btn.addEventListener('click',()=>setTimeout(sync,0));sync();
  }

  const homeSort=$('[data-home-sort]');if(homeSort){homeSort.addEventListener('change',sortHome);sortHome()}
  const radius=$('[data-radius]');if(radius){radius.addEventListener('change',applyRadius);applyRadius();const root=$('[data-results]');if(root)new MutationObserver(()=>applyRadius()).observe(root,{childList:true})}
  clearFilters();
  cachedModeControls();
  keepDetailSaveLabel();
})();
