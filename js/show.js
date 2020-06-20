import $ from "jquery";

$(document).ready(function() {
  var img1 = $('#img1');
  var img2 = $('#img2');

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

  window.addEventListener('scroll', function() {
    if (window.scrollY !== 0) {
      $('.nav').addClass('nav_bgcolor')
    } else {
      $('.nav').removeClass('nav_bgcolor')
    }
  })
})