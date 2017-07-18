$(function ($) {

  $('.heroSlider').slick({
    infinite: true,
    speed: 1000,
    autoplaySpeed: 7000,
    autoplay: true,
    fade: true,
    dots: false,
    arrows: false,
    cssEase: 'linear',
    zIndex: 0,
    initialSlide: 0,
    //centerPadding: '0',
    slide: '.heroSlider .slide',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 10
  });

  $('.helpSlider').slick({
    infinite: true,
    speed: 500,
    autoplaySpeed: 7000,
    autoplay: false,
    dots: false,
    arrows: true,
    cssEase: 'linear',
    zIndex: 0,
    initialSlide: 0,
    //centerPadding: '0',
    slide: '.helpSlider .slide',
    nextArrow: '.helpNext',
    prevArrow: '.helpPrev',
    slidesToShow: 3,
    slidesToScroll: 1,
    touchThreshold: 10
  });

});

$(window).on('scroll', function () {

  var scrollT = doc.scrollTop(), winH = wnd.height(), rates = $('.philRate');

  $('.counterVal').each(function (ind) {
    var counter = $(this);

    if (!counter.hasClass('_done') && counter.offset().top < (scrollT + winH * .75)) {
      counter.addClass('_done');
      startCounter(counter);
    }
  });

  if ($('.philRate').first().offset().top < (scrollT + winH * .75)) {
    $('.philRate').each(function (ind) {
      var rate = $(this);

      rate.css('height', rate.attr('data-target') + 'px');
    });
  }
});

function startCounter(counter) {
  var target = 1 * counter.attr('data-counter'), val = 1 * (counter.text().replace(/\D/g, ''));

  if ((val + 1) <= target) {
    setTimeout(function () {
      counter.text(formatPrice(val + 1));
      startCounter(counter);
    }, counter.attr('data-speed') * 1 || 100);
  }
}
