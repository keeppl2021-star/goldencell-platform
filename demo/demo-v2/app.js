(()=>{
  const state={body:'',symptoms:[],detail:'',selectedProgram:null,selectedHospital:null,region:'강남·서초',budget:'500~800만원',consultHospital:'라이프스템셀병원'};
  const symptoms={
    '무릎·관절':['통증','계단 이용 시 불편','붓기','보행 시 불편','운동 시 통증','관절 움직임 제한'],
    '허리·척추':['허리 통증','다리 저림','오래 앉기 불편','보행 시 불편'],
    '어깨':['어깨 통증','팔을 들기 어려움','야간 통증','움직임 제한'],
    '피부·미용':['탄력 저하','흉터','색소 고민','피부 재생'],
    '두피·탈모':['탈모 진행','모발 가늘어짐','두피 고민','모발 밀도 저하'],
    '면역·항노화':['피로','회복 저하','컨디션 저하','항노화 상담'],
    '기타':['기타 불편 증상']
  };
  const programs=[
    {name:'무릎 관절 재생 집중 프로그램',hospital:'뉴호라이즌클리닉',area:'서울 서초구',price:'590만원',match:'94%',category:'관절·척추'},
    {name:'자가 골수 유래 무릎 줄기세포 치료',hospital:'라이프스템셀병원',area:'서울 서초구',price:'680만원',match:'92%',category:'관절·척추'},
    {name:'관절 통증 회복 통합 케어',hospital:'강남리젠의원',area:'서울 강남구',price:'330만원',match:'86%',category:'관절·척추'},
    {name:'피부 재생 프리미엄 프로그램',hospital:'힐링바이오의원',area:'서울 강남구',price:'390만원',match:'-',category:'피부·미용'},
    {name:'두피·모발 재생 케어',hospital:'라이프스템셀병원',area:'서울 서초구',price:'350만원',match:'-',category:'두피·탈모'},
    {name:'면역·항노화 세포 케어',hospital:'힐링바이오의원',area:'서울 강남구',price:'470만원',match:'-',category:'면역·항노화'}
  ];
  const hospitals=[
    {name:'라이프스템셀병원',area:'서울 서초구',rating:'4.8',specialty:'관절·척추 · 줄기세포'},
    {name:'뉴호라이즌클리닉',area:'서울 서초구',rating:'4.6',specialty:'관절·척추 · 재생치료'},
    {name:'강남리젠의원',area:'서울 강남구',rating:'4.5',specialty:'무릎·관절 · 회복관리'},
    {name:'힐링바이오의원',area:'서울 강남구',rating:'4.7',specialty:'피부·미용 · 면역·항노화'}
  ];

  const main=document.querySelector('.app-shell');
  main.insertAdjacentHTML('beforeend',`
    <section class="screen" data-screen="hospital-list"><button class="back-link" data-go="home">← HOME</button><div class="eyebrow">DIRECT DISCOVERY</div><h1>줄기세포 치료 병원 찾아보기</h1><p class="lead">치료 분야와 지역을 기준으로 병원을 직접 비교해보세요.</p><div class="result-grid" id="directHospitalCards"></div></section>
    <section class="screen" data-screen="treatment-list"><button class="back-link" data-go="home">← HOME</button><div class="eyebrow">TREATMENT DISCOVERY</div><h1>치료 프로그램 찾아보기</h1><p class="lead">등록된 이벤트·치료 프로그램을 직접 살펴보고 제공 병원을 확인하세요.</p><div class="result-grid" id="directProgramCards"></div></section>
    <section class="screen" data-screen="consult"><button class="back-link" data-go="home">← HOME</button><div class="eyebrow">상담 신청</div><h1>병원 상담을 신청합니다.</h1><div class="form-panel"><h2 id="consultHospital"></h2><p>희망 상담 방식</p><div class="symptom-grid"><button type="button" class="is-selected">전화 상담</button><button type="button">방문 상담</button></div><h2 class="subhead">희망 상담일</h2><div class="analysis-detail"><p>2026.08.28 오후 2:00</p></div><h2 class="subhead">문의 내용</h2><textarea>치료 가능 여부와 예상 회복 기간이 궁금합니다.</textarea></div><button type="button" class="button primary large" data-go="consult-complete">상담 신청하기</button></section>
    <section class="screen" data-screen="consult-complete"><div class="eyebrow">상담 신청 완료</div><h1>상담 요청이 접수되었습니다.</h1><div class="analysis-panel"><h2 id="completeHospital"></h2><p>병원에서 상담 가능 시간을 확인한 뒤 안내합니다.</p><div class="analysis-grid"><div><small>희망 상담일</small><strong>2026.08.28 14:00</strong></div><div><small>상담 방식</small><strong>전화 상담</strong></div></div></div><div class="bottom-bar"><button class="button secondary" data-go="home">HOME</button><button class="button primary" data-go="my">My GoldenCell 보기 →</button></div></section>
    <section class="screen" data-screen="my"><button class="back-link" data-go="home">← HOME</button><div class="eyebrow">MY GOLDENCELL</div><h1>나의 치료 Journey</h1><div class="result-grid"><article class="result-card"><small>AI 맞춤분석</small><h3>1건</h3><p>무릎·관절 맞춤 분석 완료</p></article><article class="result-card"><small>받은 치료제안</small><h3>3건</h3><p>병원 제안 비교 가능</p></article><article class="result-card"><small>상담/예약</small><h3>1건</h3><p>상담 요청 접수 완료</p></article></div><div class="analysis-panel"><h2>치료 이후에도 Recovery가 이어집니다.</h2><p>통증, 붓기, 활동성 등 회복 기록을 남기고 변화 추이를 확인합니다.</p><button class="button primary" data-go="recovery">Recovery Demo 보기 →</button></div></section>
    <section class="screen" data-screen="recovery"><button class="back-link" data-go="my">← My GoldenCell</button><div class="eyebrow">MY RECOVERY · DAY 14</div><h1>회복 상태를 기록하고 비교합니다.</h1><div class="result-grid"><article class="result-card"><small>통증</small><h3>3 / 10</h3><p>Day 1 · 7 / 10</p></article><article class="result-card"><small>붓기</small><h3>2 / 10</h3><p>감소 추세</p></article><article class="result-card"><small>활동성</small><h3>양호</h3><p>일상 보행 가능</p></article></div><div class="analysis-panel"><div class="eyebrow">AI RECOVERY SUMMARY</div><h2>최근 회복 기록 요약</h2><p>Day 1 대비 통증과 붓기 기록이 감소했고 활동 상태가 개선되었습니다. 다음 진료 시 최근 변화를 의료진과 함께 확인하세요.</p></div></section>
    <section class="screen" data-screen="hospital-dashboard"><button class="back-link" data-go="home">← 환자 Demo</button><div class="eyebrow">GOLDENCELL HOSPITAL</div><h1>라이프스템셀병원 Dashboard</h1><div class="result-grid"><article class="result-card"><small>프로그램 조회</small><h3>3,820</h3></article><article class="result-card"><small>신규 상담</small><h3>128</h3></article><article class="result-card"><small>치료제안 요청</small><h3>42</h3></article></div><div class="bid-handoff"><div><div class="eyebrow orange-text">NEW REQUEST</div><h2>새로운 치료제안 요청 4건</h2><p>환자의 치료 Needs를 확인하고 상담 가능한 프로그램을 제안하세요.</p></div><button class="button orange" data-go="hospital-requests">요청 확인 →</button></div></section>
    <section class="screen" data-screen="hospital-requests"><button class="back-link" data-go="hospital-dashboard">← Dashboard</button><div class="eyebrow">치료제안 요청</div><h1>Patient Needs Inbox</h1><div class="result-grid"><article class="result-card"><span class="verify-badge">새 요청</span><h3>GC-260825-0028</h3><p>무릎·관절 · 50대<br>강남·서초 · 500~800만원</p><button class="button secondary" data-go="hospital-request-detail">상세보기</button></article><article class="result-card"><span class="verify-badge">검토중</span><h3>GC-260825-0027</h3><p>피부·미용 · 30대<br>서울 전체 · 300~500만원</p></article><article class="result-card"><span class="verify-badge">검토중</span><h3>GC-260825-0026</h3><p>두피·탈모 · 40대<br>강남·서초 · 300~500만원</p></article></div></section>
    <section class="screen" data-screen="hospital-request-detail"><button class="back-link" data-go="hospital-requests">← 요청 목록</button><div class="eyebrow">GC-260825-0028</div><h1>Patient Treatment Needs</h1><div class="analysis-grid"><div class="form-panel"><h2>현재 상태</h2><p>50대 · 무릎 통증 1년 이상<br>계단 이용 시 불편<br>기존 주사치료 경험</p></div><div class="form-panel"><h2>희망 조건</h2><p>강남·서초<br>예산 500~800만원<br>2주 이내 상담 희망</p></div></div><div class="form-panel"><h2>중요 기준</h2><p>의료진 경험 ★★★★★　치료방법 ★★★★★　후기 ★★★★　비용 ★★★</p></div><button class="button orange large" data-go="hospital-proposal">등록 프로그램으로 제안하기 →</button></section>
    <section class="screen" data-screen="hospital-proposal"><button class="back-link" data-go="hospital-request-detail">← Patient Needs</button><div class="eyebrow orange-text">치료 제안 보내기</div><h1>병원 프로그램으로 상담을 제안합니다.</h1><div class="analysis-panel"><span class="verify-badge">선택 프로그램</span><h2>자가 골수 유래 무릎 줄기세포 치료</h2><p>담당 의료진 · 박민석 원장 / 관련 진료 18년</p><div class="analysis-grid"><div><small>예상 비용</small><strong>680만원~</strong></div><div><small>상담 가능일</small><strong>2026.08.28부터</strong></div></div><div class="analysis-detail"><p>등록해주신 증상과 기존 치료 경험을 참고하여 본 프로그램의 상담을 제안드립니다.</p></div></div><button class="button orange large" data-go="hospital-proposal-complete">치료 제안 보내기</button></section>
    <section class="screen" data-screen="hospital-proposal-complete"><div class="eyebrow">제안 전송 완료</div><h1>환자에게 치료 제안을 보냈습니다.</h1><div class="analysis-panel"><h2>GC-260825-0028</h2><p>환자는 제안 내용을 다른 병원의 제안과 함께 비교한 뒤 상담 여부를 선택할 수 있습니다.</p></div><button class="button primary" data-go="hospital-dashboard">Dashboard로 돌아가기</button></section>
  `);

  const homeDirect=document.querySelector('[data-screen="home"] .choice-card:first-child');
  homeDirect.querySelector('.button').outerHTML='<div class="direct-actions"><button type="button" class="button primary" data-go="hospital-list">병원 찾아보기</button><button type="button" class="button secondary" data-go="treatment-list">치료 찾아보기</button></div>';
  const header=document.querySelector('.topbar');
  header.insertAdjacentHTML('beforeend','<button type="button" class="button secondary hospital-demo-nav" data-go="hospital-dashboard">병원 Demo</button>');

  function showScreen(name){
    document.querySelectorAll('[data-screen]').forEach(el=>el.classList.toggle('is-active',el.dataset.screen===name));
    window.scrollTo({top:0,behavior:'instant'});
    if(name==='ai-detail')renderDetail();
    if(name==='ai-result')renderResult();
    if(name==='matched')renderMatched();
    if(name==='program-detail')renderProgramDetail();
    if(name==='hospital-detail')renderHospitalDetail();
    if(name==='bid-form')renderBidForm();
    if(name==='bid-results')renderBidResults();
    if(name==='hospital-list')renderDirectHospitals();
    if(name==='treatment-list')renderDirectPrograms();
    if(name==='consult'||name==='consult-complete')renderConsult();
  }

  function renderDetail(){
    document.querySelector('#detailBodyLabel').textContent=state.body||'-';
    const options=document.querySelector('#symptomOptions');options.innerHTML='';
    (symptoms[state.body]||[]).forEach(item=>{const button=document.createElement('button');button.type='button';button.textContent=item;button.classList.toggle('is-selected',state.symptoms.includes(item));button.addEventListener('click',()=>{state.symptoms=state.symptoms.includes(item)?state.symptoms.filter(x=>x!==item):[...state.symptoms,item];renderDetail();});options.appendChild(button);});
    document.querySelector('#detailSummary').textContent=`${state.body} · 증상 ${state.symptoms.length}개 선택`;
    document.querySelector('#detailText').value=state.detail;
  }
  function renderResult(){const selected=state.symptoms.length?state.symptoms.join(', '):'구체적인 증상 미선택';const detail=state.detail||'추가 상세 내용은 입력하지 않았습니다.';document.querySelector('#resultBody').textContent=state.body;document.querySelector('#resultSymptoms').textContent=selected;document.querySelector('#resultDetail').textContent=`“${detail}”`;document.querySelector('#analysisText').innerHTML=`<strong>${state.body}</strong> 부위의 <strong>${selected}</strong> 정보를 기준으로 통증 양상과 기능 제한을 우선 확인할 필요가 있습니다. 입력하신 상세 내용을 함께 고려해 관련성이 높은 치료 방향을 정리했습니다.`;}
  function renderMatched(){document.querySelector('#programCards').innerHTML=programs.slice(0,3).map((x,i)=>`<article class="result-card"><span class="match-badge">AI ${x.match}</span><h3>${x.name}</h3><p><strong>${x.hospital}</strong><br>${x.area}</p><div class="card-bottom"><b>${x.price}</b><button type="button" class="button secondary" data-program-index="${i}">이벤트 상세보기</button></div></article>`).join('');document.querySelector('#hospitalCards').innerHTML=hospitals.slice(0,3).map((x,i)=>hospitalCard(x,i)).join('');}
  function hospitalCard(x,i){return `<article class="result-card compact"><span class="verify-badge">GOLDENCELL 인증</span><h3>${x.name}</h3><p>${x.area}<br>★ ${x.rating} · ${x.specialty}</p><button type="button" class="button secondary" data-hospital-index="${i}">병원 상세보기</button></article>`}
  function renderDirectHospitals(){document.querySelector('#directHospitalCards').innerHTML=hospitals.map((x,i)=>hospitalCard(x,i)).join('');}
  function renderDirectPrograms(){document.querySelector('#directProgramCards').innerHTML=programs.map((x,i)=>`<article class="result-card"><span class="verify-badge">${x.category}</span><h3>${x.name}</h3><p><strong>${x.hospital}</strong><br>${x.area}</p><div class="card-bottom"><b>${x.price}</b><button class="button secondary" data-program-index="${i}">상세보기</button></div></article>`).join('');}
  function renderProgramDetail(){const x=state.selectedProgram||programs[0];document.querySelector('#programTitle').textContent=x.name;document.querySelector('#programHospital').textContent=x.hospital;document.querySelector('#programArea').textContent=x.area;document.querySelector('#programPrice').textContent=x.price;state.consultHospital=x.hospital;}
  function renderHospitalDetail(){const x=state.selectedHospital||hospitals[0];document.querySelector('#hospitalTitle').textContent=x.name;document.querySelector('#hospitalArea').textContent=x.area;document.querySelector('#hospitalRating').textContent=`★ ${x.rating}`;document.querySelector('#hospitalSpecialty').textContent=x.specialty;state.consultHospital=x.name;}
  function renderBidForm(){document.querySelector('#bidBody').textContent=state.body||'무릎·관절';document.querySelector('#bidSymptoms').textContent=state.symptoms.join(', ')||'통증, 계단 이용 시 불편';document.querySelector('#bidDetail').textContent=state.detail||'일상생활에서 반복되는 통증으로 상담을 희망합니다.';document.querySelectorAll('[data-region]').forEach(b=>b.classList.toggle('is-selected',b.dataset.region===state.region));document.querySelectorAll('[data-budget]').forEach(b=>b.classList.toggle('is-selected',b.dataset.budget===state.budget));}
  function renderBidResults(){document.querySelector('#bidCondition').textContent=`${state.region} · ${state.budget}`;document.querySelectorAll('[data-screen="bid-results"] .result-card').forEach((card,i)=>{if(!card.querySelector('[data-bid-hospital]'))card.insertAdjacentHTML('beforeend',`<div class="direct-actions"><button class="button secondary" data-bid-hospital="${i}">병원 상세</button><button class="button primary" data-bid-consult="${i}">상담 신청</button></div>`);});}
  function renderConsult(){document.querySelector('#consultHospital').textContent=state.consultHospital;document.querySelector('#completeHospital').textContent=state.consultHospital;}

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-go]');if(nav&&!nav.disabled)showScreen(nav.dataset.go);
    const bodyButton=event.target.closest('[data-body]');if(bodyButton){state.body=bodyButton.dataset.body;state.symptoms=[];document.querySelectorAll('[data-body]').forEach(button=>button.classList.toggle('is-selected',button===bodyButton));document.querySelector('#selectedBodyLabel').textContent=state.body;document.querySelector('#bodyNext').disabled=false;}
    const programButton=event.target.closest('[data-program-index]');if(programButton){state.selectedProgram=programs[Number(programButton.dataset.programIndex)];showScreen('program-detail');}
    const hospitalButton=event.target.closest('[data-hospital-index]');if(hospitalButton){state.selectedHospital=hospitals[Number(hospitalButton.dataset.hospitalIndex)];showScreen('hospital-detail');}
    const regionButton=event.target.closest('[data-region]');if(regionButton){state.region=regionButton.dataset.region;renderBidForm();}
    const budgetButton=event.target.closest('[data-budget]');if(budgetButton){state.budget=budgetButton.dataset.budget;renderBidForm();}
    const bidHospital=event.target.closest('[data-bid-hospital]');if(bidHospital){state.selectedHospital=hospitals[Number(bidHospital.dataset.bidHospital)]||hospitals[0];showScreen('hospital-detail');}
    const bidConsult=event.target.closest('[data-bid-consult]');if(bidConsult){state.consultHospital=hospitals[Number(bidConsult.dataset.bidConsult)]?.name||'라이프스템셀병원';showScreen('consult');}
    if(event.target.closest('[data-screen="program-detail"] .button.primary'))showScreen('consult');
    if(event.target.closest('[data-screen="hospital-detail"] .button.primary'))showScreen('consult');
  });

  document.querySelector('#bodyNext').addEventListener('click',()=>showScreen('ai-detail'));
  document.querySelector('#detailText').addEventListener('input',event=>{state.detail=event.target.value});
  document.querySelector('#detailComplete').addEventListener('click',()=>{state.detail=document.querySelector('#detailText').value;showScreen('ai-result');});
})();