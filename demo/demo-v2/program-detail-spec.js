(()=>{
  function apply(){
    const active=document.querySelector('[data-screen="program-detail"].is-active');
    if(!active)return;
    const set=(id,value)=>{const el=document.querySelector(id);if(el)el.textContent=value};
    set('#specId','PRG-01');
    set('#specTitle','Event Program Detail');
    set('#specPurpose','환자가 이벤트 프로그램의 구성·대상·진행과정·의료정보·가격조건·의료진·제공병원·FAQ·고지를 확인하고 상담 여부를 결정');
    set('#specInputs','programId(required), sourceContext(direct|ai|hospital|bid), hospitalId, recommendationContext(optional)');
    set('#specOutputs','consultRequest | hospital-detail | matched/treatment-list');
    set('#specNote','필수 섹션: 기본정보 → 소개 → 추천 대상 → 진행 과정 → 치료/의료 정보 → 가격/이벤트 조건 → 의료진 → 병원 → FAQ → 의료광고·정보 고지. 표시가격은 최종 치료비 확정값으로 표현하지 않음.');
  }
  document.addEventListener('click',()=>setTimeout(apply,0));
  const observer=new MutationObserver(()=>setTimeout(apply,0));
  document.querySelectorAll('[data-screen]').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
  apply();

  // Load AI unified-input enhancement after the base app/spec scripts are initialized.
  const script=document.createElement('script');
  script.src='./ai-combined.js?v=6';
  document.body.appendChild(script);
})();