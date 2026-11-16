(function(){
  'use strict';
  const unit=Number(document.documentElement.dataset.qmUnit||0);
  const chapters=[
    {title:'安心看牙',time:'約 25–35 分鐘',goals:['我能指出至少三種牙醫診間器材，說出它們的用途。','我能把看牙檢查的主要步驟排出順序。','遇到牙齒不舒服或害怕時，我能選出一種向大人或牙醫表達的方法。'],task:'看故事 → 點選器材 → 排序與情境練習 → 說出一件學到的事。',evidence:'器材探索、流程排序、牙齒案例、情境選擇。',terms:[['診療椅','看牙時坐或躺的椅子，方便牙醫檢查。'],['牙科燈','照亮嘴巴，讓牙醫看得清楚。'],['口腔鏡','幫助牙醫看見牙齒背面等不容易看到的位置。'],['牙菌斑','附著在牙齒上的薄薄一層，其中有細菌，需要每天清潔。']]},
    {title:'牙齒王國',time:'約 25–35 分鐘',goals:['我能分辨乳齒與恆齒，說出換牙的大致順序。','我能在圖上指出牙冠、牙根、琺瑯質與象牙質。','我能用一個例子說明牙齒表層與內層的保護關係。'],task:'先聽對話 → 探索圖片 → 排序、配對 → 完成六題挑戰。',evidence:'成長時間線、構造探索、配對與六題理解測驗。',terms:[['乳齒','小朋友先長出來的牙齒，也需要每天清潔。'],['恆齒','換牙後逐漸長出的牙齒。'],['牙冠','平常張口能看見的牙齒部分。'],['琺瑯質','牙冠最外面的堅硬保護層。'],['象牙質','在琺瑯質下方的牙齒構造。'],['牙髓','牙齒中央有神經與血管的部分。']]},
    {title:'午餐線索',time:'約 20–25 分鐘',goals:['我能比較兩種喝甜飲的方式，說明哪一種讓牙齒較常接觸糖。','我能選出多樣的午餐搭配，並說出白開水的用途。','我能為吃完點心後與早晚清潔選出可行做法，訂下一件自己的護牙小事。'],task:'每一站先聽三句對話 → 完成一個觀察或互動 → 才到下一站。',evidence:'甜飲時間比較、餐點選擇、點心與清潔情境、個人習慣選擇。',terms:[['牙菌斑','附著在牙齒上的薄薄一層，其中有細菌。'],['游離糖','飲料、甜點與果汁等食物中的一類糖；果汁不能當水一直喝。'],['含氟牙膏','含有氟化物、能幫助預防蛀牙的牙膏。'],['牙線','清潔牙刷不容易碰到的牙縫的工具。']]}
  ];
  const active=unit?chapters[unit-1]:null;
  const storeKey='tooth-adventure-teacher-v1';
  let teacher={notes:{},resources:[],minutes:{}};
  try{teacher={...teacher,...JSON.parse(localStorage.getItem(storeKey)||'{}')}}catch(_){}
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const style=document.createElement('style');style.textContent=`
    .qm-help{position:fixed;left:18px;bottom:18px;z-index:1000;min-height:52px;padding:10px 15px;border:2px solid #665247;border-radius:99px;background:#fff9eb;color:#294a61;box-shadow:0 5px 0 #ceb79c;font:800 16px/1.2 "Noto Sans TC","Microsoft JhengHei",sans-serif;cursor:pointer}
    .qm-help:focus-visible,.qm-close:focus-visible,.qm-tab:focus-visible{outline:3px solid #426d88;outline-offset:3px}
    .qm-overlay[hidden]{display:none!important}.qm-overlay{position:fixed;inset:0;z-index:2100;background:#26343ab8;display:grid;place-items:center;padding:12px}
    .qm-panel{width:min(810px,100%);max-height:92dvh;overflow:auto;border:3px solid #665247;border-radius:22px;background:#fffaf1;padding:clamp(17px,3vw,30px);color:#35454b;box-shadow:0 12px 0 #c8b59b;font:16px/1.6 "Noto Sans TC","Microsoft JhengHei",sans-serif}
    .qm-head{display:flex;justify-content:space-between;align-items:start;gap:12px}.qm-head h2{margin:0;color:#294a61;font-size:clamp(1.5rem,3vw,2rem)}.qm-close{background:#fffaf1;color:#35454b;border:2px solid #665247;border-radius:12px;min-width:48px;min-height:48px;font:800 24px/1 sans-serif;cursor:pointer}
    .qm-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:15px 0}.qm-tab{min-height:44px;background:#e7eeee;color:#294a61;border:2px solid #b8c9c7;border-radius:12px;padding:6px 12px;font:700 15px/1.3 inherit;cursor:pointer}.qm-tab[aria-selected=true]{background:#294a61;color:#fffaf1;border-color:#294a61}
    .qm-content[hidden]{display:none}.qm-content h3{color:#294a61;font-size:1.16rem;margin:19px 0 5px}.qm-content p{margin:5px 0 12px}.qm-content li{margin:5px 0}.qm-content a{color:#245b76;text-decoration:underline}.qm-content details{border:1px solid #c8d3d0;border-radius:12px;padding:9px 12px;margin:7px 0;background:#fffef9}.qm-content summary{cursor:pointer;font-weight:750}.qm-content small{color:#53676e}.qm-content label{display:block;font-weight:750;margin-top:12px}.qm-content input,.qm-content textarea{width:100%;font:inherit;border:2px solid #9eadae;border-radius:9px;padding:8px;background:white;color:#35454b}.qm-content textarea{min-height:95px}.qm-action{min-height:44px;border:2px solid #a96443;border-radius:10px;background:#c9875d;color:#fffaf1;padding:6px 12px;font:800 15px/1.3 inherit;cursor:pointer;margin:7px 7px 7px 0}.qm-note{border-left:4px solid #8eaa91;padding:9px 14px;background:#f0f5ed}.qm-source{word-break:break-word}
    @media(max-width:500px){.qm-help{left:10px;bottom:10px;font-size:14px;padding:10px 12px}.qm-tabs{display:grid;grid-template-columns:repeat(2,1fr)}}
  `;document.head.appendChild(style);
  const open=document.createElement('button');open.type='button';open.className='qm-help';open.textContent='學習／教師指南';open.setAttribute('aria-haspopup','dialog');document.body.appendChild(open);
  const overlay=document.createElement('div');overlay.className='qm-overlay';overlay.hidden=true;
  overlay.innerHTML='<div class="qm-panel" role="dialog" aria-modal="true" aria-labelledby="qm-heading"><div class="qm-head"><div><h2 id="qm-heading">學習與教師指南</h2><small>牙寶歷險記・適合 10～12 歲</small></div><button class="qm-close" type="button" aria-label="關閉指南">×</button></div><div class="qm-tabs" role="tablist" aria-label="指南分類"></div><div class="qm-content" id="qm-content"></div></div>';
  document.body.appendChild(overlay);
  const sourceLinks=`<ul class="qm-source"><li><a href="https://www.cdc.gov/oral-health/prevention/oral-health-tips-for-children.html" target="_blank" rel="noopener">CDC：兒童口腔保健</a></li><li><a href="https://www.mouthhealthy.org/all-topics-a-z/tooth/" target="_blank" rel="noopener">美國牙醫學會：牙齒構造</a></li><li><a href="https://www.who.int/news-room/fact-sheets/detail/sugars-and-dental-caries" target="_blank" rel="noopener">WHO：糖與蛀牙</a></li><li><a href="https://www.ada.org/resources/ada-library/oral-health-topics/dental-erosion" target="_blank" rel="noopener">美國牙醫學會：酸與牙齒</a></li></ul><small>資料檢查：2026 年 11 月。插圖為本專案自製示意圖；健康疑問請詢問牙醫師。</small>`;
  const checks=[
    ['探索至少三種診間器材並說出用途。','完成看牙流程排序。','情境題選出向大人或牙醫說明的做法。'],
    ['比較乳齒和恆齒出場順序。','在牙齒剖面探索並配對四個部位。','完成構造題並用一個例子解釋。'],
    ['比較兩張甜飲時間卡，說出接觸次數。','檢查午餐搭配並說出兩樣食物的角色。','完成點心與清潔情境，再選一件護牙習慣。']
  ];
  const goalList=chapters.map((ch,i)=>`<details ${unit===i+1?'open':''}><summary>第 ${i+1} 單元｜${ch.title}</summary><p>建議時間：${ch.time}</p><ol>${ch.goals.map(x=>`<li>${esc(x)}<br><small>練習與證據：${esc(checks[i][ch.goals.indexOf(x)])}</small></li>`).join('')}</ol><p><b>學習順序：</b>${esc(ch.task)}</p><p><b>我怎麼知道自己學會：</b>${esc(ch.evidence)}</p></details>`).join('');
  const vocab=chapters.map((ch,i)=>`<details ${unit===i+1?'open':''}><summary>第 ${i+1} 單元詞語卡</summary><dl>${ch.terms.map(([a,b])=>`<dt><b>${esc(a)}</b></dt><dd>${esc(b)}</dd>`).join('')}</dl></details>`).join('');
  const tabs=[['start','怎麼開始'],['goals','學習目標'],['help','詞語與協助'],['peer','雙人討論'],['teacher','教師資源'],['access','設備與隱私']];
  function progress(){let keys=[],review=null;try{keys=JSON.parse(localStorage.getItem('tooth-adventure-collection-v1')||'[]');review=JSON.parse(localStorage.getItem('tooth-adventure-last-review-v1')||'null')}catch(_){}const counts=[14,9,6].map((total,i)=>`${i+1} 單元：${keys.filter(k=>String(k).startsWith(`${i+1}-`)).length}／${total} 件`).join('；');return counts+(review?`；站內六題已完成，${review.revisit.length} 題曾需要提示。`:'；站內六題尚未完成。')}
  function teacherResources(){return (teacher.resources||[]).filter(x=>!unit||x.unit===unit).map((r,i)=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a>（第 ${r.unit} 單元）</li>`).join('')||'<li>目前沒有教師新增的連結。</li>'}
  function contentFor(tab){
    if(tab==='start')return `<h3>給學習者</h3><p>不需要先備知識；想起自己看牙或刷牙的經驗即可。依序體驗三個單元。每頁先讀故事，再點選或回答；答錯可以看提示、再試一次。完成一關可領一件護牙收藏品，按「收藏冊」查看進度。</p><p class="qm-note">${active?`現在是第 ${unit} 單元：${active.title}。${active.task}`:'三個單元是主要課程；角色故事與外部遊戲是選做延伸。'}</p><h3>教師補充材料</h3><p class="qm-note">${esc((teacher.notes||{})[unit||1]||'老師目前沒有補充說明。')}</p><ul>${teacherResources()}</ul><h3>我的進度</h3><p>${progress()}</p><p>收藏進度只記在目前瀏覽器。可停下來，下次在同一瀏覽器繼續收集；課程頁面會從開頭顯示，可以重新閱讀。</p><h3>操作方法</h3><ul><li>平板：用手指點選卡片和按鈕。電腦：用滑鼠，或按 Tab 移動焦點、Enter／空白鍵選取。</li><li>有排序或配對題時，先點選項目，再依畫面提示選位置或答案。</li><li>看不懂詞語，開「詞語與協助」；需要協助時可請老師或家人一起讀。</li></ul>`;
    if(tab==='goals')return `<h3>完成後，我可以……</h3>${goalList}<p class="qm-note">每個目標都對應一個故事解說與至少一種練習。感受題幫助表達心情，不當作知識分數。</p>`;
    if(tab==='help')return `<h3>詞語卡</h3>${vocab}<h3>多知道一點（選讀）</h3><details><summary>為什麼牙醫會照亮牙齒？</summary><p>牙科燈幫助牙醫看清楚口腔；口腔鏡可幫忙觀察不容易直接看到的位置。看牙時可以告訴醫師自己不舒服或擔心的事。</p></details><details><summary>一顆牙齒裡有什麼？</summary><p>牙冠外層是琺瑯質，下方有象牙質；中央的牙髓有神經與血管。牙刷清潔牙齒表面，牙縫還需要合適的清潔工具。</p></details><details><summary>為什麼喝甜飲的時間也重要？</summary><p>牙菌斑中的細菌會利用糖產生酸。把同一杯甜飲分很多次喝，牙齒就更常接觸糖；日常口渴可先喝白開水。</p></details><h3>答錯怎麼辦？</h3><ol><li>先讀畫面上的提示和原因。</li><li>回到同一頁的圖片或說明，找一條線索。</li><li>再選一次，並用自己的話說出理由。</li><li>還不懂就問老師、家人或牙醫師。</li></ol><p>你也可以和同伴輪流說：「我選這個，因為＿＿＿。」另一人說一條支持或不同的線索。</p>`;
    if(tab==='peer')return `<h3>和同伴一起找線索</h3><p>兩人輪流操作，一人說選擇和理由，另一人從畫面找一條支持或不同的線索，再交換角色。不記錄姓名。</p><ol><li>我選了哪一個做法？</li><li>畫面哪一張圖或哪一句話支持我的想法？</li><li>同伴給了什麼不同的線索？我會怎麼修正？</li></ol><label>我的理由<textarea id="qm-peer-reason" maxlength="500" placeholder="我選……，因為畫面提到……"></textarea></label><label>同伴找到的線索<textarea id="qm-peer-clue" maxlength="500" placeholder="同伴發現……"></textarea></label><button class="qm-action" id="qm-peer-save" type="button">儲存討論摘要</button><p id="qm-peer-status" role="status"></p><p>教師可請兩人各說一句，再用本單元學習目標核對；理由和線索比答題速度更重要。不要輸入姓名或個人健康資料。</p>`;
    if(tab==='teacher')return `<h3>教師一頁式教學指引</h3>${goalList}<p><b>建議課堂節奏：</b>故事導入 3 分鐘 → 個人操作 15–25 分鐘 → 雙人分享 5 分鐘 → 出口提問 3 分鐘。可按學生閱讀速度調整。</p><p><b>形成性觀察：</b>請學生指出一個圖像、說出用途／理由，再給一個生活例子。回答錯時先請他找圖或短文線索，不直接公布答案。</p><p><b>差異化：</b>需要協助的學生可兩人共用平板、輪流朗讀；熟悉內容的學生可比較兩種做法並說原因。不要把速度當成成績。</p><p><b>同儕互動：</b>一人先說選擇，另一人用「我看到的線索是……」回應；兩人交換角色。教師可觀察是否能用自己的話解釋。</p><h3>教師補充教材（本機）</h3><p>可新增校內核准資源或補充說明，保存在這台裝置的瀏覽器。班級共用時，請先在教室平板設定好。</p><label>第幾單元<select id="qm-unit"><option value="1">第一單元</option><option value="2">第二單元</option><option value="3">第三單元</option></select></label><label>教材名稱<input id="qm-resource-title" maxlength="80" placeholder="例如：學校的護牙學習單"></label><label>網址（https）<input id="qm-resource-url" type="url" placeholder="https://..."></label><button class="qm-action" id="qm-add" type="button">加入教材連結</button><label>教師補充說明<textarea id="qm-note" maxlength="2000" placeholder="可寫本班討論題或提醒"></textarea></label><button class="qm-action" id="qm-save" type="button">儲存補充說明</button><p id="qm-teacher-status" role="status"></p><h3>已加入的教材</h3><ul>${teacherResources()}</ul><p><b>本機教學備註：</b>${esc((teacher.notes||{})[unit||1]||'尚未填寫')}</p><p>資源及備註只存在目前瀏覽器，不會送到網站伺服器；不要輸入學生姓名、成績或其他個資。</p>`;
    return `<h3>設備與操作</h3><ul><li>建議使用近期版本的 Chrome、Edge、Safari 或 Firefox；平板、電腦及手機都可開啟。需要網路載入網頁和插圖。</li><li>沒有必需的音訊、影片、帳號或外掛。可用瀏覽器放大文字；主要按鈕可用 Tab 和 Enter 操作。</li><li>若圖片不顯示：檢查網路、重新整理；若外部挑戰空白，先回課程首頁，使用站內課程與複習，不影響三單元完成。</li></ul><h3>隱私與支援</h3><p>網站不要求學生姓名、登入、鏡頭或麥克風。收藏進度與教師補充內容存於本機瀏覽器，清除網站資料會移除；不同裝置不會自動同步。遇到技術問題，先告訴授課教師並描述頁面與問題，勿傳送兒童個資。教師可在 <a href="https://github.com/412730508/tooth-adventure3/issues" target="_blank" rel="noopener">GitHub Issues 回報專案問題</a>（需 GitHub 帳號，請勿填學生個資）。</p><p>外部參考連結會開新分頁，可能受對方網站的隱私政策約束；衛教閱讀是選做，完成課程不需使用外站。</p><h3>無障礙與資料來源</h3><p>可用鍵盤操作主要課程；插圖有文字說明，重要內容也以文字呈現。若閱讀或操作有困難，可請教師提供紙本、放大畫面或共讀。沒有必看的影片，因此沒有字幕需求。</p><p><b>內容來源對應：</b>兒童早晚刷牙與含氟牙膏參考 CDC；琺瑯質、象牙質與牙髓參考美國牙醫學會的牙齒構造資料；糖與蛀牙參考 WHO；酸性飲料後的清潔參考美國牙醫學會。網站圖片是本專案自製示意圖。</p>${sourceLinks}`;
  }
  function persist(){try{localStorage.setItem(storeKey,JSON.stringify(teacher))}catch(_){}}
  function select(tab){
    overlay.querySelector('.qm-tabs').innerHTML=tabs.map(([id,label])=>`<button type="button" class="qm-tab" data-tab="${id}" role="tab" aria-selected="${id===tab}">${label}</button>`).join('');
    overlay.querySelector('#qm-content').innerHTML=contentFor(tab);
    if(tab==='peer'){
      let record={};try{record=JSON.parse(localStorage.getItem('tooth-adventure-peer-v1')||'{}')}catch(_){}
      overlay.querySelector('#qm-peer-reason').value=record.reason||'';
      overlay.querySelector('#qm-peer-clue').value=record.clue||'';
      overlay.querySelector('#qm-peer-save').addEventListener('click',()=>{const reason=overlay.querySelector('#qm-peer-reason').value.trim(),clue=overlay.querySelector('#qm-peer-clue').value.trim();if(!reason||!clue){overlay.querySelector('#qm-peer-status').textContent='先各寫一句理由與線索。';return}try{localStorage.setItem('tooth-adventure-peer-v1',JSON.stringify({reason,clue}))}catch(_){}overlay.querySelector('#qm-peer-status').textContent='討論摘要已存於這台裝置。'});
    }
    if(tab==='teacher'){
      const sel=overlay.querySelector('#qm-unit');sel.value=String(unit||1);
      const note=overlay.querySelector('#qm-note');note.value=(teacher.notes||{})[Number(sel.value)]||'';
      sel.addEventListener('change',()=>{note.value=(teacher.notes||{})[Number(sel.value)]||''});
      overlay.querySelector('#qm-save').addEventListener('click',()=>{teacher.notes=teacher.notes||{};teacher.notes[Number(sel.value)]=note.value.trim();persist();overlay.querySelector('#qm-teacher-status').textContent='已儲存在這台裝置。'});
      overlay.querySelector('#qm-add').addEventListener('click',()=>{const title=overlay.querySelector('#qm-resource-title').value.trim(),url=overlay.querySelector('#qm-resource-url').value.trim();if(!title||!/^https:\/\//i.test(url)){overlay.querySelector('#qm-teacher-status').textContent='請填教材名稱與 https 網址。';return}teacher.resources=teacher.resources||[];teacher.resources.push({unit:Number(sel.value),title,url});persist();select('teacher');overlay.querySelector('#qm-teacher-status').textContent='教材連結已加入。'});
    }
  }
  overlay.querySelector('.qm-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)select(b.dataset.tab)});
  const close=()=>{overlay.hidden=true;document.body.style.removeProperty('overflow');open.focus()};
  open.addEventListener('click',()=>{select('start');overlay.hidden=false;document.body.style.overflow='hidden';overlay.querySelector('.qm-close').focus()});
  overlay.querySelector('.qm-close').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)close()});
})();

