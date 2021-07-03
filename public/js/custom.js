
// /////////////////////////////////////////
window.addEventListener("scroll" , function () {
        
  var navbar =  document.querySelector("nav");
  navbar.classList.toggle("sticky",window.scrollY >50);
})
// /////////////////////////////////////////////////////////////
$('.book_date').datepicker({
  'format': 'm/d/yyyy',
  'autoclose': true
});
$('.book_time').timepicker();


(function ($)
  { "use strict"
  
  /* 1. Preloder */
      $(window).on('load', function () {
        $('#preloader-active').delay(1050).fadeOut('slow');
        $('body').delay(850).css({
          'overflow': 'visible'
        });
      });
  
 
     

  	
  
  })(jQuery);
  

  
  $(function () {
    $('#datetimepicker2').datetimepicker({
        locale: 'ru'
    });
});



var theMaxHeight = 0;
$('.order-step').each(function () {
  
  if ($(this).height() > theMaxHeight) {
    theMaxHeight = $(this).height();
  }

});
$('.order-step ').height(theMaxHeight);

// /////////////////////////////////////////////
// /////////////////////////////////////////////
// /////////////////////////////////////////////
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// /////////////////////////////////////////////
// /////////////////////////////////////////////
// /////////////////////////////////////////////


    AOS.init({
            duration: 3000,
            once: true,
          });





































































