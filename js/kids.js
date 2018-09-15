var slider_timer;

$(function ($) {

  initArticleSlider();

});

function initArticleSlider(articleSliders) {

  if (articleSliders == void 0) {
    articleSliders = $('.articleSlider');
  }

  articleSliders.each(function (ind) {
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
      appendDots: sld.parent().find('.articleBullets'),
      nextArrow: sld.parent().find('.articleControls').find('.helpNext'),
      prevArrow: sld.parent().find('.articleControls').find('.helpPrev'),
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: "unslick"
        }

        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  });
}


$(window).resize(function () {

  clearTimeout(slider_timer);

  slider_timer = setTimeout(function () {

    if (wnd.width() > 768) {
      $('.articleSlider').filter(function () {
        return $(this).hasClass('slick-initialized');
      }).slick('unslick');
    } else {
      initArticleSlider($('.articleSlider').filter(function () {
        return !$(this).hasClass('slick-initialized');
      }));
    }

  }, 1);
  
});
