(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const D=window.YUMMY_DATA;

  function sortHome(){
    const select=$('[data-home-sort]'), root=$('[data-home-list]');
    if(!select||!root||!D)return;
    const order=[...D.restaurants].sort((a,b)=>select.value==='rating'?b.rating-a.rating:a.distance-b.distance).slice(0,4).map(r=>r.id);
    order.forEach(id=>{const card=root.querySelector(`[data-id="${CSS.escape(id)}"]`);if(card)root.appendChild(card)});
  }

  function applyRadius(){
    const sel=$('[data-radius]'), root=$('[data-results]');
    if(!sel||!root||!D)return;
    const radius=Number(sel.value||10);
    const allowed=new Set(D.restaurants.filter(r=>r.distance<=radius).map(r=>r.id));
    let visible=0;
    $$('.result-card',root).forEach(card=>{const show=allowed.has(card.dataset.id);card.hidden=!show;if(show)visible++});
    $$('.pin').forEach(pin=>{pin.hidden=!allowed.has(pin.dataset.id)});
    const count=$('[data-count]');if(count)count.textContent=`${visible} cached matches within ${radius} miles`;
    const empty=$('.result-empty');if(empty)empty.classList.toggle('show',visible===0);
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

  const homeSort=$('[data-home-sort]');if(homeSort){homeSort.addEventListener('change',sortHome);sortHome()}
  const radius=$('[data-radius]');if(radius){radius.addEventListener('change',applyRadius);applyRadius();const root=$('[data-results]');if(root)new MutationObserver(()=>applyRadius()).observe(root,{childList:true})}
  clearFilters();
  cachedModeControls();
})();
