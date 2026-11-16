(function () {
  'use strict';
  const KEY = 'tooth-adventure-collection-v1';
  const groups = [
    { id: 1, label: '第一單元・安心看牙', items: [
      ['勇氣貝殼','shell'],['安心徽章','tooth'],['牙醫名片','card'],['檢查手電筒','lamp'],
      ['診間地圖','map'],['牙科燈','lamp'],['口腔鏡','mirror'],['小小牙線盒','floss'],
      ['看牙流程卡','card'],['護牙盾牌','shield'],['牙齒觀察鏡','mirror'],['牙醫小筆記','book'],
      ['勇敢表達卡','card'],['第一單元獎章','medal']
    ]},
    { id: 2, label: '第二單元・牙齒王國', items: [
      ['王國入場券','card'],['乳齒星星','tooth'],['恆齒種子','seed'],['換牙日曆','book'],
      ['牙冠寶石','tooth'],['琺瑯質盾牌','shield'],['牙根地圖','map'],['構造拼圖','puzzle'],['第二單元獎章','medal']
    ]},
    { id: 3, label: '第三單元・午餐線索', items: [
      ['均衡餐盤','plate'],['白開水壺','water'],['午餐搭配卡','plate'],
      ['點心時鐘','clock'],['清潔牙刷','brush'],['護牙習慣獎章','medal']
    ]}
  ];
  const palette = { ink:'#493d35', blue:'#79a6bd', pale:'#dcecf1', sand:'#f6e8cf', orange:'#d58e60', green:'#8eaa91', white:'#fffaf0' };
  function art(type) {
    const p = palette;
    const common = `stroke="${p.ink}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"`;
    const shapes = {
      shell:`<path d="M14 43 Q7 23 32 17 Q57 23 50 43 Q39 50 32 46 Q24 50 14 43Z" fill="${p.orange}"/><path d="M32 20V45M19 28L27 44M45 28L37 44" fill="none"/>`,
      tooth:`<path d="M19 14 Q12 14 12 25 Q12 36 19 48 Q23 53 27 45 L31 39 Q32 37 33 39 L38 46 Q43 53 47 43 Q54 28 50 19 Q46 11 37 14 Q32 17 28 15 Q23 13 19 14Z" fill="${p.white}"/><path d="M21 26l2 2m18-6 2 2"/>`,
      card:`<rect x="10" y="17" width="44" height="31" rx="5" fill="${p.sand}"/><path d="M17 26h19M17 33h30M17 40h20" fill="none"/>`,
      lamp:`<path d="M16 49h32M32 49V37L45 23M44 18l7 6-8 9-8-7z" fill="${p.blue}"/><path d="M27 19l-2-5m-8 13-5-2" fill="none"/>`,
      map:`<path d="M12 16l13-4 13 4 14-4v35l-14 4-13-4-13 4z" fill="${p.sand}"/><path d="M25 12v35m13-31v35" fill="none"/><circle cx="33" cy="30" r="5" fill="${p.orange}"/>`,
      mirror:`<circle cx="36" cy="26" r="15" fill="${p.pale}"/><path d="M25 38L14 51M20 44l6 6" fill="none"/>`,
      floss:`<rect x="13" y="24" width="38" height="28" rx="7" fill="${p.blue}"/><path d="M22 24V14h19v10M26 34h12M26 40h9" fill="none"/>`,
      shield:`<path d="M32 10L50 16v16Q50 45 32 54Q14 45 14 32V16Z" fill="${p.green}"/><path d="M24 32l6 6 12-14" fill="none"/>`,
      book:`<path d="M10 16q11-4 22 1 11-5 22-1v34q-11-5-22 1-11-6-22-1z" fill="${p.sand}"/><path d="M32 17v34M16 26h10m-10 7h10m12-7h10m-10 7h10" fill="none"/>`,
      medal:`<path d="M20 10l7 18h10l7-18M22 10h8m4 0h8" fill="${p.blue}"/><circle cx="32" cy="39" r="15" fill="${p.orange}"/><path d="M32 29l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="${p.sand}"/>`,
      seed:`<path d="M31 51Q15 42 24 29Q37 22 41 37Q43 44 31 51Z" fill="${p.green}"/><path d="M32 44V22q0-8 7-11M32 26q-12 0-14-10 10-4 14 10M36 20q3-10 13-9 0 9-13 9" fill="${p.green}"/>`,
      puzzle:`<path d="M14 16h14q-2 7 4 7t4-7h14v14q-7-2-7 4t7 4v12H36q2-7-4-7t-4 7H14V38q7 2 7-4t-7-4Z" fill="${p.blue}"/>`,
      plate:`<circle cx="32" cy="32" r="22" fill="${p.white}"/><circle cx="32" cy="32" r="15" fill="${p.sand}"/><path d="M32 17v30M17 32h30" fill="none"/><circle cx="25" cy="24" r="4" fill="${p.green}"/><circle cx="39" cy="24" r="4" fill="${p.orange}"/>`,
      water:`<path d="M23 13h18l-2 7 4 32H21l4-32z" fill="${p.pale}"/><path d="M22 34q9 4 20 0M26 20h12" fill="none"/>`,
      clock:`<circle cx="32" cy="32" r="21" fill="${p.sand}"/><path d="M32 18v15l9 5M32 12v4m0 32v4m20-20h-4m-32 0h-4" fill="none"/>`,
      brush:`<path d="M11 45l29-16 4 7-29 16q-5 2-7-2t3-5Z" fill="${p.blue}"/><path d="M39 28l10-5 5 10-10 5z" fill="${p.white}"/><path d="M45 22l-3-7m7 5-1-7m5 8 1-7" fill="none"/>`
    };
    return `<svg viewBox="0 0 64 64" role="img" aria-label="${type}" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="29" fill="${p.sand}" opacity=".52"/><g ${common}>${shapes[type] || shapes.tooth}</g></svg>`;
  }
  let acquired = new Set();
  try { acquired = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (_) {}
  const all = groups.flatMap(g => g.items.map((entry,index)=>({key:`${g.id}-${index+1}`,name:entry[0],type:entry[1],unit:g.id})));
  const css = `<style>
    .tc-toggle{position:fixed;right:18px;bottom:18px;z-index:1000;border:2px solid #665247;border-radius:999px;background:#fff9eb;color:#26445a;padding:11px 17px;min-height:52px;font:800 16px/1.2 "Noto Sans TC","Microsoft JhengHei",sans-serif;box-shadow:0 5px 0 #ceb79c;cursor:pointer}
    .tc-toggle:hover,.tc-toggle:focus-visible{background:#f6e8cf;outline:3px solid #457394;outline-offset:2px}
    .tc-backdrop[hidden],.tc-toast[hidden]{display:none!important}.tc-backdrop{position:fixed;inset:0;z-index:2000;background:#26343ab8;display:grid;place-items:center;padding:14px}
    .tc-book{width:min(780px,100%);max-height:min(90dvh,860px);overflow:auto;background:#fffaf0;color:#35454b;border:3px solid #69574c;border-radius:22px;padding:clamp(18px,3vw,30px);box-shadow:0 14px 0 #c8b59b;font:16px/1.5 "Noto Sans TC","Microsoft JhengHei",sans-serif}
    .tc-head{display:flex;align-items:start;justify-content:space-between;gap:15px}.tc-book h2{font-size:clamp(1.5rem,3vw,2rem);margin:0;color:#26445a}.tc-book p{margin:6px 0 12px}.tc-close{border:2px solid #69574c;background:#fffaf0;color:#35454b;border-radius:12px;min-width:48px;min-height:48px;font:800 24px/1 sans-serif;cursor:pointer}
    .tc-meter{height:14px;border:2px solid #69574c;border-radius:99px;background:#eee5d5;overflow:hidden}.tc-meter span{display:block;height:100%;background:#8eaa91;transition:width .3s}
    .tc-section{margin-top:18px}.tc-section h3{margin:0 0 8px;color:#26445a;font-size:1.13rem}.tc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(116px,1fr));gap:10px}
    .tc-item{min-height:132px;border:2px solid #c9bba7;border-radius:15px;background:#fffef9;padding:9px;text-align:center}.tc-item svg{display:block;width:70px;height:70px;margin:auto}.tc-item strong{display:block;font-size:.9rem;line-height:1.3}.tc-item small{display:block;color:#5c6c70;margin-top:2px}.tc-item.locked{background:#f2eee6;color:#6c6a67}.tc-item.locked svg{filter:grayscale(1);opacity:.38}
    .tc-toast{position:fixed;right:18px;bottom:83px;z-index:1500;max-width:min(335px,calc(100vw - 36px));border:2px solid #69574c;border-radius:15px;background:#fffaf0;padding:12px 16px;color:#26445a;font:800 16px/1.45 "Noto Sans TC","Microsoft JhengHei",sans-serif;box-shadow:0 6px 0 #c8b59b}
    @media(max-width:500px){.tc-toggle{right:10px;bottom:10px;font-size:14px;padding:10px 12px}.tc-toast{right:10px;bottom:76px}.tc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(prefers-reduced-motion:reduce){.tc-meter span{transition:none}}
  </style>`;
  document.head.insertAdjacentHTML('beforeend',css);
  const toggle = document.createElement('button');
  toggle.type='button';toggle.className='tc-toggle';toggle.textContent='收藏冊 0 / '+all.length;
  toggle.setAttribute('aria-haspopup','dialog');document.body.appendChild(toggle);
  const backdrop=document.createElement('div');backdrop.className='tc-backdrop';backdrop.hidden=true;
  backdrop.innerHTML='<div class="tc-book" role="dialog" aria-modal="true" aria-labelledby="tc-title"><div class="tc-head"><div><h2 id="tc-title">我的護牙收藏冊</h2><p id="tc-summary"></p></div><button class="tc-close" type="button" aria-label="關閉收藏冊">×</button></div><div class="tc-meter"><span id="tc-meter-fill"></span></div><div id="tc-groups"></div></div>';
  document.body.appendChild(backdrop);
  const toast=document.createElement('div');toast.className='tc-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.hidden=true;document.body.appendChild(toast);
  let lastFocus=null,timer=0;
  function render(){
    const count=all.filter(x=>acquired.has(x.key)).length;
    toggle.textContent=`收藏冊 ${count} / ${all.length}`;
    backdrop.querySelector('#tc-summary').textContent=`已收集 ${count} 件，共 ${all.length} 件。完成關卡，就能為牙寶添一件護牙裝備。`;
    backdrop.querySelector('#tc-meter-fill').style.width=(100*count/all.length)+'%';
    backdrop.querySelector('#tc-groups').innerHTML=groups.map(g=>`<section class="tc-section"><h3>${g.label}</h3><div class="tc-grid">${g.items.map((e,i)=>{const found=acquired.has(`${g.id}-${i+1}`);return `<div class="tc-item ${found?'':'locked'}" aria-label="${found?e[0]:'尚未解鎖的收藏品'}">${art(e[1])}<strong>${found?e[0]:'未解鎖'}</strong><small>${found?'已獲得':`第 ${i+1} 關`}</small></div>`}).join('')}</div></section>`).join('');
  }
  function close(){backdrop.hidden=true;document.body.style.removeProperty('overflow');(lastFocus||toggle).focus()}
  toggle.addEventListener('click',()=>{lastFocus=document.activeElement;render();backdrop.hidden=false;document.body.style.overflow='hidden';backdrop.querySelector('.tc-close').focus()});
  backdrop.querySelector('.tc-close').addEventListener('click',close);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!backdrop.hidden)close()});
  function award(unit,level){const item=all.find(x=>x.key===`${unit}-${level}`);if(!item||acquired.has(item.key))return false;acquired.add(item.key);try{localStorage.setItem(KEY,JSON.stringify([...acquired]))}catch(_){}render();toast.textContent=`新收藏：${item.name}！打開收藏冊看看。`;toast.hidden=false;clearTimeout(timer);timer=setTimeout(()=>{toast.hidden=true},4000);return true}
  window.ToothCollection={award,open:()=>toggle.click(),count:()=>acquired.size};
  render();
})();

