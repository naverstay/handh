$(function ($) {


  $('.helpSlider').slick({
    infinite: true,
    speed: 500,
    autoplaySpeed: 7000,
    autoplay: false,
    dots: false,
    arrows: true,
    mobileFirst: true,
    cssEase: 'linear',
    zIndex: 0,
    initialSlide: 0,
    //centerPadding: '0',
    slide: '.helpSlider .slide',
    nextArrow: '.helpNext',
    prevArrow: '.helpPrev',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  body_var.delegate('.helpBox', 'click', function (e) {
    var firedEl = $(this);

    if (!((e.target.tagName).toUpperCase() == 'A' || $(e.target).closest('a').length)) {
      window.location = firedEl.attr('data-href');

      return false;
    }
  });

});

$(window).on('scroll', function () {

  scrollHandler();

}).on('load', function () {

  scrollHandler();

});

function scrollHandler() {
  var scrollT = doc.scrollTop(), winH = wnd.height();

  $('.counterVal').each(function (ind) {
    var counter = $(this);

    if (!counter.hasClass('_done') && counter.offset().top < (scrollT + winH * .75)) {
      counter.addClass('_done');
      startCounter(counter);
    }
  });

}
