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
// Luk mobilmenuen automatisk, når et menupunkt klikkes.
// Selve navigationen sker nu via almindelige <a href>-links.
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', closeNav);
  });
});
