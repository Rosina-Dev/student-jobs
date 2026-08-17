const jobs=[
 {id:1,initials:'BL',tone:'green',title:'Counter Team Member',company:'Brick Lane Café',location:'Downtown Cranford',pay:'$16.00/hr',hours:'12–16 hrs/week',schedule:['after-school','weekend'],time:'Tue, Thu + Sat',age:'16+',summary:'Welcome customers, package orders, restock supplies, and keep the counter area organized.'},
 {id:2,initials:'CP',tone:'amber',title:'Recreation Assistant',company:'Cranford Recreation',location:'Community Center',pay:'$16.50/hr',hours:'10–15 hrs/week',schedule:['after-school','weekend','summer'],time:'Weekday afternoons',age:'16+',summary:'Help prepare activities, welcome participants, and support staff during youth recreation programs.'},
 {id:3,initials:'ML',tone:'blue',title:'Library Page',company:'Cranford Public Library',location:'Walnut Avenue',pay:'$15.92/hr',hours:'10–12 hrs/week',schedule:['after-school','weekend'],time:'2 evenings + Sat',age:'16+',summary:'Shelve returned materials, organize reading areas, and help staff prepare displays and programs.'},
 {id:4,initials:'GM',tone:'green',title:'Grocery Store Associate',company:'Green Market Cranford',location:'South Avenue',pay:'$16.25/hr',hours:'15–20 hrs/week',schedule:['after-school','weekend'],time:'Flexible evenings',age:'16+',summary:'Stock light items, assist customers, collect carts, and keep displays neat under adult supervision.'},
 {id:5,initials:'PS',tone:'amber',title:'Pet Care Assistant',company:'Paws on South',location:'South Avenue East',pay:'$16.00/hr',hours:'10–14 hrs/week',schedule:['weekend','summer'],time:'Sat + Sun',age:'17+',summary:'Prepare supplies, clean common areas, and assist trained staff with supervised animal care.'},
 {id:6,initials:'GC',tone:'blue',title:'Summer Camp Assistant',company:'Garden Club Day Camp',location:'Cranford',pay:'$17.00/hr',hours:'18–20 hrs/week',schedule:['summer'],time:'Jun–Aug mornings',age:'16+',summary:'Set up games and crafts, check attendance, and support adult counselors during daily activities.'}
];

const list=document.querySelector('#job-list'),count=document.querySelector('#result-count'),search=document.querySelector('#search');
let activeFilter='all';
const savedJobs=new Set();
function renderJobs(){
 const query=search.value.trim().toLowerCase();
 const visible=jobs.filter(j=>(activeFilter==='all'||j.schedule.includes(activeFilter))&&`${j.title} ${j.company} ${j.summary}`.toLowerCase().includes(query));
 list.innerHTML=visible.map(j=>`<article class="job-card" tabindex="0" data-id="${j.id}" aria-label="View ${j.title} at ${j.company}"><div class="company-logo ${j.tone}">${j.initials}</div><div><span class="sample-label">Sample job - prototype only.</span><h3>${j.title}</h3><p>${j.company} · ${j.location}</p><div class="job-meta"><span class="verified">✓ Verified example</span><span>${j.time}</span><span>${j.age}</span></div></div><div class="pay"><strong>${j.pay}</strong><span>${j.hours}</span></div><button class="save-job ${savedJobs.has(j.id)?'saved':''}" data-save="${j.id}" aria-label="${savedJobs.has(j.id)?'Remove from saved jobs':'Save job'}" aria-pressed="${savedJobs.has(j.id)}">${savedJobs.has(j.id)?'♥':'♡'}</button></article>`).join('');
 count.textContent=visible.length;document.querySelector('#empty-state').classList.toggle('hidden',visible.length!==0);
 document.querySelectorAll('.job-card').forEach(card=>{card.addEventListener('click',e=>{if(!e.target.closest('.save-job'))openJob(+card.dataset.id)});card.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.target.closest('.save-job'))openJob(+card.dataset.id)})});
 document.querySelectorAll('.save-job').forEach(btn=>btn.addEventListener('click',()=>{const id=+btn.dataset.save;if(savedJobs.has(id)){savedJobs.delete(id);toast('Removed from saved jobs.')}else{savedJobs.add(id);toast('Job saved.')}renderJobs()}));
}
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;renderJobs()}));
search.addEventListener('input',renderJobs);

