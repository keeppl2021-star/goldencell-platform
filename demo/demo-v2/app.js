(()=>{
  const state={body:'',symptoms:[],detail:'',selectedProgram:null,selectedHospital:null,region:'강남·서초',budget:'500~800만원'};
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
    {name:'무릎 관절 재생 집중 프로그램',hospital:'뉴호라이즌클리닉',area:'서울 서초구',price:'590만원',match:'94%'},
    {name:'자가 골수 유래 무릎 줄기세포 치료',hospital:'라이프스템셀병원',area:'서울 서초구',price:'680만원',match:'92%'},
    {name:'관절 통증 회복 통합 케어',hospital:'강남리젠의원',area:'서울 강남구',price:'330만원',match:'86%'}
  ];
  const hospitals=[
    {name:'라이프스템셀병원',area:'서울 서초구',rating:'4.8',specialty:'관절·척추 · 줄기세포'},
    {name:'뉴호라이즌클리닉',area:'서울 서초구',rating:'4.6',specialty:'관절·척추 · 재생치료'},
    {name:'강남리젠의원',area:'서울 강남구',rating:'4.5',specialty:'무릎·관절 · 회복관리'}
  ];

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
  }

  function renderDetail(){
    document.querySelector('#detailBodyLabel').textContent=state.body||'-';
    const options=document.querySelector('#symptomOptions');
    options.innerHTML='';
    (symptoms[state.body]||[]).forEach(item=>{
      const button=document.createElement('button');
      button.type='button';button.textContent=item;
      button.classList.toggle('is-selected',state.symptoms.includes(item));
      button.addEventListener('click',()=>{
        state.symptoms=state.symptoms.includes(item)?state.symptoms.filter(x=>x!==item):[...state.symptoms,item];
        renderDetail();
      });
      options.appendChild(button);
    });
    document.querySelector('#detailSummary').textContent=`${state.body} · 증상 ${state.symptoms.length}개 선택`;
    document.querySelector('#detailText').value=state.detail;
  }

  function renderResult(){
    const selected=state.symptoms.length?state.symptoms.join(', '):'구체적인 증상 미선택';
    const detail=state.detail||'추가 상세 내용은 입력하지 않았습니다.';
    document.querySelector('#resultBody').textContent=state.body;
    document.querySelector('#resultSymptoms').textContent=selected;
    document.querySelector('#resultDetail').textContent=`“${detail}”`;
    document.querySelector('#analysisText').innerHTML=`<strong>${state.body}</strong> 부위의 <strong>${selected}</strong> 정보를 기준으로 통증 양상과 기능 제한을 우선 확인할 필요가 있습니다. 입력하신 상세 내용을 함께 고려해 관련성이 높은 치료 방향을 정리했습니다.`;
  }

  function renderMatched(){
    const programWrap=document.querySelector('#programCards');
    programWrap.innerHTML=programs.map((x,i)=>`<article class="result-card"><span class="match-badge">AI ${x.match}</span><h3>${x.name}</h3><p><strong>${x.hospital}</strong><br>${x.area}</p><div class="card-bottom"><b>${x.price}</b><button type="button" class="button secondary" data-program-index="${i}">이벤트 상세보기</button></div></article>`).join('');
    const hospitalWrap=document.querySelector('#hospitalCards');
    hospitalWrap.innerHTML=hospitals.map((x,i)=>`<article class="result-card compact"><span class="verify-badge">GOLDENCELL 인증</span><h3>${x.name}</h3><p>${x.area}<br>★ ${x.rating} · ${x.specialty}</p><button type="button" class="button secondary" data-hospital-index="${i}">병원 상세보기</button></article>`).join('');
  }

  function renderProgramDetail(){
    const x=state.selectedProgram||programs[0];
    document.querySelector('#programTitle').textContent=x.name;
    document.querySelector('#programHospital').textContent=x.hospital;
    document.querySelector('#programArea').textContent=x.area;
    document.querySelector('#programPrice').textContent=x.price;
  }

  function renderHospitalDetail(){
    const x=state.selectedHospital||hospitals[0];
    document.querySelector('#hospitalTitle').textContent=x.name;
    document.querySelector('#hospitalArea').textContent=x.area;
    document.querySelector('#hospitalRating').textContent=`★ ${x.rating}`;
    document.querySelector('#hospitalSpecialty').textContent=x.specialty;
  }

  function renderBidForm(){
    document.querySelector('#bidBody').textContent=state.body||'무릎·관절';
    document.querySelector('#bidSymptoms').textContent=state.symptoms.join(', ')||'통증, 계단 이용 시 불편';
    document.querySelector('#bidDetail').textContent=state.detail||'일상생활에서 반복되는 통증으로 상담을 희망합니다.';
    document.querySelectorAll('[data-region]').forEach(b=>b.classList.toggle('is-selected',b.dataset.region===state.region));
    document.querySelectorAll('[data-budget]').forEach(b=>b.classList.toggle('is-selected',b.dataset.budget===state.budget));
  }

  function renderBidResults(){
    document.querySelector('#bidCondition').textContent=`${state.region} · ${state.budget}`;
  }

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-go]');
    if(nav&&!nav.disabled)showScreen(nav.dataset.go);

    const bodyButton=event.target.closest('[data-body]');
    if(bodyButton){
      state.body=bodyButton.dataset.body;state.symptoms=[];
      document.querySelectorAll('[data-body]').forEach(button=>button.classList.toggle('is-selected',button===bodyButton));
      document.querySelector('#selectedBodyLabel').textContent=state.body;
      document.querySelector('#bodyNext').disabled=false;
    }

    const programButton=event.target.closest('[data-program-index]');
    if(programButton){state.selectedProgram=programs[Number(programButton.dataset.programIndex)];showScreen('program-detail');}
    const hospitalButton=event.target.closest('[data-hospital-index]');
    if(hospitalButton){state.selectedHospital=hospitals[Number(hospitalButton.dataset.hospitalIndex)];showScreen('hospital-detail');}
    const regionButton=event.target.closest('[data-region]');
    if(regionButton){state.region=regionButton.dataset.region;renderBidForm();}
    const budgetButton=event.target.closest('[data-budget]');
    if(budgetButton){state.budget=budgetButton.dataset.budget;renderBidForm();}
  });

  document.querySelector('#bodyNext').addEventListener('click',()=>showScreen('ai-detail'));
  document.querySelector('#detailText').addEventListener('input',event=>{state.detail=event.target.value});
  document.querySelector('#detailComplete').addEventListener('click',()=>{
    state.detail=document.querySelector('#detailText').value;
    showScreen('ai-result');
  });
})();