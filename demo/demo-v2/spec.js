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
    'hospital-detail':{id:'HSP-01',title:'Hospital Detail',purpose:'환자가 병원의 신뢰도·전문성·치료 프로그램·진료 가능 정보를 확인하고 상담 여부를 결정',inputs:'hospitalId(required), sourceContext(direct|ai|bid|program), selectedProgramId(optional)',outputs:'consultRequest | program-detail | hospital-list',note:'상세 섹션: 기본정보 → 인증/신뢰 → 전문분야 → 대표 프로그램 → 의료진 → 시설 → 진료시간 → 위치 → 후기 → FAQ. 병원 직접 작성 데이터와 플랫폼 검증 데이터를 시각적으로 구분.'},
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

  // HSP-01: 개발/디자인 전달용 병원 상세 화면 구조
  const hospitalDetail=document.querySelector('[data-screen="hospital-detail"]');
  if(hospitalDetail){
    hospitalDetail.innerHTML=`
      <button type="button" class="back-link" data-go="hospital-list">← 병원 목록</button>
      <div class="spec-screen-label"><b>HSP-01</b><span>Hospital Detail</span></div>
      <section class="hsp-hero">
        <div class="hsp-gallery">
          <div class="hsp-gallery-main"><span>대표 이미지 / 시설 사진</span><small>imageUrls[] · max 10</small></div>
          <div class="hsp-gallery-thumbs"><i>01</i><i>02</i><i>03</i><i>04</i></div>
        </div>
        <div class="hsp-summary">
          <div class="eyebrow">GOLDENCELL 인증 병원</div>
          <h1 id="hospitalTitle">병원명</h1>
          <div class="hsp-meta"><strong id="hospitalRating" class="rating">★ 4.8</strong><span>후기 126</span><span id="hospitalArea">서울 서초구</span></div>
          <p id="hospitalSpecialty" class="hsp-specialty">관절·척추 · 줄기세포</p>
          <div class="hsp-tags"><span>줄기세포 치료</span><span>관절·척추</span><span>회복관리</span></div>
          <div class="hsp-actions"><button type="button" class="button primary" data-go="consult">상담 신청</button><button type="button" class="button secondary" data-go="treatment-list">치료 프로그램 보기</button></div>
        </div>
      </section>

      <div class="hsp-tabs"><span>병원 소개</span><span>치료 프로그램</span><span>의료진</span><span>시설</span><span>진료안내</span><span>후기</span><span>FAQ</span></div>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 01</small><h2>병원 기본정보</h2></div><code>hospitalProfile</code></div><div class="hsp-field-grid"><div><small>병원명</small><b>hospitalName</b></div><div><small>의료기관 유형</small><b>hospitalType</b></div><div><small>대표 전화</small><b>phone</b></div><div><small>홈페이지</small><b>websiteUrl</b></div><div><small>주소</small><b>address / addressDetail</b></div><div><small>사업자/의료기관 식별</small><b>institutionCode</b></div></div><p class="hsp-example">라이프스템셀병원은 관절·척추 및 재생치료 상담을 중심으로 환자의 상태 확인 → 의료진 진료 → 치료 방향 안내 → 회복관리까지 연결합니다.</p></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 02</small><h2>GoldenCell 인증 · 신뢰정보</h2></div><code>verification</code></div><div class="hsp-trust-grid"><article><b>✓ 의료기관 확인</b><p>의료기관 기본정보 검증</p><small>institutionVerified</small></article><article><b>✓ 의료진 정보 확인</b><p>등록 의료진 정보 검증 상태</p><small>doctorVerified</small></article><article><b>✓ 공식 프로그램</b><p>병원 직접 등록 프로그램 표시</p><small>officialProgram</small></article><article><b>개인정보 보호</b><p>상담 전 최소 정보 제공 원칙</p><small>privacyPolicy</small></article></div><div class="hsp-rule"><b>표시 규칙</b><span>병원 입력 정보</span><span class="verified">GoldenCell 검증 정보</span><span class="system">시스템 집계 정보</span></div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 03</small><h2>전문 진료 분야</h2></div><code>specialties[]</code></div><div class="hsp-field-grid"><div><small>대분류</small><b>관절·척추</b></div><div><small>세부 분야</small><b>무릎·연골·퇴행성 관절</b></div><div><small>치료 키워드</small><b>줄기세포 · 재생치료</b></div><div><small>회복관리 여부</small><b>Recovery 지원</b></div></div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 04</small><h2>대표 치료 프로그램</h2></div><code>programs[]</code></div><div class="hsp-program-grid"><article><span class="verify-badge">대표 프로그램</span><h3>자가 골수 유래 무릎 줄기세포 치료</h3><p>무릎·관절 · 상담 후 치료 확정</p><strong>680만원~</strong><button class="button secondary" data-go="treatment-list">상세보기</button></article><article><span class="verify-badge">회복 연계</span><h3>관절 재생 집중 프로그램</h3><p>검사 · 상담 · 회복관리</p><strong>590만원~</strong><button class="button secondary" data-go="treatment-list">상세보기</button></article></div><div class="hsp-data-note">필드: programId · title · category · priceDisplay · eventYn · status · thumbnailUrl · consultationAvailable</div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 05</small><h2>의료진</h2></div><code>doctors[]</code></div><div class="hsp-doctor-grid"><article><div class="doctor-photo">PHOTO</div><div><small>대표 의료진</small><h3>박민석 원장</h3><p>정형외과 · 관절 및 재생치료</p><ul><li>관련 진료 18년</li><li>주요 진료: 무릎·관절</li><li>진료 가능 요일: 월·화·목·금</li></ul></div></article><article class="hsp-field-list"><p><small>doctorId</small> 의료진 식별값</p><p><small>name</small> 성명</p><p><small>department</small> 진료과</p><p><small>specialties[]</small> 전문 분야</p><p><small>careerSummary</small> 주요 경력</p><p><small>schedule</small> 진료 일정</p></article></div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 06</small><h2>시설 · 장비</h2></div><code>facilities[] / equipment[]</code></div><div class="hsp-facility-grid"><div>상담실<small>facilityType</small></div><div>검사실<small>facilityType</small></div><div>치료실<small>facilityType</small></div><div>회복실<small>facilityType</small></div></div><div class="hsp-data-note">시설 사진은 병원 전체 갤러리와 중복 사용 가능. 장비는 의료광고 표현 검토 후 노출.</div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 07</small><h2>진료시간 · 상담 가능정보</h2></div><code>businessHours</code></div><div class="hsp-hours"><div><b>월–금</b><span>09:00–18:00</span></div><div><b>토요일</b><span>09:00–13:00</span></div><div><b>일요일/공휴일</b><span>휴진</span></div><div><b>점심시간</b><span>13:00–14:00</span></div></div><div class="hsp-data-note">별도 상태: todayOpenYn · consultationAvailableYn · nextAvailableAt</div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 08</small><h2>위치 · 방문안내</h2></div><code>location</code></div><div class="hsp-location"><div class="map-placeholder">MAP / 지도 API 영역</div><div><p><b>주소</b><br>서울 서초구 강남대로 000</p><p><b>교통</b><br>지하철 2호선 강남역 5번 출구</p><p><b>주차</b><br>건물 지하 주차 가능 / 상담 시 안내</p><small>latitude · longitude · transportGuide · parkingGuide</small></div></div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 09</small><h2>환자 후기 요약</h2></div><code>reviewSummary</code></div><div class="hsp-review-summary"><strong>4.8 / 5.0</strong><div><p>상담 설명 <b>4.9</b></p><p>시설 만족 <b>4.7</b></p><p>응대 만족 <b>4.8</b></p></div><div><p>등록 후기 <b>126건</b></p><p>치료경험 인증 후기 <b>48건</b></p></div></div><div class="hsp-data-note">후기 CMS 연결: reviewCount · verifiedReviewCount · ratingAvg · ratingByCategory</div></section>

      <section class="hsp-block"><div class="hsp-block-head"><div><small>SECTION 10</small><h2>FAQ · 고지</h2></div><code>faqs[] / disclosure</code></div><div class="hsp-faq"><details open><summary>상담 신청 후 바로 치료가 확정되나요?</summary><p>아닙니다. 실제 치료 여부와 방법은 의료진 진료와 필요한 검사 후 결정됩니다.</p></details><details><summary>표시된 비용은 확정 금액인가요?</summary><p>프로그램 안내용 금액이며 검사·환자 상태·치료 계획에 따라 달라질 수 있습니다.</p></details><details><summary>GoldenCell 인증은 무엇인가요?</summary><p>플랫폼이 정한 병원 및 정보 확인 기준을 충족한 경우 표시되는 서비스 내 인증 상태입니다.</p></details></div><div class="hsp-disclosure">의료정보 및 프로그램 내용은 정보 제공을 목적으로 하며, 개인의 치료 결정은 반드시 의료진 상담 및 진료를 통해 이루어져야 합니다.</div></section>

      <section class="hsp-sticky-action"><div><small>Primary CTA</small><b>이 병원에 상담을 신청하시겠어요?</b></div><button type="button" class="button primary" data-go="consult">상담 신청</button></section>`;

    const style=document.createElement('style');
    style.textContent=`
      .spec-screen-label{display:flex;gap:10px;align-items:center;margin-bottom:18px}.spec-screen-label b{background:#17132c;color:#fff;padding:6px 9px;border-radius:7px;font-size:12px}.spec-screen-label span{font-size:12px;color:#777180;font-weight:800}.hsp-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:30px;margin-bottom:28px}.hsp-gallery-main{height:330px;border:1px dashed #bbb4ca;border-radius:18px;background:#f7f6f9;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#655f70;font-weight:800}.hsp-gallery-main small{margin-top:8px;font-weight:500;color:#9992a2}.hsp-gallery-thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px}.hsp-gallery-thumbs i{height:58px;background:#f1eff4;border:1px solid #e1dde8;border-radius:9px;display:grid;place-items:center;font-style:normal;font-size:11px;color:#898291}.hsp-summary{padding:8px 0}.hsp-summary h1{font-size:38px;margin-top:14px}.hsp-meta{display:flex;gap:12px;align-items:center;flex-wrap:wrap;color:#777180;font-size:13px}.hsp-meta .rating{margin:0;font-size:20px}.hsp-specialty{font-size:17px;font-weight:700;margin:18px 0}.hsp-tags{display:flex;gap:8px;flex-wrap:wrap}.hsp-tags span{padding:7px 10px;border:1px solid #e1dce9;border-radius:999px;font-size:12px;background:#fff}.hsp-actions{display:flex;gap:10px;margin-top:24px}.hsp-tabs{display:flex;gap:6px;overflow:auto;border-top:1px solid #e9e5f1;border-bottom:1px solid #e9e5f1;padding:12px 0;margin:24px 0 30px}.hsp-tabs span{white-space:nowrap;padding:8px 12px;border-radius:9px;background:#f8f7fa;font-size:12px;font-weight:700}.hsp-block{border:1px solid #e7e3ed;border-radius:18px;padding:24px;margin:18px 0;background:#fff}.hsp-block-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:18px}.hsp-block-head small{color:#8c8494;font-weight:800;font-size:10px}.hsp-block-head h2{margin:4px 0 0}.hsp-block-head code,.hsp-data-note{font-family:ui-monospace,monospace;background:#f5f2fb;color:#6947c7;border-radius:8px;padding:6px 9px;font-size:11px}.hsp-field-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.hsp-field-grid>div{border:1px solid #ece8f1;background:#faf9fb;border-radius:11px;padding:13px}.hsp-field-grid small{display:block;color:#8f8796;font-size:10px;margin-bottom:6px}.hsp-field-grid b{font-family:ui-monospace,monospace;font-size:12px}.hsp-example{border-left:3px solid #6847f5;padding:11px 14px;margin:18px 0 0;background:#fbfaff;color:#665f6e;line-height:1.65}.hsp-trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.hsp-trust-grid article{border:1px solid #e6e2ea;border-radius:12px;padding:15px}.hsp-trust-grid article b{font-size:13px}.hsp-trust-grid article p{font-size:12px;color:#716b78;min-height:36px}.hsp-trust-grid article small{font-family:ui-monospace,monospace;color:#7658c8}.hsp-rule{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px;font-size:11px}.hsp-rule span{padding:6px 8px;background:#f4f2f6;border-radius:6px}.hsp-rule .verified{background:#eef6f2;color:#2f6b5b}.hsp-rule .system{background:#eef2fa;color:#365a94}.hsp-program-grid,.hsp-doctor-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.hsp-program-grid article{border:1px solid #e8e4ee;border-radius:13px;padding:17px}.hsp-program-grid article h3{font-size:17px}.hsp-program-grid article p{color:#776f7e;font-size:13px}.hsp-program-grid article strong{display:block;font-size:20px;margin:12px 0}.hsp-data-note{margin-top:12px;display:block;line-height:1.55}.hsp-doctor-grid>article{border:1px solid #e8e4ee;border-radius:13px;padding:16px}.hsp-doctor-grid>article:first-child{display:grid;grid-template-columns:100px 1fr;gap:16px}.doctor-photo{height:120px;background:#f0edf3;border-radius:10px;display:grid;place-items:center;font-size:11px;color:#8b8491}.hsp-doctor-grid h3{margin:3px 0}.hsp-doctor-grid p,.hsp-doctor-grid li{font-size:12px;color:#716a77}.hsp-field-list p{margin:8px 0}.hsp-field-list small{font-family:ui-monospace,monospace;color:#6847f5;margin-right:8px}.hsp-facility-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.hsp-facility-grid div{height:100px;border:1px dashed #d7d1df;border-radius:12px;background:#f9f8fa;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:700}.hsp-facility-grid small{font-family:ui-monospace,monospace;color:#8a8192;margin-top:5px;font-size:10px}.hsp-hours{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.hsp-hours div{background:#faf9fb;border:1px solid #ece8f1;border-radius:10px;padding:14px}.hsp-hours b,.hsp-hours span{display:block}.hsp-hours b{font-size:12px;margin-bottom:6px}.hsp-hours span{font-size:13px;color:#675f6c}.hsp-location{display:grid;grid-template-columns:1.2fr .8fr;gap:16px}.map-placeholder{min-height:190px;background:#f0f2f1;border:1px dashed #bdc7c2;border-radius:12px;display:grid;place-items:center;font-weight:800;color:#66736d}.hsp-location p{font-size:13px;color:#665f6d}.hsp-location small{font-family:ui-monospace,monospace;color:#6847f5}.hsp-review-summary{display:grid;grid-template-columns:.7fr 1fr 1fr;gap:12px;align-items:center}.hsp-review-summary>strong{font-size:28px;color:#ff951f}.hsp-review-summary>div{border-left:1px solid #e7e3ea;padding-left:16px}.hsp-review-summary p{font-size:12px;margin:7px 0}.hsp-faq details{border-top:1px solid #ece8f0;padding:13px 0}.hsp-faq summary{font-weight:700;font-size:13px;cursor:pointer}.hsp-faq p{font-size:12px;color:#6e6775;line-height:1.65}.hsp-disclosure{margin-top:14px;background:#f7f6f8;border-radius:10px;padding:14px;font-size:11px;color:#716a77;line-height:1.6}.hsp-sticky-action{position:sticky;bottom:66px;z-index:10;margin:28px 0 10px;border:1px solid #ded8ea;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-radius:15px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 12px 32px rgba(35,26,69,.11)}.hsp-sticky-action small,.hsp-sticky-action b{display:block}.hsp-sticky-action small{font-size:10px;color:#8d8495;margin-bottom:3px}.hsp-sticky-action b{font-size:14px}@media(max-width:900px){.hsp-hero,.hsp-location,.hsp-program-grid,.hsp-doctor-grid{grid-template-columns:1fr}.hsp-field-grid{grid-template-columns:1fr 1fr}.hsp-trust-grid,.hsp-facility-grid,.hsp-hours{grid-template-columns:1fr 1fr}.hsp-review-summary{grid-template-columns:1fr}.hsp-review-summary>div{border-left:0;border-top:1px solid #e7e3ea;padding:10px 0 0}.hsp-sticky-action{bottom:74px}}@media(max-width:560px){.hsp-field-grid,.hsp-trust-grid,.hsp-facility-grid,.hsp-hours{grid-template-columns:1fr}.hsp-gallery-main{height:230px}.hsp-summary h1{font-size:31px}.hsp-actions{flex-direction:column}.hsp-sticky-action{align-items:flex-start;gap:10px;flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

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