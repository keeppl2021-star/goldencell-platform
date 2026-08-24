(()=>{
const eventPrograms=[
 {name:'무릎 관절 재생 집중 프로그램',hospital:'뉴호라이즌클리닉',area:'서울 서초구',price:'590만원',benefit:'18% 혜택',match:'AI 추천 94%'},
 {name:'자가 골수 유래 무릎 줄기세포 치료',hospital:'라이프스템셀병원',area:'서울 서초구',price:'680만원',benefit:'17% 혜택',match:'AI 추천 92%'},
 {name:'관절 통증 회복 통합 케어',hospital:'강남리젠의원',area:'서울 강남구',price:'330만원',benefit:'15% 혜택',match:'AI 추천 86%'},
 {name:'무릎 기능 회복 재생 프로그램',hospital:'서울셀스클리닉',area:'서울 강남구',price:'420만원',benefit:'12% 혜택',match:'AI 추천 81%'}
];
const hospitals=[
 {name:'라이프스템셀병원',area:'서울 서초구',rating:'★ 4.8',specialty:'관절·척추 · 줄기세포'},
 {name:'뉴호라이즌클리닉',area:'서울 서초구',rating:'★ 4.6',specialty:'관절·척추 · 재생치료'},
 {name:'강남리젠의원',area:'서울 강남구',rating:'★ 4.5',specialty:'무릎·관절 · 회복관리'}
];
function selectEvent(i){sessionStorage.setItem('gcSelectedEvent',JSON.stringify(eventPrograms[i]));go('treatmentDetail')}
function selectHospital(i){sessionStorage.setItem('gcSelectedHospital',JSON.stringify(hospitals[i]));go('hospitalDetail')}
window.gcSelectEvent=selectEvent;window.gcSelectHospital=selectHospital;
function page(){return `<button class="back" onclick="go('airesult')">← AI 분석 결과</button>
<div class="route"><div><span class="pill">AI MATCHED PROGRAMS</span><h1>추천 치료와 관련된 프로그램을 찾았습니다.</h1><p class="small">AI 분석 결과와 관련된 실제 이벤트 프로그램을 먼저 비교하고, 아래에서 관련 치료 전문병원도 확인할 수 있습니다.</p></div></div>
<section style="margin-top:30px"><div class="route"><div><h2 style="margin:0">추천 이벤트 프로그램</h2><p class="small">AI 분석과 관련성이 높은 프로그램입니다. 이 영역을 우선 비교해보세요.</p></div><b style="color:var(--p)">4개 추천</b></div>
<div class="treatment-grid">${eventPrograms.map((x,i)=>`<article class="treatment-card"><div class="treatment-visual v${i%3}"><span>관절·척추</span><b style="position:absolute;right:14px;top:14px;background:white;color:var(--p);padding:7px 10px;border-radius:20px">${x.match}</b></div><div class="treatment-body"><span class="pill">이벤트</span><h3>${x.name}</h3><p><b>${x.hospital}</b><br>${x.area}</p><div class="treatment-bottom"><div><strong>${x.price}</strong> <small style="color:var(--p)">${x.benefit}</small></div><button type="button" class="treatment-detail" onclick="gcSelectEvent(${i})">이벤트 상세보기</button></div></div></article>`).join('')}</div></section>
<section style="margin-top:54px;padding-top:34px;border-top:1px solid #e8e6ef"><div class="route"><div><span class="small">RELATED HOSPITALS</span><h2 style="margin:5px 0">관련 치료 전문병원</h2><p class="small">이벤트 프로그램과 별도로, 해당 치료 분야를 전문적으로 상담할 수 있는 병원입니다.</p></div><button class="ghost" onclick="go('search')">병원 더보기</button></div><div class="grid" style="margin-top:20px">${hospitals.map((x,i)=>`<article class="card"><span class="pill">GOLDENCELL 인증</span><h3>${x.name}</h3><p>${x.area}<br><b>${x.rating}</b> · ${x.specialty}</p><button class="ghost" onclick="gcSelectHospital(${i})">병원 상세보기</button></article>`).join('')}</div></section>
<div class="notice" style="margin-top:34px">추천 순서는 사용자가 입력한 부위·증상·상세 내용과 프로그램 정보를 바탕으로 구성한 데모 결과입니다. 실제 치료 가능 여부와 방법은 의료진 진료 후 결정됩니다.</div>`}
const prev=window.render;window.render=function(){const p=(location.hash||'#home').slice(1);if(p==='aiPrograms'){app.innerHTML=page();scrollTo(0,0);return}prev()};
})();