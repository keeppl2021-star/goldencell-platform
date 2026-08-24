(()=>{
  const section=document.querySelector('[data-screen="program-detail"]');
  if(!section)return;

  section.innerHTML=`
    <button type="button" class="back-link" data-go="matched">← 프로그램 목록</button>
    <div class="eyebrow">PRG-01 · EVENT PROGRAM DETAIL</div>
    <h1 id="programTitle"></h1>
    <p class="lead">병원이 등록한 이벤트·치료 프로그램의 상담 전 정보를 확인하는 화면입니다. 실제 치료 여부·방법·비용은 의료진 상담 및 진료 후 확정됩니다.</p>

    <div class="program-spec-hero">
      <div class="program-gallery-block">
        <div class="mock-image">PROGRAM IMAGE / GALLERY</div>
        <div class="program-thumb-row"><span>대표 이미지</span><span>치료/시설 이미지</span><span>의료진 이미지</span><span>안내 이미지</span></div>
        <div class="field-note">media[] · coverImageUrl · sortOrder</div>
      </div>
      <aside class="detail-card program-summary-card">
        <div class="verify-badge">이벤트 프로그램</div>
        <h2 id="programHospital"></h2>
        <p id="programArea"></p>
        <div class="program-kv"><span>진료 분야</span><strong>관절·척추 / 재생치료</strong></div>
        <div class="program-kv"><span>이벤트 기간</span><strong>2026.08.01 ~ 2026.09.30</strong></div>
        <div class="program-kv"><span>상담 가능 상태</span><strong>접수 가능</strong></div>
        <div class="price"><small>표시 가격 · displayPrice</small><strong id="programPrice"></strong><p>최종 비용은 진료·검사 및 치료계획에 따라 달라질 수 있습니다.</p></div>
        <button type="button" class="button primary" data-go="consult">상담 신청</button>
        <button type="button" class="button secondary" data-go="hospital-list">병원 정보 보기</button>
      </aside>
    </div>

    <nav class="program-anchor-nav">
      <span>프로그램 소개</span><span>추천 대상</span><span>진행 과정</span><span>치료 정보</span><span>의료진</span><span>병원</span><span>FAQ</span><span>고지</span>
    </nav>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">01</span><h2>프로그램 기본정보</h2></div><code>programProfile</code></div>
      <div class="spec-table">
        <div><b>프로그램명</b><span id="programTitleMirror">선택 프로그램명</span><code>programName</code></div>
        <div><b>프로그램 유형</b><span>이벤트 / 상담 프로그램</span><code>programType</code></div>
        <div><b>진료 카테고리</b><span>관절·척추</span><code>categoryCode</code></div>
        <div><b>노출 상태</b><span>게시중</span><code>publishStatus</code></div>
        <div><b>이벤트 기간</b><span>2026.08.01 ~ 2026.09.30</span><code>startAt, endAt</code></div>
        <div><b>상담 접수</b><span>가능</span><code>consultAvailable</code></div>
      </div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">02</span><h2>프로그램 소개</h2></div><code>introduction</code></div>
      <div class="content-block"><h3>프로그램 요약</h3><p>현재 증상, 기존 치료 경험, 검사 결과 등을 확인한 뒤 의료진이 상담을 진행하는 프로그램입니다. 플랫폼에서는 치료를 확정하지 않고 정보 탐색과 상담 연결을 지원합니다.</p><div class="field-note">summary · description · highlights[]</div></div>
      <div class="highlight-grid"><div><b>핵심 포인트 01</b><p>현재 상태 기반 상담</p></div><div><b>핵심 포인트 02</b><p>의료진 진료 후 계획 수립</p></div><div><b>핵심 포인트 03</b><p>치료 후 회복관리 연계 가능</p></div></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">03</span><h2>추천 대상 / 상담 고려 대상</h2></div><code>targetAudience[]</code></div>
      <ul class="check-list"><li>반복되는 관절 통증으로 치료 정보를 찾는 사용자</li><li>기존 보존적 치료 후 추가 상담을 고려하는 사용자</li><li>치료방법·회복기간·비용을 의료진과 상담하고 싶은 사용자</li><li>개인 상태에 맞는 적합성 확인이 필요한 사용자</li></ul>
      <div class="warning-box"><b>표현 정책</b><p>“치료 대상”, “효과 보장”, “완치 가능”처럼 치료 결과를 확정하는 문구는 사용하지 않습니다.</p></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">04</span><h2>상담·진료 진행 과정</h2></div><code>processSteps[]</code></div>
      <ol class="process-spec"><li><span>01</span><div><b>상담 신청</b><p>희망 방식·일정·문의내용 입력</p><code>consultRequest</code></div></li><li><span>02</span><div><b>병원 상담</b><p>현재 상태와 기존 치료 경험 확인</p><code>consultation</code></div></li><li><span>03</span><div><b>진료·검사</b><p>필요 시 의료진 판단에 따라 검사 진행</p><code>medicalAssessment</code></div></li><li><span>04</span><div><b>치료계획 안내</b><p>적합성·방법·일정·비용 안내</p><code>treatmentPlan</code></div></li><li><span>05</span><div><b>회복관리</b><p>치료 후 Recovery 기능 연계 가능</p><code>recovery(optional)</code></div></li></ol>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">05</span><h2>치료·의료 정보</h2></div><code>medicalInfo</code></div>
      <div class="spec-table">
        <div><b>치료 방식</b><span>의료진 상담 후 결정</span><code>treatmentMethod</code></div>
        <div><b>사용 세포/재료</b><span>병원 등록 정보 노출</span><code>cellSource</code></div>
        <div><b>예상 소요시간</b><span>진료계획에 따라 상이</span><code>estimatedDuration</code></div>
        <div><b>회복 안내</b><span>개인 상태에 따라 상이</span><code>recoveryGuide</code></div>
        <div><b>주의사항</b><span>의료진 안내 기준</span><code>precautions[]</code></div>
        <div><b>부작용/위험 고지</b><span>필수 노출 영역</span><code>riskDisclosure</code></div>
      </div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">06</span><h2>가격 / 이벤트 조건</h2></div><code>pricing</code></div>
      <div class="spec-table">
        <div><b>표시 가격</b><span>680만원</span><code>displayPrice</code></div>
        <div><b>정상가</b><span>선택 노출</span><code>regularPrice</code></div>
        <div><b>가격 범위</b><span>검사·상태에 따라 변동 가능</span><code>priceRange</code></div>
        <div><b>포함 항목</b><span>상담 / 기본 진료 등</span><code>includedItems[]</code></div>
        <div><b>제외 항목</b><span>추가 검사 등</span><code>excludedItems[]</code></div>
        <div><b>이벤트 조건</b><span>기간 / 대상 / 예약조건</span><code>eventConditions[]</code></div>
      </div>
      <div class="warning-box"><b>가격 정책</b><p>플랫폼 표시 금액은 정보 제공용이며 실제 비용은 상담·진료 후 달라질 수 있음을 명확하게 고지합니다.</p></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">07</span><h2>담당 의료진</h2></div><code>doctors[]</code></div>
      <div class="profile-row"><div class="profile-photo">DOCTOR</div><div><h3>박민석 원장</h3><p>정형외과 / 관절·재생치료 상담</p><div class="field-note">doctorId · name · specialty · careerSummary · profileImage</div></div></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">08</span><h2>제공 병원</h2></div><code>hospitalSummary</code></div>
      <div class="hospital-summary-box"><div><span class="verify-badge">GOLDENCELL 인증</span><h3 id="programHospitalMirror">병원명</h3><p id="programAreaMirror">병원 위치</p></div><button type="button" class="button secondary" data-go="hospital-list">병원 상세 확인 →</button></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">09</span><h2>FAQ</h2></div><code>faqs[]</code></div>
      <div class="faq-list"><details open><summary>상담을 신청하면 바로 치료가 확정되나요?</summary><p>아닙니다. 상담과 의료진 진료 후 실제 치료 가능 여부와 방법이 결정됩니다.</p></details><details><summary>표시된 금액이 최종 비용인가요?</summary><p>검사, 현재 상태, 치료 계획 등에 따라 실제 비용은 달라질 수 있습니다.</p></details><details><summary>AI 추천 결과와 이 프로그램은 어떤 관계인가요?</summary><p>AI 결과는 관련 정보를 탐색하기 위한 보조 정보이며 의료적 진단이나 치료 적합성 확정을 의미하지 않습니다.</p></details></div>
    </section>

    <section class="program-spec-section">
      <div class="section-head"><div><span class="section-no">10</span><h2>의료광고 / 정보 고지</h2></div><code>disclosures[]</code></div>
      <div class="disclosure-box"><p>본 페이지는 의료기관이 제공한 정보를 기반으로 한 치료·상담 정보입니다. 개인별 치료 결과에는 차이가 있을 수 있으며, 구체적인 치료 여부·방법·비용은 의료진 진료 후 결정됩니다.</p><p>플랫폼은 치료 결과를 보장하지 않으며, 정보 탐색과 상담 연결을 지원합니다.</p></div>
    </section>
  `;

  function mirror(){
    const title=document.querySelector('#programTitle')?.textContent||'선택 프로그램명';
    const hospital=document.querySelector('#programHospital')?.textContent||'병원명';
    const area=document.querySelector('#programArea')?.textContent||'병원 위치';
    const t=document.querySelector('#programTitleMirror'); if(t)t.textContent=title;
    const h=document.querySelector('#programHospitalMirror'); if(h)h.textContent=hospital;
    const a=document.querySelector('#programAreaMirror'); if(a)a.textContent=area;
  }
  const observer=new MutationObserver(()=>{
    if(section.classList.contains('is-active'))setTimeout(mirror,0);
  });
  observer.observe(section,{attributes:true,attributeFilter:['class']});
  section.querySelectorAll('#programTitle,#programHospital,#programArea').forEach(el=>observer.observe(el,{childList:true,subtree:true}));
})();