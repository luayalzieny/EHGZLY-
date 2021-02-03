$("body").niceScroll();
// //////////////////////////////////
$('#Home').vegas({
  overlay: true,
  transition: 'fade', 
  transitionDuration: 4000,
  delay: 12000,
  cover:true,
  color: '#000',
  animation: 'random',
  animationDuration: 20000,
  slides: [
    { src: 'Public/Images/Background/Background 1.jpg' },
    { src: 'Public/Images/Background/Background 2.jpg' },
    { src: 'Public/Images/Background/Background 3.jpg' },
    { src: 'Public/Images/Background/Background 4.jpg' }
  ]
});
// ////////////////////////////////////////////////////


(function ($)
    { "use strict"
    
    /* 1. Proloder */
        $(window).on('load', function () {
          $('#preloader-active').delay(450).fadeOut('slow');
          $('body').delay(850).css({
            'overflow': 'visible'
          });
        });
    
    /* 2. sticky And Scroll UP */
        $(window).on('scroll', function () {
          var scroll = $(window).scrollTop();
          if (scroll < 100) {
            $("#ftco-navbar").removeClass("sticky-bar");
            $('#back-top').fadeOut(500);
          } else {
            $("#ftco-navbar").addClass("sticky-bar");
            $('#back-top').fadeIn(500);
          }
        });
    
      // Scroll Up
        $('#back-top a').on("click", function () {
          $('body,html').animate({
            scrollTop: 0
          }, 800);
          return false;
        });
    

    })(jQuery);