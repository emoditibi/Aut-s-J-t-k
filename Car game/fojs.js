document.addEventListener('DOMContentLoaded', function() {
  let jatekos = document.querySelector('#jatekos');
  let akadaly = document.querySelector('#akadaly');
  var pont = 0;
  let akadalytop = 0;
  let penz1top = 0;
  penz1top = parseInt(window.getComputedStyle(penz1).getPropertyValue('top'))
 

  document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft') {
      lepesBalra();
    }
    if (e.key == 'ArrowRight') {
      lepesJobbra();
    }
  });

  function lepesBalra() {
    let BalPos = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'));
    BalPos -= 100;
    if (BalPos >= 0) {
      jatekos.style.left = BalPos + 'px';
    }
  }

  function lepesJobbra() {
    let JobbPos = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'));
    JobbPos += 100;
    if (JobbPos < 300) {
      jatekos.style.left = JobbPos + 'px';
    }
  }


  document.addEventListener('animationiteration', function() {
    randomNumber = Math.floor(Math.random() * 3) * 100;
    akadaly.style.left = randomNumber + 'px';

   
  });

   checkHalal = setInterval(function() {
    pont++;
    let jatekosBal = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'));
    let penz1top = parseInt(window.getComputedStyle(penz1).getPropertyValue('top'));
    let akadalyBal = parseInt(window.getComputedStyle(akadaly).getPropertyValue('left'));
    akadalytop = parseInt(window.getComputedStyle(akadaly).getPropertyValue('top'))
    document.querySelector('#pont').innerHTML = 'pont: ' + pont;
    if (jatekosBal == akadalyBal && akadalytop >= 400) {
      pont -= 10;
    }
    if (jatekosBal == 0 && penz1top >= 400) {
      pont -= 10;
    }
    else if (jatekosBal == 100 && penz1top >= 400) {
      pont += 10;
    }
    else if (jatekosBal == 200 && penz1top >= 400) {
      pont += 20;
    }
    
    
  }, 100);
});
var visszaszamDate = new Date().getTime() + 60000; // Az aktuális időponthoz hozzáadunk 1 percet (60000 milliszekundum)
var visszaszamElement = document.getElementById("visszaszamlalo");
var visszaszamInterval = setInterval(function() {
  var most = new Date().getTime();
  var tavolsag = visszaszamDate - most;
  var perc = Math.floor((tavolsag % (1000 * 60 * 60)) / (1000 * 60));
  var mp = Math.floor((tavolsag % (1000 * 60)) / 1000);
  visszaszamElement.innerHTML = perc + " perc " + mp + " másodperc ";
  if (tavolsag <= 0 ) {
    clearInterval(visszaszamInterval);
    visszaszamElement.innerHTML = "Lejárt az idő!";
    akadaly.style.animation = 'none';
    road.style.animation = 'none';
    jatekos.style.animation = 'none';
    penz1.style.animation = 'none';
    alert('Szint készen van!')

  }

}, 1000);