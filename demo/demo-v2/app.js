(()=>{
  const state={body:'',symptoms:[],detail:''};
  const symptoms={
    '무릎·관절':['통증','계단 이용 시 불편','붓기','보행 시 불편','운동 시 통증','관절 움직임 제한'],
    '허리·척추':['허리 통증','다리 저림','오래 앉기 불편','보행 시 불편'],
    '어깨':['어깨 통증','팔을 들기 어려움','야간 통증','움직임 제한'],
    '피부·미용':['탄력 저하','흉터','색소 고민','피부 재생'],
    '두피·탈모':['탈모 진행','모발 가늘어짐','두피 고민','모발 밀도 저하'],
    '면역·항노화':['피로','회복 저하','컨디션 저하','항노화 상담'],
    '기타':['기타 불편 증상']
  };

  function showScreen(name){
    document.querySelectorAll('[data-screen]').forEach(el=>el.classList.toggle('is-active',el.dataset.screen===name));
    window.scrollTo({top:0,behavior:'instant'});
    if(name==='ai-detail')renderDetail();
  }

  function renderDetail(){
    const label=document.querySelector('#detailBodyLabel');
    const options=document.querySelector('#symptomOptions');
    const summary=document.querySelector('#detailSummary');
    label.textContent=state.body||'-';
    options.innerHTML='';
    (symptoms[state.body]||[]).forEach(item=>{
      const button=document.createElement('button');
      button.type='button';
      button.textContent=item;
      button.classList.toggle('is-selected',state.symptoms.includes(item));
      button.addEventListener('click',()=>{
        state.symptoms=state.symptoms.includes(item)?state.symptoms.filter(x=>x!==item):[...state.symptoms,item];
        renderDetail();
      });
      options.appendChild(button);
    });
    summary.textContent=`${state.body} · 증상 ${state.symptoms.length}개 선택`;
    document.querySelector('#detailText').value=state.detail;
  }

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-go]');
    if(nav&&!nav.disabled)showScreen(nav.dataset.go);

    const bodyButton=event.target.closest('[data-body]');
    if(bodyButton){
      state.body=bodyButton.dataset.body;
      state.symptoms=[];
      document.querySelectorAll('[data-body]').forEach(button=>button.classList.toggle('is-selected',button===bodyButton));
      document.querySelector('#selectedBodyLabel').textContent=state.body;
      document.querySelector('#bodyNext').disabled=false;
    }
  });

  document.querySelector('#bodyNext').addEventListener('click',()=>showScreen('ai-detail'));
  document.querySelector('#detailText').addEventListener('input',event=>{state.detail=event.target.value});
  document.querySelector('#detailComplete').addEventListener('click',()=>{
    state.detail=document.querySelector('#detailText').value;
    document.querySelector('#completeNote').hidden=false;
  });
})();