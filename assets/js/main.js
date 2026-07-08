gsap.registerPlugin(ScrollTrigger);
const $ = (sel, ctx) => (ctx||document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));

/* ---------- PRELOADER ---------- */
(function preload(){
  const fill = document.getElementById('plFill');
  const pct = document.getElementById('plPct');
  if(!fill) { revealPage(); return; }
  let p = 0;
  document.body.style.overflow = 'hidden';
  const t = setInterval(()=>{
    p += Math.random()*18;
    if(p >= 100){ p = 100; clearInterval(t);
      setTimeout(()=>{
        gsap.to('#preloader',{opacity:0,duration:.7,ease:'power2.out',onComplete:()=>{
          document.getElementById('preloader').style.display='none';
          document.body.style.overflow='';
          revealPage();
        }});
      },260);
    }
    fill.style.width = p+'%';
    pct.textContent = 'CALIBRATING — '+Math.floor(p)+'%';
  }, 140);
})();

function revealPage(){
  playHeroIntro();
  animateCounters();
}

/* ---------- CUSTOM CURSOR ---------- */
const cDot = document.getElementById('cDot'), cRing = document.getElementById('cRing');
if(cDot && cRing){
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; cDot.style.left=mx+'px'; cDot.style.top=my+'px'; });
  (function loop(){ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; cRing.style.left=rx+'px'; cRing.style.top=ry+'px'; requestAnimationFrame(loop); })();
  $$('a,button,.cat-card,.prod-card,.faq-q,input,textarea,select,.pd-thumb,.tab-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>cRing.classList.add('hover'));
    el.addEventListener('mouseleave',()=>cRing.classList.remove('hover'));
  });
}

/* ---------- HEADER SCROLL STATE ---------- */
const header = document.getElementById('siteHeader');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', ()=>{
  if(header) header.classList.toggle('solid', window.scrollY > 60);
  if(backTop) backTop.classList.toggle('show', window.scrollY > 800);
});

/* ---------- MOBILE DRAWER ---------- */
const burger = document.getElementById('burger'), drawer = document.getElementById('mobileDrawer');
if(burger && drawer){
  burger.addEventListener('click', ()=>{ burger.classList.toggle('open'); drawer.classList.toggle('open'); });
  $$('a:not([data-sub])', drawer).forEach(a=>a.addEventListener('click',()=>{ burger.classList.remove('open'); drawer.classList.remove('open'); }));
  const sub = $('[data-sub]', drawer);
  if(sub) sub.addEventListener('click', function(){
    const target = document.getElementById(this.dataset.sub);
    target.style.maxHeight = target.style.maxHeight ? '' : target.scrollHeight+'px';
  });
}

/* ---------- SEARCH OVERLAY ---------- */
const searchData = [
  {t:'PAC-EEzE Dolly Conversion Kit', c:'Packout Mobility', href:'product.html'},
  {t:'Pneumatic Replacement Wheels', c:'Wheels & Casters', href:'shop.html'},
  {t:'Front Caster Wheel Kit', c:'Wheels & Casters', href:'shop.html'},
  {t:'Modular Insert Tray System', c:'Tool Organization', href:'shop.html'},
  {t:'Warranty Registration', c:'Support', href:'support.html'},
  {t:'Become a Dealer', c:'Dealers', href:'dealers.html'},
  {t:'Download Center', c:'Resources', href:'downloads.html'},
  {t:'Contact Us', c:'Support', href:'contact.html'},
];
const searchOverlay = document.getElementById('searchOverlay');
if(searchOverlay){
  const searchInput = document.getElementById('searchInput'), searchResults = document.getElementById('searchResults'), searchCount = document.getElementById('searchCount');
  function renderSearch(q){
    const f = searchData.filter(d => d.t.toLowerCase().includes(q.toLowerCase()) || d.c.toLowerCase().includes(q.toLowerCase()));
    searchCount.textContent = f.length+' results';
    searchResults.innerHTML = f.map(d=>`<a href="${d.href}"><span>${d.t}</span><span style="color:var(--c-steel-light);font-size:12px;">${d.c}</span></a>`).join('');
  }
  document.getElementById('openSearch').addEventListener('click', ()=>{ searchOverlay.classList.add('open'); renderSearch(''); setTimeout(()=>searchInput.focus(),350); });
  document.getElementById('closeSearch').addEventListener('click', ()=> searchOverlay.classList.remove('open'));
  searchInput.addEventListener('input', e=> renderSearch(e.target.value));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') searchOverlay.classList.remove('open'); });
}

