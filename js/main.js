/* Dri Costa · Link bio — scripts */
(function(){
  var WA='5573999659907';
  document.querySelectorAll('.wa').forEach(function(a){
    a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(a.dataset.msg||'Olá, Dri!');
    a.target='_blank';a.rel='noopener';
  });
  document.getElementById('y').textContent=new Date().getFullYear();

  // photo fallback
  document.querySelectorAll('.ph img').forEach(function(img){
    function off(){var g=img.closest('.gal a');if(g){g.remove();return}img.closest('.ph').classList.add('off')}
    if(img.complete&&img.naturalWidth===0)off();
    img.addEventListener('error',off);
  });

  // carousel
  var rail=document.getElementById('rail'),dots=document.getElementById('dots');
  var cards=rail.children;
  for(var i=0;i<cards.length;i++){dots.appendChild(document.createElement('i'))}
  function step(){return cards[0].getBoundingClientRect().width+22}
  document.querySelectorAll('.arrows button').forEach(function(b){
    b.addEventListener('click',function(){rail.scrollBy({left:step()*+b.dataset.dir,behavior:'smooth'})});
  });
  function sync(){
    var idx=Math.round(rail.scrollLeft/step());
    if(rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-4)idx=cards.length-1;
    [].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===idx)});
  }
  rail.addEventListener('scroll',function(){requestAnimationFrame(sync)},{passive:true});
  [].forEach.call(dots.children,function(d,k){d.addEventListener('click',function(){rail.scrollTo({left:step()*k,behavior:'smooth'})})});
  sync();

  // reveal
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  } else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});
})();
