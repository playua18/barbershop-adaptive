jQuery(function ($) {
  $('.bxslider').bxSlider({
    mode: 'fade',
    captions: true,
    // slideWidth: 600,
    slideSelector: '.reviews__item',
  });
});

$(document).ready(function (e){
  $("#order__form").on('submit',(function(e){
    e.preventDefault();
    $('#form-preloader').show();
    // var valid;
    // valid = validateContact();
    if(valid) {
      $.ajax({
        url: "../php/feedback.php",
        type: "POST",
        data:  new FormData(this),
        contentType: false,
        cache: false,
        processData:false,
        success: function(data){
          $("#mail-status").html(data);
          $('#form-preloader').hide();
        },
        error: function(){
          $('#form-preloader').hide();
        }

      });
    }
  }));

  // function validateContact() {
  //   var valid = true;
  //
  //   if(!$("#user-name").val()) {
  //     $("#user-name").css({'background-color':'#FFFFDF', 'border-color':'goldenrod'});
  //     valid = false;
  //   }
  //   if(!$("#user-email").val()) {
  //     $("#user-email").text("это не похоже на e-mail");
  //     $("#user-email").css({'background-color':'#FFFFDF', 'border-color':'goldenrod'});
  //     valid = false;
  //   }
  //   if(!$("#user-msg").val()) {
  //     $("#user-msg").css({'background-color':'#FFFFDF', 'border-color':'goldenrod'});
  //     valid = false;
  //   }
  //
  //   return valid;
  // }

});

  jQuery(function ($) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > $(this).height()) {
        $('.scroll-top').addClass('scroll-top--active');
      } else {
        $('.scroll-top').removeClass('scroll-top--active');
      }
    });
    $('.scroll-top').click(function () {
      $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });
  });
