import $ from "jquery";
import "slick-carousel";

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
})