$(function ($) {

  $('.articleSlider').each(function (ind) {
    var sld = $(this);

    sld.slick({
      infinite: true,
      speed: 500,
      autoplaySpeed: 7000,
      autoplay: false,
      dots: true,
      arrows: true,
      mobileFirst: true,
      cssEase: 'linear',
      zIndex: 0,
      initialSlide: 0,
      //centerPadding: '0',
      slide: '.articleSlider .article_img',
      appendDots: sld.nextAll('.articleBullets'),
      nextArrow: sld.nextAll('.articleControls').find('.helpNext'),
      prevArrow: sld.nextAll('.articleControls').find('.helpPrev'),
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }

        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });


  });

});
