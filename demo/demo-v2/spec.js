(()=>{
  const specs={
    home:{id:'PAT-00',title:'Patient Home',purpose:'환자 서비스의 3가지 핵심 진입 경로를 선택',inputs:'없음',outputs:'direct | ai-start | bid-form',note:'직접 탐색, AI 추천, 치료제안 입찰의 우선순위와 카피를 검토'},
    direct:{id:'PAT-01',title:'Direct Discovery Entry',purpose:'병원 또는 치료 프로그램 직접 탐색 분기',inputs:'discoveryType',outputs:'hospital-list | treatment-list',note:'검색/필터 상세 정책은 후속 화면에서 정의'},
    'hospital-list':{id:'PAT-02',title:'Hospital List',purpose:'치료 분야·지역 기준 병원 탐색',inputs:'category, region, sort',outputs:'selectedHospital → hospital-detail',note:'필터/정렬/페이지네이션 정책 확정 필요'},
    'treatment-list':{id:'PAT-03',title:'Treatment Program List',purpose:'치료·이벤트 프로그램 탐색',inputs:'category, region, sort',outputs:'selectedProgram → program-detail',note:'가격 표기 기준과 이벤트/일반 프로그램 구분 필요'},
    'ai-start':{id:'AI-00',title:'AI Recommendation Intro',purpose:'AI 맞춤제안 흐름 안내',inputs:'없음',outputs:'ai-body',note:'의료적 진단이 아닌 정보 탐색 보조임을 명시'},
    'ai-body':{id:'AI-01',title:'Body Category Select',purpose:'불편 부위 1개 선택',inputs:'bodyCategory (required, single)',outputs:'bodyCategory → AI-02',note:'카테고리 코드 체계 정의 필요'},
    'ai-detail':{id:'AI-02',title:'Symptoms & Detail',purpose:'증상 복수선택 및 상세내용 입력',inputs:'symptomCodes[] (multi), detailText',outputs:'AI 입력 데이터 → ai-result / bid-form',note:'증상기간, 기존치료, 연령대 추가 여부 검토'},
    'ai-result':{id:'AI-03',title:'AI Analysis Result',purpose:'입력값 요약 + 추천 치료 방향 제시',inputs:'bodyCategory, symptomCodes[], detailText',outputs:'recommendedDirections[] / matched / bid-form',note:'Match 점수 산정 로직·표현 정책 별도 정의 필요'},
    matched:{id:'AI-04',title:'Matched Programs & Hospitals',purpose:'추천 이벤트 프로그램과 관련 전문병원 분리 노출',inputs:'recommendedDirections[]',outputs:'selectedProgram / selectedHospital',note:'프로그램 우선, 병원은 보조 영역으로 유지'},
    'program-detail':{id:'PRG-01',title:'Program Detail',purpose:'치료/이벤트 프로그램 상세 정보 제공',inputs:'programId',outputs:'consult request',note:'소개·과정·대상·의료정보·병원·의료진·FAQ·광고고지 항목 필요'},
    'hospital-detail':{id:'HSP-01',title:'Hospital Detail',purpose:'병원 정보와 관련 프로그램 확인',inputs:'hospitalId',outputs:'consult request / related programs',note:'병원소개·통계·의료진·시설·진료시간·인증 항목 필요'},
    'bid-form':{id:'BID-01',title:'Treatment Proposal Request',purpose:'병원에 전달할 치료 조건 확인/추가',inputs:'AI data(optional), region, budget, priority',outputs:'proposalRequest',note:'AI 진입 시 기존 입력값 자동 연계'},
    'bid-results':{id:'BID-02',title:'Hospital Proposal Results',purpose:'도착한 병원 제안 비교',inputs:'proposalRequestId',outputs:'selectedHospital / consult',note:'가격·상담일·프로그램·의료진·제안메시지 비교 항목 정의'},
    consult:{id:'RSV-01',title:'Consult Request',purpose:'병원 상담 신청',inputs:'hospitalId, method, preferredAt, message',outputs:'consultRequest',note:'예약과 상담의 상태값 구분 필요'},
    'consult-complete':{id:'RSV-02',title:'Consult Complete',purpose:'상담 접수 결과 확인',inputs:'consultRequestId',outputs:'my',note:'접수/확정/변경/취소 상태 필요'},
    my:{id:'MY-01',title:'My GoldenCell',purpose:'AI·제안·상담·회복 여정 요약',inputs:'memberId',outputs:'recovery',note:'Phase별 노출 모듈 정의 필요'},
    recovery:{id:'RCV-01',title:'Recovery',purpose:'치료 후 회복 기록과 변화 추적',inputs:'pain, swelling, activity, sleep, memo',outputs:'recoveryTimeline',note:'Treatment/Reservation과 강결합하지 않고 독립 사용 가능'},
    'hospital-dashboard':{id:'HADM-00',title:'Hospital Dashboard',purpose:'병원 운영 현황과 신규 요청 요약',inputs:'hospitalId',outputs:'hospital-requests',note:'Phase 1 KPI와 Phase 2 KPI 분리 필요'},
    'hospital-requests':{id:'HADM-01',title:'Patient Needs Inbox',purpose:'환자 치료제안 요청 목록 확인',inputs:'status, category, receivedAt',outputs:'requestId → hospital-request-detail',note:'개인정보 최소 노출 원칙 적용'},
    'hospital-request-detail':{id:'HADM-02',title:'Patient Needs Detail',purpose:'환자 조건 확인 후 제안 준비',inputs:'requestId',outputs:'hospital-proposal',note:'진단정보가 아닌 환자 입력 Needs 중심'},
    'hospital-proposal':{id:'HADM-03',title:'Proposal Compose',purpose:'병원 등록 프로그램으로 상담 제안 작성',inputs:'programId, priceRange, availableAt, message',outputs:'proposal',note:'치료 확정 표현 금지, 상담 제안으로 제한'},
    'hospital-proposal-complete':{id:'HADM-04',title:'Proposal Sent',purpose:'제안 전송 완료 상태 확인',inputs:'proposalId',outputs:'hospital-dashboard',note:'환자 확인/선택/상담전환 상태 추적 필요'}
  };

  const flows=[
    ['PATIENT','home'],['DIRECT','hospital-list'],['AI 1','ai-body'],['AI 2','ai-detail'],['AI RESULT','ai-result'],['MATCH','matched'],['BID','bid-form'],['MY','my'],['RECOVERY','recovery'],['HOSPITAL','hospital-dashboard']
  ];

  const panel=document.createElement('aside');
  panel.className='spec-panel';
  panel.innerHTML='<div class="spec-head"><b>FUNCTIONAL SPEC</b><span id="specId">-</span></div><h3 id="specTitle">-</h3><dl><div><dt>목적</dt><dd id="specPurpose">-</dd></div><div><dt>입력</dt><dd id="specInputs">-</dd></div><div><dt>출력/이동</dt><dd id="specOutputs">-</dd></div><div><dt>개발·디자인 메모</dt><dd id="specNote">-</dd></div></dl>';
  document.body.appendChild(panel);

  const nav=document.createElement('nav');
  nav.className='flow-nav';
  nav.innerHTML='<span>FLOW</span>'+flows.map(([label,target])=>`<button type="button" data-spec-go="${target}">${label}</button>`).join('');
  document.body.appendChild(nav);

  function activeName(){return document.querySelector('[data-screen].is-active')?.dataset.screen||'home'}
  function renderSpec(){
    const name=activeName();
    const s=specs[name]||{id:'TBD',title:name,purpose:'화면 목적 정의 필요',inputs:'TBD',outputs:'TBD',note:'기획 확인 필요'};
    document.querySelector('#specId').textContent=s.id;
    document.querySelector('#specTitle').textContent=s.title;
    document.querySelector('#specPurpose').textContent=s.purpose;
    document.querySelector('#specInputs').textContent=s.inputs;
    document.querySelector('#specOutputs').textContent=s.outputs;
    document.querySelector('#specNote').textContent=s.note;
    nav.querySelectorAll('button').forEach(b=>b.classList.toggle('is-active',b.dataset.specGo===name));
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-spec-go]');
    if(b){
      const target=document.querySelector(`[data-screen="${b.dataset.specGo}"]`);
      if(target){document.querySelectorAll('[data-screen]').forEach(el=>el.classList.toggle('is-active',el===target));window.scrollTo(0,0);}
    }
    setTimeout(renderSpec,0);
  });
  const observer=new MutationObserver(renderSpec);
  document.querySelectorAll('[data-screen]').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
  renderSpec();
})();