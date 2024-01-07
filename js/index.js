// Color Panel Toggle
$(function () {
  $('.color-panel').on("click", function (e) {
      e.preventDefault();
      $('.color-changer').toggleClass('color-changer-active');
  });

  $('.colors a').on("click", function (e) {
      e.preventDefault();
      var attr = $(this).attr("title");
      console.log(attr);
      // Append dynamic stylesheet link based on selected color
      $('head').append('<link rel="stylesheet" href="css/' + attr + '.css">');
  });
});

// Text Rotation Animation
class TxtRotate {
  constructor(el, toRotate, period) {
      this.el = el;
      this.toRotate = JSON.parse(toRotate);
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.loopNum = 0;
      this.tick();
      this.isDeleting = false;
  }

  tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      const that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
      }

      setTimeout(function () {
          that.tick();
      }, delta);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize text rotation for elements with class 'txt-rotate'
  const elements = document.getElementsByClassName('txt-rotate');
  for (const el of elements) {
      const toRotate = el.getAttribute('data-rotate');
      const period = el.getAttribute('data-period');
      if (toRotate) {
          new TxtRotate(el, toRotate, period);
      }
  }

  // Inject CSS for text rotation effect
  const css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
  document.body.appendChild(css);
});



const arrowUp = document.querySelector(".arrow-up");
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight /2){
        arrowUp.classList.add("visible"); 

    }else{
        arrowUp.classList.remove("visible"); 
    }
});

//Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}