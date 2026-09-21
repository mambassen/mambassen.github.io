try{if(localStorage.getItem('cookies'))document.getElementById('cookie-banner').style.display='none'}catch(e){}


function toggleNav(){
  var nav=document.querySelector('.nav-links');
  var btn=document.getElementById('hamburger');
  if(!nav||!btn)return;
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeNav(){
  var nav=document.querySelector('.nav-links');
  var btn=document.getElementById('hamburger');
  if(nav)nav.classList.remove('open');
  if(btn)btn.classList.remove('open');
}
// URL mapping
var urlMap = {
  'forside':'/',
  'information':'/information',
  'tandklinikken':'/tandklinikken',
  'personale':'/personale',
  'priser':'/priser',
  'sub-hjerteorm':'/hjerteorm',
  'sub-vaccinationer':'/vaccinationer',
  'sub-forsikringer':'/forsikringer',
  'sub-neutralisering':'/neutralisering',
  'sub-hvalpepakker':'/hvalpepakker',
  'sub-tandbehandling':'/tandbehandling',
  'privatlivspolitik':'/privatlivspolitik',
  'staff-louise':'/personale/louise',
  'staff-julie':'/personale/julie',
  'staff-rebekka':'/personale/rebekka',
  'staff-anne-t':'/personale/anne',
  'staff-michaela':'/personale/michaela',
  'staff-anne-s':'/personale/anne-sofie',
  'staff-melissa':'/personale/melissa',
  'staff-susie':'/personale/susie'
};

function go(id){
  closeNav();
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
  document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.remove('active')});
  var pg=document.getElementById('pg-'+id);
  if(pg)pg.classList.add('active');
  var nl=document.getElementById('nl-'+id);
  if(nl){nl.classList.add('active');}
  else if(id.startsWith('sub-')){var el=document.getElementById('nl-information');if(el)el.classList.add('active');}
  else if(id.startsWith('staff-')){var el=document.getElementById('nl-personale');if(el)el.classList.add('active');}
  window.scrollTo({top:0,behavior:'smooth'});
  // Update URL
  var url = urlMap[id] || '/';
  history.pushState({page:id}, '', url);
  // Update page title
  var titles = {
    'forside':'Nybrovej Dyreklinik – Din Dyrlæge i Kongens Lyngby',
    'information':'Information – Nybrovej Dyreklinik',
    'tandklinikken':'Tandklinikken – Nybrovej Dyreklinik',
    'personale':'Personale – Nybrovej Dyreklinik',
    'priser':'Priser – Nybrovej Dyreklinik',
    'sub-hjerteorm':'Hjerteorm – Nybrovej Dyreklinik',
    'sub-vaccinationer':'Vaccinationer – Nybrovej Dyreklinik',
    'sub-forsikringer':'Forsikringer – Nybrovej Dyreklinik',
    'sub-neutralisering':'Neutralisering – Nybrovej Dyreklinik',
    'sub-hvalpepakker':'Hvalpepakker – Nybrovej Dyreklinik',
    'sub-tandbehandling':'Tandbehandling – Nybrovej Dyreklinik',
    'privatlivspolitik':'Privatlivspolitik – Nybrovej Dyreklinik'
  };
  if(titles[id]) document.title = titles[id];
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e){
  if(e.state && e.state.page) go(e.state.page);
});

// Handle direct URL access on page load
window.addEventListener('DOMContentLoaded', function(){
  var path = window.location.pathname;
  var reverseMap = {
    '/':'forside',
    '/information':'information',
    '/tandklinikken':'tandklinikken',
    '/personale':'personale',
    '/priser':'priser',
    '/hjerteorm':'sub-hjerteorm',
    '/vaccinationer':'sub-vaccinationer',
    '/forsikringer':'sub-forsikringer',
    '/neutralisering':'sub-neutralisering',
    '/hvalpepakker':'sub-hvalpepakker',
    '/tandbehandling':'sub-tandbehandling',
    '/privatlivspolitik':'privatlivspolitik',
    '/personale/louise':'staff-louise',
    '/personale/julie':'staff-julie',
    '/personale/rebekka':'staff-rebekka',
    '/personale/anne':'staff-anne-t',
    '/personale/michaela':'staff-michaela',
    '/personale/anne-sofie':'staff-anne-s',
    '/personale/melissa':'staff-melissa',
    '/personale/susie':'staff-susie'
  };
  var pageId = reverseMap[path];
  if(pageId && pageId !== 'forside'){
    // Show correct page without pushing to history again
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
    document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.remove('active')});
    var pg = document.getElementById('pg-'+pageId);
    if(pg) pg.classList.add('active');
    var nl = document.getElementById('nl-'+pageId);
    if(nl){nl.classList.add('active');}
    else if(pageId.startsWith('sub-')){var el=document.getElementById('nl-information');if(el)el.classList.add('active');}
    else if(pageId.startsWith('staff-')){var el=document.getElementById('nl-personale');if(el)el.classList.add('active');}
  }
});
try{if(localStorage.getItem('cookies'))document.getElementById('cookie-banner').style.display='none'}catch(e){}
