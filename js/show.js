import $ from "jquery";
import "slick-carousel";
import "particles.js";

$(document).ready(function() {
  var img1 = $('#img1');
  var img2 = $('#img2');

  $('.regular').slick({
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4
  });

  setTimeout(() => {
    // $('.start').hide();
  }, 2000);

  window.setInterval(() => {
    img1.toggleClass('sliders-option_show');
    img2.toggleClass('sliders-option_show');
  }, 5000);

  $('#icon').click(function () {
    window.scrollTo({
      top: $('.body').get(0).offsetTop,
      behavior: 'smooth',
    })  
  })

  $('#about').click(function () {
    window.scrollTo({
      top: $('.body').get(0).offsetTop,
      behavior: 'smooth',
    })  
  })

  $('#skills').click(function () {
    window.scrollTo({
      top: $('#event').get(0).offsetTop + $('.fullscreen').get(0).offsetHeight,
      behavior: 'smooth',
    })  
  })

  window.addEventListener('scroll', function() {
    if (window.scrollY !== 0) {
      $('.nav').addClass('nav_bgcolor')
    } else {
      $('.nav').removeClass('nav_bgcolor')
    }

    if (window.scrollY > ($('.sliders').get(0).offsetHeight) / 2) {
      $('.about').addClass('about_show')
    } else {
      $('.about').removeClass('about_show')
    }

    if (window.scrollY > ($('.body').get(0).offsetTop) + ($('.about').get(0).offsetHeight / 2)) {
      $('.experience').addClass('experience_show')
    } else {
      $('.experience').removeClass('experience_show')
    }
  })
  
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 250,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
})