/* ---------- HERO SPLIT-TEXT + PARALLAX ---------- */
function playHeroIntro(){
  if(!$('.hero h1')) return;
  gsap.to('.hero h1 .word', { y:0, opacity:1, rotate:0, duration:1.1, ease:'power4.out', stagger:0.1, delay:.1 });
  gsap.from('.hero-badge, .hero p.lead, .hero-cta-row, .hero-stats', { y:26, opacity:0, duration:.9, ease:'power3.out', stagger:0.12, delay:.5 });
  if($('.hero-visual')) gsap.from('.hero-visual', { scale:.85, opacity:0, duration:1.2, ease:'power3.out', delay:.3 });
}
const heroVisual = document.getElementById('heroVisual');
if(heroVisual){
  window.addEventListener('mousemove', e=>{
    if(window.innerWidth < 980) return;
    const nx = (e.clientX/window.innerWidth - .5), ny = (e.clientY/window.innerHeight - .5);
    gsap.to(heroVisual, { x: nx*24, y: ny*24, rotateY: nx*8, rotateX: -ny*8, duration:.8, ease:'power2.out' });
  });
}

/* ---------- PARTICLE CANVAS ---------- */
const canvas = document.getElementById('particleCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let particles = [];
  function sizeCanvas(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  function initParticles(){
    sizeCanvas();
    particles = Array.from({length:70}, ()=>({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx: (Math.random()-.5)*.15, vy: (Math.random()-.5)*.15, r: Math.random()*1.6+.4
    }));
  }
  function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
      if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(230,230,228,.5)'; ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  initParticles(); drawParticles();
  window.addEventListener('resize', initParticles);
}

/* ---------- COUNTERS ---------- */
function animateCounters(){
  $$('.counter').forEach(el=>{
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal||0);
    const suffix = el.dataset.suffix||'';
    const obj = {v:0};
    gsap.to(obj, { v: target, duration: 2, ease:'power2.out', onUpdate: ()=> el.textContent = obj.v.toFixed(decimal)+suffix });
  });
}

/* ---------- SCROLL REVEALS ---------- */
$$('.reveal').forEach(el=>{
  gsap.to(el, { opacity:1, y:0, duration:1, ease:'power3.out', scrollTrigger:{ trigger: el, start:'top 85%' } });
});
gsap.utils.toArray('.cat-card, .prod-card, .news-card, .ind-card, .cert-card, .accessory-card').forEach((el,i)=>{
  gsap.from(el, { opacity:0, y:36, duration:.8, ease:'power3.out', delay:(i%4)*0.08, scrollTrigger:{ trigger: el, start:'top 90%' } });
});
gsap.utils.toArray('.tl-item').forEach((el)=>{
  gsap.from(el, { opacity:0, x:-24, duration:.7, ease:'power3.out', scrollTrigger:{ trigger: el, start:'top 88%' } });
});

/* ---------- MAGNETIC BUTTONS ---------- */
$$('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
    gsap.to(btn, { x:x*0.25, y:y*0.4, duration:.4, ease:'power2.out' });
  });
  btn.addEventListener('mouseleave', ()=> gsap.to(btn, { x:0, y:0, duration:.5, ease:'elastic.out(1,0.4)' }));
});

/* ---------- BUTTON RIPPLE ---------- */
$$('.btn').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const r = document.createElement('span'); r.className='ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size+'px';
    r.style.left = (e.clientX-rect.left-size/2)+'px';
    r.style.top = (e.clientY-rect.top-size/2)+'px';
    this.appendChild(r); setTimeout(()=>r.remove(), 650);
  });
});

/* ---------- TESTIMONIALS CAROUSEL ---------- */
const testTrack = document.getElementById('testTrack');
if(testTrack){
  const testDots = $$('.test-dot');
  let testIndex = 0;
  function goTestSlide(i){
    testIndex = i;
    testTrack.style.transform = `translateX(-${i*100}%)`;
    testDots.forEach((d,di)=>d.classList.toggle('active', di===i));
  }
  testDots.forEach(d=>d.addEventListener('click', ()=>goTestSlide(parseInt(d.dataset.i))));
  setInterval(()=> goTestSlide((testIndex+1)%testDots.length), 6000);
}