document.querySelectorAll('.nav-link').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-link').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));document.querySelector(`#${btn.dataset.view}`).classList.add('active-view');window.scrollTo({top:0,behavior:'smooth'})}));

const modal=document.querySelector('#job-modal');
function openJob(id){const j=jobs.find(x=>x.id===id);document.querySelector('#modal-content').innerHTML=`<span class="sample-label">Sample job - prototype only.</span><div class="modal-head"><div class="company-logo ${j.tone}">${j.initials}</div><div><p class="eyebrow">${j.company}</p><h2>${j.title}</h2><span class="verified">✓ Verified example</span></div></div><p>${j.summary}</p><div class="detail-grid"><div><span>Pay</span><strong>${j.pay}</strong></div><div><span>Weekly hours</span><strong>${j.hours}</strong></div><div><span>Schedule</span><strong>${j.time}</strong></div><div><span>Minimum age</span><strong>${j.age}</strong></div></div><div class="modal-note"><strong>Why this job is shown to you</strong><br>Your age, location, and weekly availability match this role. The posting passed an initial safety review.</div><div class="modal-actions"><button class="primary-btn apply-btn">Start short application</button></div>`;modal.showModal();document.querySelector('.apply-btn').addEventListener('click',()=>{modal.close();toast('Application started — no résumé required.')})}
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

const form=document.querySelector('#job-form');
document.querySelector('#start-post').addEventListener('click',()=>{form.classList.remove('hidden');form.scrollIntoView({behavior:'smooth'})});
document.querySelector('.close-form').addEventListener('click',()=>form.classList.add('hidden'));
form.addEventListener('submit',e=>{e.preventDefault();form.reset();form.classList.add('hidden');toast('Job submitted for safety review.')});
document.querySelector('.text-btn').addEventListener('click',()=>toast('Profile editor would open here.'));
document.querySelector('.avatar').addEventListener('click',()=>toast('Signed in as Jordan, age 17.'));
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}

// Town-first prototype routing. School entry pages reuse the town marketplace.
function showView(id,schoolEntry=false){
 document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
 document.querySelector('#'+id).classList.add('active-view');
 const local=id!=='platform';
 document.querySelector('#platform-nav').classList.toggle('hidden',local);
 document.querySelector('#market-nav').classList.toggle('hidden',!local);
 document.querySelector('.avatar').classList.toggle('hidden',!local);
 document.querySelector('#school-entry-banner').classList.toggle('hidden',!schoolEntry);
 document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
 window.scrollTo({top:0,behavior:'smooth'});
}
function route(){const path=location.hash.replace(/^#/,'')||'/';if(path==='/cranford')showView('jobs');else if(path==='/schools/cranford-high')showView('jobs',true);else showView('platform')}
function enterCranford(){location.hash='/cranford'}
document.querySelector('#location-form').addEventListener('submit',e=>{e.preventDefault();const v=document.querySelector('#town-search').value.trim().toLowerCase();if(v.includes('cranford')||v.replace(/\s/g,'')==='07016')enterCranford();else toast('Cranford, NJ is the available prototype location.')});
document.querySelector('[data-cranford]').addEventListener('click',enterCranford);
document.querySelector('[data-home]').addEventListener('click',()=>location.hash='/');
document.querySelector('[data-normal-town]').addEventListener('click',enterCranford);
document.querySelectorAll('[data-register]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#profile-modal').showModal()));
document.querySelector('.profile-close').addEventListener('click',()=>document.querySelector('#profile-modal').close());
document.querySelector('#profile-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#profile-modal').close();toast('Profile saved. School remains optional.')});
document.querySelector('[data-enter-employer]').addEventListener('click',()=>{enterCranford();setTimeout(()=>showView('employer'),0)});
document.querySelector('[data-audience-chooser]').addEventListener('click',()=>document.querySelector('#audience-modal').showModal());
document.querySelector('.audience-close').addEventListener('click',()=>document.querySelector('#audience-modal').close());
document.querySelector('[data-audience-student]').addEventListener('click',()=>{document.querySelector('#audience-modal').close();document.querySelector('#profile-modal').showModal()});
document.querySelector('[data-audience-employer]').addEventListener('click',()=>{document.querySelector('#audience-modal').close();enterCranford();setTimeout(()=>showView('employer'),0)});
window.addEventListener('hashchange',route);

renderJobs();route();
