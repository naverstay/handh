$(function ($) {
  var contentSlider = $('.contentSlider');

  for (var i = 5; i > 0; i--) {

    var clone = contentSlider.clone();

    clone.addClass('sld_clone').attr('data-sld', i).insertAfter(contentSlider);

  }

  $('.contentSlider').each(function (ind) {
    var sld = $(this), is_clone = sld.hasClass('sld_clone');

    if (!is_clone) {
      sld.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if (Math.abs(nextSlide - currentSlide) == 1) {
          // right
          $('.contentSlider.sld_clone').slick('slickNext');
        }
        else {
          // left
          $('.contentSlider.sld_clone').slick('slickPrev');
        }
      });
    }

    sld.slick({
      infinite: true,
      speed: is_clone ? 1500 : 500,
      autoplaySpeed: 7000,
      //autoplay: true,
      autoplay: false,
      fade: true,
      dots: false,
      arrows: !is_clone,
      cssEase: 'linear',
      zIndex: 0,
      initialSlide: 0 + ind,
      //centerPadding: '0',
      slide: '.contentSlider .slide',
      appendArrows: '.contentSliderControls',
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 10
    });
  });

});