/* ---------- FAQ ACCORDION ---------- */
$$('.faq-item').forEach(item=>{
  const q = $('.faq-q', item), a = $('.faq-a', item);
  if(item.classList.contains('open')) a.style.maxHeight = a.scrollHeight+'px';
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    const group = item.closest('.faq-wrap') || document;
    $$('.faq-item', group).forEach(i=>{ i.classList.remove('open'); $('.faq-a', i).style.maxHeight=''; });
    if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight+'px'; }
  });
});

/* ---------- MODALS ---------- */
const overlayBg = document.getElementById('overlayBg');
if(overlayBg){
  const modals = { qv: document.getElementById('qvModal'), quote: document.getElementById('quoteModal'), dealer: document.getElementById('dealerModal') };
  window.openModal = function(m){ overlayBg.classList.add('open'); m.classList.add('open'); document.body.style.overflow='hidden'; };
  function closeAllModals(){ overlayBg.classList.remove('open'); Object.values(modals).forEach(m=>{ if(m) m.classList.remove('open'); }); document.body.style.overflow=''; }
  window.closeAllModals = closeAllModals;
  overlayBg.addEventListener('click', closeAllModals);
  $$('[data-close]').forEach(b=>b.addEventListener('click', closeAllModals));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAllModals(); });

  const productData = {
    peeze:{cat:'Packout Mobility', title:'PAC-EEzE Dolly Conversion Kit', desc:'Converts your stacked PACKOUT system into a smooth-rolling 4-wheel dolly. Precision steel frame with polyurethane wheels rated for job-site terrain.', specs:[['Material','Steel + Polyurethane'],['Compatibility','Milwaukee PACKOUT™'],['Weight Capacity','250 lb'],['Warranty','2-Year Limited']], icon:`<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="65" r="18" stroke="#e4002b" stroke-width="3"/><circle cx="50" cy="65" r="5" fill="#e4002b"/><rect x="26" y="16" width="48" height="30" rx="2" stroke="#c9c9c7" stroke-width="2.5"/></svg>`},
    pneumatic:{cat:'Wheels & Casters', title:'Pneumatic Replacement Wheels', desc:'Air-filled replacement wheels engineered for rough terrain, gravel, and uneven job sites where standard casters fall short.', specs:[['Material','Rubber + Steel Hub'],['Set Size','2 Wheels'],['Diameter','6 inch'],['Warranty','1-Year Limited']], icon:`<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="32" stroke="#e4002b" stroke-width="4"/><circle cx="50" cy="50" r="10" fill="#e4002b"/></svg>`},
    caster:{cat:'Wheels & Casters', title:'Front Caster Wheel Kit', desc:'Bolt-on front caster replacements that restore smooth pivoting and directional control to your rolling PACKOUT stack.', specs:[['Material','Steel + PU'],['Set Size','2 Casters'],['Mount Type','Bolt-on'],['Warranty','1-Year Limited']], icon:`<svg viewBox="0 0 100 100" fill="none"><path d="M50 20v22" stroke="#c9c9c7" stroke-width="3"/><circle cx="50" cy="68" r="14" stroke="#e4002b" stroke-width="3"/></svg>`},
    organizer:{cat:'Tool Organization', title:'Modular Insert Tray System', desc:'Stackable foam and tray inserts that keep hand tools, fasteners, and accessories organized and secure in transit.', specs:[['Material','ABS + Foam'],['Compatibility','All PACKOUT Cases'],['Configuration','Stackable'],['Warranty','2-Year Limited']], icon:`<svg viewBox="0 0 100 100" fill="none"><rect x="18" y="24" width="64" height="48" rx="2" stroke="#e4002b" stroke-width="3"/><path d="M18 48h64M42 24v48M66 24v48" stroke="#c9c9c7" stroke-width="2"/></svg>`}
  };
  $$('.qv-trigger, [data-qv]').forEach(el=>{
    el.addEventListener('click', function(e){
      if(this.classList.contains('qv-trigger') || this.textContent.trim()==='Details'){
        e.preventDefault();
        const d = productData[this.dataset.qv];
        if(!d || !modals.qv) return;
        document.getElementById('qvCat').textContent = d.cat;
        document.getElementById('qvTitle').textContent = d.title;
        document.getElementById('qvDesc').textContent = d.desc;
        document.getElementById('qvMedia').innerHTML = d.icon;
        document.getElementById('qvSpecs').innerHTML = d.specs.map(s=>`<li><span>${s[0]}</span><span>${s[1]}</span></li>`).join('');
        openModal(modals.qv);
      }
    });
  });
  const openQuoteBtn = document.getElementById('openQuote');
  if(openQuoteBtn) openQuoteBtn.addEventListener('click', e=>{ e.preventDefault(); openModal(modals.quote); });
  $$('[data-open-quote]').forEach(el=> el.addEventListener('click', e=>{ e.preventDefault(); openModal(modals.quote); }));
  const qvQuoteBtn = document.getElementById('qvQuoteBtn');
  if(qvQuoteBtn) qvQuoteBtn.addEventListener('click', e=>{ e.preventDefault(); closeAllModals(); setTimeout(()=>openModal(modals.quote),380); });
  $$('.prod-foot [data-qv]').forEach(el=>{
    if(el.textContent.trim()==='Request Quote') el.addEventListener('click', e=>{ e.preventDefault(); openModal(modals.quote); });
  });
  const openDealerBtn = document.getElementById('openDealer');
  if(openDealerBtn) openDealerBtn.addEventListener('click', e=>{ e.preventDefault(); openModal(modals.dealer); });
  $$('[data-open-dealer]').forEach(el=> el.addEventListener('click', e=>{ e.preventDefault(); openModal(modals.dealer); }));

  const quoteForm = document.getElementById('quoteForm');
  if(quoteForm) quoteForm.addEventListener('submit', function(){ this.parentElement.style.display='none'; document.getElementById('quoteSuccess').classList.add('show'); });
  const dealerForm = document.getElementById('dealerForm');
  if(dealerForm) dealerForm.addEventListener('submit', function(){ this.parentElement.style.display='none'; document.getElementById('dealerSuccess').classList.add('show'); });
}

