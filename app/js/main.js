jQuery(function ($) {
  $('.bxslider').bxSlider({
    mode: 'fade',
    captions: true,
    // slideWidth: 600,
    slideSelector: '.reviews__item',
  });
});
jQuery(function ($) {
  var bx = $(".bxslider");
  if (bx.parentsUntil().is(".bx-wrapper")) {
    bx.unwrap();
  }
});
