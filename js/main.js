jQuery(function ($) {
  $('.bxslider').bxSlider({
    mode: 'fade',
    captions: true,
    // slideWidth: 600,
    slideSelector: '.reviews__item',
  });
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

// $(document).ready(function (e) {
//   $("#order__form").on('submit', (function (e) {
//     e.preventDefault();
//     $('#form-preloader').show();
//     var valid;
//     valid = validateContact();
//     if (valid) {
//       $.ajax({
//         url: "php/feedback.php",
//         type: "POST",
//         // dataType: 'json',
//         data: new FormData(this),
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: function (data) {
//           $("#mail-status").html(data);
//           $('#form-preloader').hide();
//         },
//         error: function () {
//           alert('Не удалось отправить сообщение');
//         }
//
//       });
//     }
//   }));

jQuery(function ($) {
  $(function (e) {
    $("#order__form").on('submit', (function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $("#mail-status").hide();
        $('#form-preloader').show();
        $.ajax({
          url: "php/feedback.php",
          type: "POST",
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function (response) {
            $("#mail-status").fadeIn('fast');
            $("#form-preloader").hide();
            if (response.type == "error") {
              // $('.order__form-btn').show();
              $("#mail-status").attr("class", "mail-status__error");
            } else if (response.type == "done") {
              // $('.order__form-btn').hide();
              $("#mail-status").attr("class", "mail-status__success");
            }
            $("#mail-status").html(response.text);
          },
          error: function () {
          }
        });
      })
    );
  });
});

jQuery(function ($) {
  $('a[href="#hash-footer"]').click(function () {
    $("#hash-footer").effect("highlight", 1000);
  });
});

jQuery.datetimepicker.setLocale('ru');
jQuery('#datetimepicker').datetimepicker({
  dayOfWeekStart: 1,
  startDate:'+1971/05/01',
  value:true,
  formatDate:'Y/m/d',
  format:'d/m/Y H:i',
  minDate:'-1970/01/01',
  maxDate:'+1970/01/09',
  allowTimes:[
    '10:00', '13:00', '15:00',
    '16:00', '17:05', '17:20', '19:00'
  ]
});