/* ---------- WISHLIST / COMPARE ---------- */
let compareCount = 0;
const compareBar = document.getElementById('compareBar'), compareCountEl = document.getElementById('compareCount');
$$('.wish-btn').forEach(b=>b.addEventListener('click', function(){ this.classList.toggle('active'); }));
$$('.compare-btn').forEach(b=>b.addEventListener('click', function(){
  const active = this.classList.toggle('active');
  compareCount += active ? 1 : -1;
  if(compareCountEl) compareCountEl.textContent = compareCount;
  if(compareBar) compareBar.classList.toggle('show', compareCount > 0);
}));
const clearCompareBtn = document.getElementById('clearCompare');
if(clearCompareBtn) clearCompareBtn.addEventListener('click', ()=>{
  $$('.compare-btn.active').forEach(b=>b.classList.remove('active'));
  compareCount = 0; if(compareCountEl) compareCountEl.textContent = 0; if(compareBar) compareBar.classList.remove('show');
});

/* ---------- CHAT WIDGET ---------- */
const chatFab = document.getElementById('chatFab'), chatPanel = document.getElementById('chatPanel');
if(chatFab && chatPanel){
  chatFab.addEventListener('click', ()=> chatPanel.classList.toggle('open'));
  const closeChat = document.getElementById('closeChat');
  if(closeChat) closeChat.addEventListener('click', ()=> chatPanel.classList.remove('open'));
}

