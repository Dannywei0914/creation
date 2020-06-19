import jquery from "jquery";

window.$ = window.jQuery = jquery;



$(document).ready(function() {
  var img1 = $('#img1');
  var img2 = $('#img2');
  var icon = $('#icon');
  console.log($('.body'))


  window.setInterval(() => {
    img1.toggleClass('sliders-option_show');
    img2.toggleClass('sliders-option_show');
  }, 5000);

  $('#icon').click(function () {
    window.scrollTo({
      top: $('.body').get(0).offsetTop,
      behavior: 'smooth',
    })  })
})