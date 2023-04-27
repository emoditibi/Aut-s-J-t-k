document.addEventListener('DOMContentLoaded', function() {
  let jatekos = document.querySelector('#jatekos');
  let akadaly = document.querySelector('#akadaly');
  let animationDuration = 4000; 
  let interval = setInterval(Gyorsitas, 10000); 
  pont = 0;
  document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
      lepesBalra();
    }
    if (e.key == 'ArrowRight') {
      lepesJobbra();
    }
  });

  function lepesBalra() {
      jatekos = document.querySelector('#jatekos')
      BalPos = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'))
      BalPos -= 100;
      if (BalPos >= 0) {
          console.log(jatekos)
          jatekos.style.left = BalPos + 'px';
      }
  }
  function lepesJobbra() {
      jatekos = document.querySelector('#jatekos')
      JobbPos = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'))
      JobbPos += 100;
      if (JobbPos < 300) {

          jatekos.style.left = JobbPos + 'px';
      }
  }
  document.addEventListener('animationiteration', function() {
  randomNumber = Math.floor(Math.random() * 3) * 100;
  akadaly.style.left = randomNumber + 'px';
})
function Gyorsitas() {
  animationDuration -= 150; 
  road.style.animationDuration = animationDuration + 'ms'; 
  console.log(road.style.animationDuration)}  


     checkHalal = setInterval(function() {
         pont++;
         jatekosBal = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'))
         akadalyBal = parseInt(window.getComputedStyle(akadaly).getPropertyValue('left'))
         akadalytop = parseInt(window.getComputedStyle(akadaly).getPropertyValue('top'))
         document.querySelector('#pont').innerHTML = 'pont: ' + pont
         if (jatekosBal == akadalyBal && akadalytop >= 600) {
             alert('A játéknak vége, pontjaid: ' + pont)
             akadaly.style.animation = 'none';
             road.style.animation = 'none';
             akadaly.style.top = akadalytop + 'px'
             console.log(akadalytop)
             clearTimeout(checkHalal)
         }
     }, 100)
})
  