/* ================= SHOP PAGE: FILTER / SORT / VIEW / SEARCH ================= */
(function shopPage(){
  const grid = document.getElementById('shopGrid');
  if(!grid) return;
  const cards = $$('.prod-card', grid);
  const noResults = document.getElementById('noResults');
  const shopSearch = document.getElementById('shopSearch');
  const sortSelect = document.getElementById('sortSelect');
  const resultCount = document.getElementById('resultCount');

  function currentFilters(){
    const cats = $$('.f-cat:checked').map(c=>c.value);
    const brands = $$('.f-brand:checked').map(c=>c.value);
    return { cats, brands, q: (shopSearch?shopSearch.value:'').toLowerCase() };
  }
  function applyFilters(){
    const {cats, brands, q} = currentFilters();
    let visible = 0;
    cards.forEach(card=>{
      const cat = card.dataset.cat, brand = card.dataset.brand, name = card.dataset.name.toLowerCase();
      const matchCat = cats.length===0 || cats.includes(cat);
      const matchBrand = brands.length===0 || brands.includes(brand);
      const matchQ = !q || name.includes(q);
      const show = matchCat && matchBrand && matchQ;
      card.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    if(resultCount) resultCount.textContent = visible;
    if(noResults) noResults.classList.toggle('show', visible===0);
  }
  $$('.f-cat, .f-brand').forEach(c=>c.addEventListener('change', applyFilters));
  if(shopSearch) shopSearch.addEventListener('input', applyFilters);
  if(sortSelect) sortSelect.addEventListener('change', ()=>{
    const val = sortSelect.value;
    const arr = cards.slice().sort((a,b)=>{
      if(val==='name-asc') return a.dataset.name.localeCompare(b.dataset.name);
      if(val==='name-desc') return b.dataset.name.localeCompare(a.dataset.name);
      if(val==='rating') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      return 0;
    });
    arr.forEach(c=>grid.appendChild(c));
  });

  const viewButtons = $$('.view-toggle button');
  viewButtons.forEach(btn=>btn.addEventListener('click', function(){
    viewButtons.forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    grid.classList.toggle('list-view', this.dataset.view==='list');
  }));

  const skeleton = document.getElementById('shopSkeleton');
  if(skeleton){
    grid.style.display='none';
    setTimeout(()=>{ skeleton.style.display='none'; grid.style.display=''; applyFilters(); }, 700);
  }
})();

/* ================= PRODUCT PAGE: GALLERY + TABS + ZOOM ================= */
(function productPage(){
  const mainImg = document.getElementById('pdMainMedia');
  if(!mainImg) return;
  $$('.pd-thumb').forEach(thumb=>{
    thumb.addEventListener('click', function(){
      $$('.pd-thumb').forEach(t=>t.classList.remove('active'));
      this.classList.add('active');
      mainImg.innerHTML = this.innerHTML;
    });
  });
  mainImg.addEventListener('click', ()=> mainImg.classList.toggle('zoomed'));

  const tabBtns = $$('.tab-btn');
  tabBtns.forEach(btn=>btn.addEventListener('click', function(){
    tabBtns.forEach(b=>b.classList.remove('active'));
    $$('.tab-panel').forEach(p=>p.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
  }));
})();

/* ================= DOWNLOADS PAGE: SEARCH + CATEGORY FILTER ================= */
(function downloadsPage(){
  const list = document.getElementById('dlList');
  if(!list) return;
  const rows = $$('.dl-row', list);
  const dlSearch = document.getElementById('dlSearch');
  const dlTabs = $$('.dl-tab');
  let activeCat = 'all';
  function apply(){
    const q = (dlSearch?dlSearch.value:'').toLowerCase();
    rows.forEach(r=>{
      const matchCat = activeCat==='all' || r.dataset.cat===activeCat;
      const matchQ = !q || r.dataset.name.toLowerCase().includes(q);
      r.style.display = (matchCat && matchQ) ? '' : 'none';
    });
  }
  if(dlSearch) dlSearch.addEventListener('input', apply);
  dlTabs.forEach(tab=>tab.addEventListener('click', function(){
    dlTabs.forEach(t=>t.classList.remove('active'));
    this.classList.add('active');
    activeCat = this.dataset.cat;
    apply();
  }));
})();

/* ================= CONTACT PAGE: FORM SUCCESS STUB ================= */
(function contactPage(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('contactFormWrap').style.display='none';
    document.getElementById('contactSuccess').classList.add('show');
  });
})();

/* ================= DEALERS PAGE: MAP PIN STUB ================= */
(function dealersPage(){
  $$('.map-pin').forEach(pin=>{
    pin.addEventListener('click', function(){
      alert('Dealer: '+this.dataset.name+'\n'+this.dataset.address);
    });
  });
  const pageForm = document.getElementById('dealerPageForm');
  if(pageForm) pageForm.addEventListener('submit', function(){
    document.getElementById('dealerPageFormWrap').style.display='none';
    document.getElementById('dealerPageSuccess').classList.add('show');
  });
})();
