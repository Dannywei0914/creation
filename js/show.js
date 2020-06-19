import $ from './jquery-3.5.1.min';

$(document).ready(function() {
  var img1 = $('#img1');
  var img2 = $('#img2');
  var icon = $('#icon');

  window.setInterval(() => {
    img1.toggleClass('sliders-option_show');
    img2.toggleClass('sliders-option_show');
  }, 5000);
})