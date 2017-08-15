var all_pins = [],
  all_tooltips = [],
  helpSlider,
  mapProp = {
    zoom: 4,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    styles: [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#e1e8ee"}]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{"color": "#c3d2dd"}]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{"color": "#29768a"}, {"lightness": -37}]
    }, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#406d80"}]}, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{"color": "#406d80"}]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{"visibility": "on"}, {"color": "#3e606f"}, {"weight": 2}, {"gamma": 0.84}]
    }, {"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]}, {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{"weight": 0.6}, {"color": "#1a3541"}]
    }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{"color": "#2c5a71"}]
    }]
  },
  gmap;

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

  initHelpSlider();

  $('.countersSlider').slick({
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
    slide: '.countersSlider .counters_item',
    appendDots: '.countersBullets',
    nextArrow: '.countersControls .helpNext',
    prevArrow: '.countersControls .helpPrev',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
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

}).on('resize', function () {

  initHelpSlider();

});

function initHelpSlider() {

  if (wnd.width() > 767 && !$('.helpSlider').hasClass('slick-initialized')) {

    helpSlider = $('.helpSlider').slick({
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
      slidesToScroll: 3,
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
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
  } else {

  }


}

function scrollHandler() {
  var scrollT = doc.scrollTop(), winH = wnd.height(), rates = $('.philRate'), childCards = $('.childCard');

  $('.counterVal').each(function (ind) {
    var counter = $(this);

    if (!counter.hasClass('_done') && counter.offset().top < (scrollT + winH * .75)) {
      counter.addClass('_done');
      startCounter(counter);
    }
  });

  if (rates.first().offset().top < (scrollT + winH * .75)) {
    rates.each(function (ind) {
      var rate = $(this);

      rate.css('height', rate.attr('data-target') + 'px').css('width', rate.attr('data-target') + 'px');
    });
  }

  if (childCards.first().offset().top < (scrollT + winH * .75)) {
    childCards.addClass('_active');
  }
}

function loadMap() {

  var points = [
    {
      name: "Евгений Трофимченко",
      img: "i/map_phil.png",
      summ: "93 451",
      icon: "pin_green",
      currency: "руб.",
      city: "с.Кармадейск",
      pos: {lat: 55.718932, lng: 37.669550}
    },
    {
      name: "Евгений Трофимченко",
      img: "i/map_phil.png",
      summ: "83 451",
      icon: "pin_green",
      currency: "руб.",
      city: "с.Кармадейск",
      pos: {lat: 51.675731, lng: 39.205610}
    },
    {
      name: "Евгений Трофимченко",
      img: "i/map_phil.png",
      summ: "73 451",
      icon: "pin_green",
      currency: "руб.",
      city: "с.Кармадейск",
      pos: {lat: 55.874438, lng: 49.071899}
    }

  ];

  // без таймаута не работает :(

  setTimeout(function () {
    var center = new google.maps.LatLng(62.048815, 96.952428);
    //var styledMapType = new google.maps.StyledMapType(map_styles);

    gmap = new google.maps.Map(document.getElementById("fondMap"), mapProp);
    gmap.setCenter(center);

    google.maps.event.addDomListener(window, 'resize', function () {
      gmap.setCenter(center);
    });

    for (var i = 0; i < points.length; i++) {
      var obj = points[i];

      createPin(gmap, obj.name, obj.pos, obj.img, 0, i, function (mrk, ind) {
        var mrk_body = '<a href="public.html" class="pin_img"><img src="' + points[ind].img + '" alt=""></a><div class="pin_name">' + points[ind].name + '</div><div class="pin_city">' + points[ind].city + '</div><div class="pin_summ ' + points[ind].icon + '">' + points[ind].summ + ' <sub>' + points[ind].currency + '</sub></div>';

        all_pins.push({marker: mrk});

        all_tooltips.push({
          tooltip: createMarker(gmap, points[ind].name, points[ind].pos, mrk_body, mrk)
        });
      });
    }

  }, 0);
}

function createMarker(target_map, name, latlng, marker_content, marker) {

  if (!marker) {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });
  }

  var infoBubble = new InfoBubble({
    map: target_map,
    content: marker_content,
    position: new google.maps.LatLng(-332.0, 149.0),
    shadowStyle: 0,
    padding: 0,
    backgroundColor: '#fdfdfe',
    borderRadius: 0,
    arrowSize: 0,
    borderWidth: 0,
    disableAutoPan: true,
    hideCloseButton: true,
    backgroundClassName: 'transparent',
    arrowStyle: 2
  });

  //infoBubble.open(target_map, marker);


  /*  marker.info = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(20, 100),
      zIndex: null,
      boxStyle: {
        background: "none",
        width: "230px"
      },
      content: marker_content // '<IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> "My name is "' + name
    });
  */

  google.maps.event.addListener(marker, 'mouseover', function () {
    infoBubble.open(target_map, marker);
  });

  google.maps.event.addListener(marker, 'mouseout', function () {
    infoBubble.close(target_map, marker);
  });

  return infoBubble;
}

function createPin(target_map, name, latlng, icon, magic_top_offset, ind, cb) {
  var img = new Image(), marker;

  if (icon && icon.length) {
    $(img).one('load', function () {
      var image = new google.maps.MarkerImage(
        icon,
        new google.maps.Size(img.width, img.height),
        new google.maps.Point(0, 0),
        new google.maps.Point((img.width / 2).toFixed(), img.height + (magic_top_offset || 0))
      );

      marker = new google.maps.Marker({
        position: latlng,
        map: target_map,
        icon: image,
        title: name
      });

      if (typeof cb == 'function') {
        cb(marker, ind);
      } else {
        return marker;
      }
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    if (typeof cb == 'function') {
      cb(marker, ind);
    } else {
      return marker;
    }
  }
}

