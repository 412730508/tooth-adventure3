(function () {
  'use strict';
  const unit = Number(document.documentElement.dataset.qmUnit || 0);
  if (![1, 2, 3].includes(unit)) return;
  const doctor = unit === 3 ? '../unit1/images/dentist.png' : 'images/dentist.png';
  const hand = '<svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true" focusable="false"><path d="M16 44 10 31c-1-3 2-5 5-3l4 4V9c0-4 6-4 6 0v16c1-3 5-3 6 0 1-3 5-2 6 1 2-2 5 0 5 3v7c0 5-4 8-8 8Z" fill="#f2c9a4" stroke="#5d4a40" stroke-width="2.5" stroke-linejoin="round"/><path d="M25 25v6m6-6v6m6-5v6" fill="none" stroke="#5d4a40" stroke-width="2" stroke-linecap="round"/></svg>';
  const style = document.createElement('style');
  style.textContent = `
    .tg-dock{display:flex;align-items:center;gap:10px;margin:0 0 15px;padding:9px 12px;border:2px solid #b9cbd0;border-radius:16px;background:#eef3f1;color:#294a61;font:700 16px/1.4 "Noto Sans TC","Microsoft JhengHei",sans-serif}
    .tg-dock img{width:53px;height:53px;object-fit:contain;flex:none}.tg-dock strong{display:block;font-size:.82rem;color:#526b76}.tg-dock p{margin:0;flex:1}.tg-show{border:2px solid #9db9c2;border-radius:10px;background:#fffaf1;color:#294a61;min-height:42px;padding:5px 10px;font:800 14px/1.2 "Noto Sans TC","Microsoft JhengHei",sans-serif;cursor:pointer}
    .tg-target{position:relative!important;overflow:visible!important;outline:3px solid #426d88!important;outline-offset:3px!important;animation:tg-nudge 1.7s ease-in-out infinite!important}
    .tg-hand{display:inline-flex;vertical-align:middle;margin-left:5px;pointer-events:none;animation:tg-point 1.1s ease-in-out infinite}
    @keyframes tg-nudge{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}@keyframes tg-point{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @media(max-width:560px){.tg-dock{font-size:14px;padding:7px;gap:7px}.tg-dock img{width:43px;height:43px}.tg-show{font-size:12px;padding:4px 7px}}
    @media(prefers-reduced-motion:reduce){.tg-target,.tg-hand{animation:none!important}}
  `;
  document.head.appendChild(style);
  const dock = document.createElement('div');
  dock.className = 'tg-dock';
  dock.setAttribute('role', 'note');
  dock.innerHTML = '<img alt="" aria-hidden="true"><p><strong>韋登醫師提醒</strong><span class="tg-line"></span></p><button class="tg-show" type="button">帶我看</button>';
  dock.querySelector('img').src = doctor;
  const line = dock.querySelector('.tg-line');
  const seen = new Set();
  let target = null;
  let targetKey = '';
  let lastStage = '';
  let scheduled = false;
  function visible(el) {
    return !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden' && !el.disabled;
  }
  function first(root, selector) {
    return [...root.querySelectorAll(selector)].find(visible) || null;
  }
  const u1 = {
    1:[['[data-go="2"]','按這裡，陪牙寶出發。']],
    2:[['.intro-story-choice','先選一句話回答牙寶。'],['[data-go="3"]','按這裡，走進診所。']],
    3:[['.intro-tool','點一個器材看看。'],['[data-go="4"]','看過器材，就往下一站。']],
    4:[['.intro-case','點一張牙齒線索卡。'],['.intro-quiz-option','再選一個答案。'],['[data-go="5"]','完成了，按這裡繼續。']],
    5:[['[data-go="6"]','按這裡，開始第二段。']],
    6:[['.emotion-button','先點一個現在的心情。'],['[data-go="7"]','按這裡，陪牙寶進診所。']],
    7:[['.worry-card','點一張擔心卡，聽我說。'],['[data-go="8"]','接著去認識診間。']],
    8:[['.hotspot','點一個器材圖看看。'],['[data-go="9"]','看過器材，再看流程。']],
    9:[['.sort-list button','用上下鍵調整卡片。'],['#checkOrderButton','排好後，按這裡檢查。']],
    10:[['.shield.unlocked','依序點亮守護盾。'],['[data-go="11"]','守護盾完成，繼續探案。']],
    11:[['.option[data-case-answer]','看線索，選一個答案。'],['[data-next-case],#finishCases','答完後，按這裡繼續。']],
    12:[['[data-go="13"]','按這裡，回想今天學到的事。']],
    13:[['.emotion-button','再選一次現在的心情。'],['[data-go="14"]','按這裡，完成單元。']],
    14:[['.game-button','想複習，就按這裡。']]
  };
  const u2 = {
    1:[['#startButton','按這裡，進入牙齒王國。']],
    2:[['.choice','先選一個答案。'],['[data-go="3"]','接著看看換牙順序。']],
    3:[['.interaction-card','先點一張卡，再點位置。'],['.target','把卡放到這個位置。'],['#checkTimeline','排好四張，再檢查順序。'],['[data-go="4"]','完成後，探索牙冠與牙根。']],
    4:[['.choice','先回答牙寶的問題。'],['.explore-button','點牙冠或牙根看看。'],['.interaction-card','選一張卡，再點位置。'],['.target','把卡放到這個位置。'],['[data-go="5"]','接著打開牙齒內部。']],
    5:[['#openCrossSection','按這裡，打開剖面圖。'],['.explore-button','點一層，看看它的用途。'],['[data-go="6"]','看完後，開始組裝。']],
    6:[['.interaction-card','選一張構造卡。'],['.target','再點它對應的位置。'],['[data-go="7"]','完成後，開始六題挑戰。']],
    7:[['.quiz-option','先選一個答案。'],['#quizNextButton','看完回饋，再按下一題。'],['[data-go="8"]','六題完成，進入整理。']],
    8:[['.review-card','點一張卡，回想重點。'],['[data-go="9"]','按這裡，完成單元。']],
    9:[['.game-button','想複習，就按這裡。']]
  };
  function staticRule(stage, root) {
    const step = Number(stage);
    const go = first(root, '[data-go="'+(step+1)+'"]');
    if (unit === 1) {
      const repeat = {
        3: ['.intro-tool:not(.visited)', '再點一個器材，四個都看完。'],
        4: ['.intro-case:not(.viewed)', '再點一張線索卡，三張都看完。'],
        7: ['.worry-card:not(.viewed)', '再點一張擔心卡，三張都看完。'],
        8: ['.hotspot:not(.visited)', '再點一個診間物件。'],
        10: ['.shield.unlocked:not(.opened)', '再點一面守護盾。']
      }[step];
      if (repeat) {
        const el = first(root, repeat[0]);
        if (el) return {el, text:repeat[1], key:stage+':repeat'};
      }
      if (step === 4 && !go) {
        const answer = first(root, '.intro-quiz-option:not(.wrong)');
        if (answer) return {el:answer, text:'想一想，再選一個答案。', key:stage+':answer'};
      }
      if (step === 11) {
        const next = first(root, '[data-next-case],#finishCases');
        if (next) return {el:next, text:'答對了，接著看下一案。', key:stage+':case-next'};
        const answer = first(root, '.case-stage.active .options');
        if (answer) return {el:answer, text:'看線索，選一個答案。', key:stage+':case-answer'};
      }
    }
    if (unit === 2) {
      if (step === 2 && !go) {
        const answer = first(root, '.choice:not(.wrong)');
        if (answer) return {el:answer, text:'再想一想，選一個答案。', key:stage+':answer'};
      }
      if (step === 3) {
        const selected = first(root, '[data-timeline-card].selected');
        const empty = first(root, '[data-timeline-slot]:not(.filled)');
        const card = first(root, '[data-timeline-card]:not(.placed)');
        if (selected && empty) return {el:empty, text:'把選好的卡放到空格。', key:stage+':slot'};
        if (card && empty) return {el:card, text:'再選一張時間卡。', key:stage+':card'};
        if (!go && !empty) {
          const check = first(root, '#checkTimeline');
          if (check) return {el:check, text:'四張排好了，按這裡檢查。', key:stage+':check'};
        }
      }
      if (step === 7) {
        const next = first(root, '#quizNextButton');
        if (next) return {el:next, text:'看完回饋，按下一題。', key:stage+':quiz-next'};
        const answer = first(root, '#quizOptions .choice:not([disabled])');
        if (answer) return {el:answer, text:'讀題後，選一個答案。', key:stage+':quiz-answer'};
      }
      if (step === 8) {
        const card = first(root, '.review-card:not(.open)');
        if (card) return {el:card, text:'再點一張整理卡，三張都看完。', key:stage+':review'};
      }
    }
    const rules = (unit === 1 ? u1 : u2)[Number(stage)] || [];
    for (let i=0; i<rules.length; i++) {
      const key = stage + ':' + i;
      const el = first(root, rules[i][0]);
      if (el && (!seen.has(key) || i===rules.length-1)) return {el,text:rules[i][1],key};
    }
    const el = first(root,'button.primary,[data-go],.game-button,button:not([disabled])');
    return {el,text:'找到有提示的按鈕，繼續探索。',key:stage+':end'};
  }
  function thirdRule() {
    const stage = String(Number(document.getElementById('step-number')?.textContent || 1));
    const app = document.querySelector('.app');
    if (app?.classList.contains('dialogue-gate')) return {stage,el:document.getElementById('next-dialogue'),text:'先按這裡，聽完對話。'};
    const panel = document.getElementById('lesson-panel');
    const next = document.getElementById('next-step');
    if (stage === '1') return {stage,el:next,text:'指出三樣食物，再按下一站。'};
    if (stage === '2') {
      const count = [...panel.querySelectorAll('.compare-option[aria-pressed="true"]')].length;
      const key = '3-2';
      if (!seen.has(key)) return {stage,el:first(panel,'.compare-option:not([data-tg-seen="yes"])') || first(panel,'.compare-option'),text:'把兩張飲料卡都點開。'};
      return {stage,el:next,text:'比較完了，按下一站。'};
    }
    if (stage === '3') {
      if (!seen.has('3-3-food')) return {stage,el:first(panel,'.food'),text:'先點幾樣食物和白開水。'};
      if (!seen.has('3-3-check')) return {stage,el:document.getElementById('check-food'),text:'選好了，按這裡檢查。'};
      if (!document.getElementById('food-feedback')?.textContent.includes('搭配得很有變化')) return {stage,el:first(panel,'.food'),text:'再加上不同食物和白開水。'};
      return {stage,el:next,text:'說出理由，再按下一站。'};
    }
    if (stage === '4') return {stage,el:first(panel,'.snack-choice.correct') ? next : first(panel,'.snack-choice:not(.try-again)'),text:first(panel,'.snack-choice.correct') ? '選好了，按下一站。' : '點一個你做得到的安排。'};
    if (stage === '5') return {stage,el:first(panel,'.clean-choice.correct') ? next : first(panel,'.clean-choice:not(.try-again)'),text:first(panel,'.clean-choice.correct') ? '說出理由，再按下一站。' : '點一個給小安的提醒。'};
    if (stage === '6') return {stage,el:first(panel,'.habit-option[aria-pressed="true"]') ? next : first(panel,'.habit-option'),text:first(panel,'.habit-option[aria-pressed="true"]') ? '選好小事，就完成單元。' : '選一件想試的護牙小事。'};
    return {stage,el:next,text:'按這裡繼續。'};
  }
  function clearTarget() {
    if (target) {
      target.classList.remove('tg-target');
      target.querySelector('.tg-hand')?.remove();
    }
    target = null;
  }
  function refresh() {
    scheduled = false;
    let rule,stage,host;
    if (unit === 3) {
      rule = thirdRule();
      const gated = document.querySelector('.app')?.classList.contains('dialogue-gate');
      stage = '3-' + rule.stage + '-' + (gated?'dialogue':'activity');
      host = document.querySelector(gated ? '.story' : '.lesson');
    } else {
      const screen = document.querySelector('.screen.active');
      if (!screen) return;
      stage = screen.dataset.screen || screen.id.replace('screen','');
      host = screen.querySelector('.panel') || screen;
      if (stage !== lastStage) seen.clear();
      const overlay = unit === 2 ? document.getElementById('storyDialogueOverlay') : null;
      if (visible(overlay)) {
        const choice = first(overlay, '#storyDialogueChoices button');
        rule = {el:choice || first(overlay, '#storyDialogueClose'),text:choice?.textContent.includes('繼續') ? '聽完對話，按這裡開始。' : '先選一句話，聽韋登醫師說。',key:stage+':dialogue'};
        host = overlay.querySelector('.story-dialogue-card') || overlay;
      } else rule = staticRule(stage,screen);
    }
    lastStage = stage;
    if (dock.parentNode !== host) {
      if (unit === 3 && stage.endsWith('dialogue')) host.insertBefore(dock,host.querySelector('.dialogue-actions'));
      else if (unit === 3) host.insertBefore(dock,host.firstElementChild);
      else host.insertBefore(dock,host.firstElementChild);
    }
    if (line.textContent !== rule.text) line.textContent = rule.text;
    if (target !== rule.el) {
      clearTarget();
      target = rule.el;
      targetKey = rule.key || '';
      if (visible(target)) {
        target.classList.add('tg-target');
        const pointer = document.createElement('span');
        pointer.className = 'tg-hand';
        pointer.setAttribute('aria-hidden','true');
        pointer.innerHTML = hand;
        target.appendChild(pointer);
      }
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(refresh);
    }
  }
  dock.querySelector('.tg-show').addEventListener('click', () => {
    if (!visible(target)) return;
    target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    target.focus({preventScroll:true});
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (unit === 3) {
      if (button.matches('.compare-option')) {
        const panel = document.getElementById('lesson-panel');
        const modes = [...panel.querySelectorAll('.compare-option')].filter(el => el === button || el.dataset.tgSeen === 'yes');
        button.dataset.tgSeen='yes';
        if (modes.length >= 2) seen.add('3-2');
      }
      if (button.matches('.food')) seen.add('3-3-food');
      if (button.id === 'check-food') seen.add('3-3-check');
    } else if (target && (button === target || target.contains(button))) {
      if (targetKey) seen.add(targetKey);
      if (unit===1 && lastStage==='11' && button.matches('[data-next-case]')) seen.delete('11:0');
    }
    setTimeout(schedule,30);
  });
  const watched = unit===3 ? document.querySelector('.app') : document.body;
  if (watched) new MutationObserver(schedule).observe(watched,{attributes:true,attributeFilter:['class','hidden'],subtree:true,childList:unit!==1});
  schedule();
})();

