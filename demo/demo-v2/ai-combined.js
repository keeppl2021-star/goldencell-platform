(()=>{
  const aiStart=document.querySelector('[data-screen="ai-start"]');
  const aiBody=document.querySelector('[data-screen="ai-body"]');
  const aiDetail=document.querySelector('[data-screen="ai-detail"]');
  if(!aiStart||!aiBody||!aiDetail)return;

  const bodyOptions=document.querySelector('#bodyOptions');
  const selectedBodyLabel=document.querySelector('#selectedBodyLabel');
  const bodyNext=document.querySelector('#bodyNext');
  const detailBodyLabel=document.querySelector('#detailBodyLabel');
  const symptomOptions=document.querySelector('#symptomOptions');
  const detailText=document.querySelector('#detailText');
  const detailSummary=document.querySelector('#detailSummary');
  const detailComplete=document.querySelector('#detailComplete');
  if(!bodyOptions||!selectedBodyLabel||!bodyNext||!detailBodyLabel||!symptomOptions||!detailText||!detailSummary||!detailComplete)return;

  // AI intro: 3-step input flow -> 1 input screen + result.
  const intro=aiStart.querySelector('.intro-panel');
  if(intro){
    intro.innerHTML='<div><span>1</span><strong>부위·증상·상세 설명 한번에 입력</strong></div><div><span>2</span><strong>AI 분석 결과 확인</strong></div>';
  }
  const startButton=aiStart.querySelector('[data-go="ai-body"]');
  if(startButton)startButton.textContent='AI 추천 정보 입력하기 →';

  // Keep nodes that already have app.js listeners and move them into one unified screen.
  bodyNext.hidden=true;
  bodyNext.style.display='none';
  aiBody.innerHTML='';
  aiBody.insertAdjacentHTML('beforeend',`
    <button type="button" class="back-link" data-go="ai-start">← AI 추천 안내</button>
    <div class="spec-screen-label"><b>AI-01</b><span>AI Recommendation Input</span></div>
    <h1>현재 불편한 상태를<br>한 번에 알려주세요.</h1>
    <p class="lead">부위, 증상, 상세 설명을 한 화면에서 입력합니다. 부위를 선택하면 해당 부위의 주요 증상 항목이 바로 표시됩니다.</p>
    <section class="form-panel ai-combined-section" data-ai-field="bodyCategory">
      <div class="ai-combined-head"><div><small>01 · REQUIRED</small><h2>불편한 부위</h2></div><code>bodyCategory</code></div>
      <p class="field-help">가장 불편한 부위를 하나 선택합니다.</p>
    </section>
    <section class="form-panel ai-combined-section" data-ai-field="symptomCodes">
      <div class="ai-combined-head"><div><small>02 · MULTI SELECT</small><h2>불편 증상</h2></div><code>symptomCodes[]</code></div>
      <p class="field-help">부위를 선택하면 관련 증상 항목이 표시됩니다. 여러 개 선택할 수 있습니다.</p>
      <div class="ai-empty" id="aiSymptomEmpty">먼저 불편한 부위를 선택해주세요.</div>
    </section>
    <section class="form-panel ai-combined-section" data-ai-field="detailText">
      <div class="ai-combined-head"><div><small>03 · FREE TEXT</small><h2>상세 설명</h2></div><code>detailText</code></div>
      <p class="field-help">언제부터 불편했는지, 어떤 상황에서 심해지는지, 기존 치료 경험 등을 자유롭게 작성합니다.</p>
    </section>
    <div class="ai-combined-submit">
      <div><small>입력 요약</small><strong class="ai-combined-summary">부위를 선택해주세요.</strong></div>
    </div>
  `);

  const bodySection=aiBody.querySelector('[data-ai-field="bodyCategory"]');
  const symptomSection=aiBody.querySelector('[data-ai-field="symptomCodes"]');
  const detailSection=aiBody.querySelector('[data-ai-field="detailText"]');
  const submit=aiBody.querySelector('.ai-combined-submit');
  bodySection.appendChild(bodyOptions);
  const selectedLine=document.createElement('div');
  selectedLine.className='ai-selected-line';
  selectedLine.innerHTML='선택 부위 <strong></strong>';
  selectedLine.querySelector('strong').appendChild(selectedBodyLabel);
  bodySection.appendChild(selectedLine);
  symptomSection.appendChild(detailBodyLabel);
  symptomSection.appendChild(symptomOptions);
  detailSection.appendChild(detailText);
  submit.querySelector('.ai-combined-summary').appendChild(detailSummary);
  submit.appendChild(detailComplete);
  aiBody.appendChild(bodyNext);

  aiDetail.classList.remove('is-active');
  aiDetail.hidden=true;
  aiDetail.setAttribute('aria-hidden','true');

  const resultBack=document.querySelector('[data-screen="ai-result"] .back-link');
  if(resultBack){
    resultBack.dataset.go='ai-body';
    resultBack.textContent='← 입력 내용 수정';
  }

  const style=document.createElement('style');
  style.textContent=`
    .intro-panel{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ai-combined-section{margin-top:18px}
    .ai-combined-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}
    .ai-combined-head small{font-size:11px;font-weight:800;color:#8c84a2;letter-spacing:.08em}
    .ai-combined-head h2{margin:5px 0 0}
    .ai-combined-head code{font-size:12px;background:#f6f3ff;color:#6847f5;border:1px solid #e6dfff;border-radius:8px;padding:6px 9px;white-space:nowrap}
    .field-help{margin:8px 0 18px;color:#777180;line-height:1.6}
    .ai-selected-line{margin-top:14px;padding-top:14px;border-top:1px solid #eeeaf4;color:#777180;font-size:14px}
    .ai-selected-line strong{color:#17132c;margin-left:8px}
    #detailBodyLabel{display:none}
    #symptomOptions:empty{display:none}
    .ai-empty{padding:18px;border:1px dashed #ddd6ec;border-radius:12px;background:#fbfafc;color:#8a8491}
    .ai-combined-submit{margin-top:24px;padding-top:22px;border-top:1px solid #e9e5f1;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .ai-combined-submit small{display:block;color:#9993a2;margin-bottom:5px}
    .ai-combined-submit strong{font-size:15px}
    .ai-combined-submit #detailSummary{margin-left:6px}
    @media(max-width:850px){.intro-panel{grid-template-columns:1fr}.ai-combined-head,.ai-combined-submit{flex-direction:column;align-items:flex-start}}
  `;
  document.head.appendChild(style);

  function activateBody(){
    document.querySelectorAll('[data-screen]').forEach(el=>el.classList.toggle('is-active',el===aiBody));
    aiBody.hidden=false;
    aiBody.removeAttribute('aria-hidden');
    window.scrollTo(0,0);
  }

  function syncEmpty(){
    const empty=document.querySelector('#aiSymptomEmpty');
    if(!empty)return;
    const hasBody=selectedBodyLabel.textContent&&selectedBodyLabel.textContent!=='없음';
    empty.style.display=hasBody?'none':'block';
  }

  // app.js already owns state. Trigger its existing renderDetail() through bodyNext,
  // then immediately remain on the unified AI input screen.
  document.addEventListener('click',e=>{
    const bodyButton=e.target.closest('[data-body]');
    if(bodyButton){
      setTimeout(()=>{
        if(!bodyNext.disabled){
          bodyNext.click();
          activateBody();
          syncEmpty();
        }
      },0);
    }
  });

  // Functional flow navigator: remove old second AI input step.
  setTimeout(()=>{
    const ai1=document.querySelector('.flow-nav [data-spec-go="ai-body"]');
    const ai2=document.querySelector('.flow-nav [data-spec-go="ai-detail"]');
    if(ai1)ai1.textContent='AI INPUT';
    if(ai2)ai2.remove();
  },0);

  function applySpec(){
    const name=document.querySelector('[data-screen].is-active')?.dataset.screen;
    const set=(id,value)=>{const el=document.querySelector(id);if(el)el.textContent=value};
    if(name==='ai-body'){
      set('#specId','AI-01');
      set('#specTitle','AI Recommendation Input');
      set('#specPurpose','부위·증상·상세 설명을 한 화면에서 입력하여 AI 추천 요청 데이터를 구성');
      set('#specInputs','bodyCategory(required, single), symptomCodes[](multi), detailText(free text)');
      set('#specOutputs','AI input payload → AI-02 ai-result / BID-01 handoff');
      set('#specNote','단계 분리 없음. 부위 선택 시 symptomCodes 후보를 동적으로 변경. 최소 필수값은 bodyCategory이며 증상/상세 설명 필수 여부는 정책 확정 필요.');
    }else if(name==='ai-result'){
      const label=document.querySelector('[data-screen="ai-result"] .eyebrow');if(label)label.textContent='AI-02 · AI ANALYSIS RESULT';
      set('#specId','AI-02');set('#specTitle','AI Analysis Result');
    }else if(name==='matched'){
      const label=document.querySelector('[data-screen="matched"] .eyebrow');if(label)label.textContent='AI-03 · MATCHED PROGRAMS & HOSPITALS';
      set('#specId','AI-03');set('#specTitle','Matched Programs & Hospitals');
    }
  }

  document.addEventListener('click',()=>setTimeout(applySpec,1));
  const observer=new MutationObserver(()=>setTimeout(applySpec,1));
  document.querySelectorAll('[data-screen]').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
  syncEmpty();
  applySpec();
})();