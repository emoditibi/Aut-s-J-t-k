document.addEventListener('DOMContentLoaded', function() {

    let jatekos = document.querySelector('#jatekos');
    let animationDuration = 2000; 
    let interval = setInterval(Gyorsitas, 6000); 

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
  

  function Gyorsitas() {
    animationDuration -= 150; 
    road.style.animationDuration = animationDuration + 'ms'; 
    console.log(Gyorsitas)
}
});
