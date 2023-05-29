document.addEventListener('DOMContentLoaded', function() {
  let jatekos = document.querySelector('#jatekos');
  let akadaly = document.querySelector('#akadaly');
  let pont = 0;
  let akadalytop = 0;

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
    akadalytop = parseInt(window.getComputedStyle(akadaly).getPropertyValue('top'));
  });

   checkHalal = setInterval(function() {
    pont++;
    let jatekosBal = parseInt(window.getComputedStyle(jatekos).getPropertyValue('left'));
    let akadalyBal = parseInt(window.getComputedStyle(akadaly).getPropertyValue('left'));
    akadalytop = parseInt(window.getComputedStyle(akadaly).getPropertyValue('top'))

    document.querySelector('#pont').innerHTML = 'pont: ' + pont;
    if (jatekosBal == akadalyBal && akadalytop >= 400) {
      pont -= 10;
    }
    
  }, 100);
});
