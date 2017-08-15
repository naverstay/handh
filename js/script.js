var body_var,
  doc,
  wnd,
  send_popup,
  help_popup,
  reg_popup,
  auth_popup,
  order_popup,
  global_window_Height,
  popupOrderItem,
  controlPanelBtn,
  popupBtn,
  $completed_orders_form;

$(function ($) {

  body_var = $('body');
  doc = $(document);
  wnd = $(window);

  body_var
    .delegate('.donationAmount', 'input', function () {
      var inp = $(this), target = $(inp.attr('data-progress')), amount = 1 * (inp.val()).replace(/\D/g, '');

      if (target.length) {
        var start = target.attr('data-start') * 1, finish = target.attr('data-finish') * 1;
        target.find('.progressVal').css('width', (100 * (Math.min(finish, start + amount) / finish)) + '%');
      }

    })
    .delegate('.readMoreLink', 'click', function () {
      var read = $(this).closest('.readBlock');
      read.find('.read_more').show();
      read.find('.read_less').hide();
      return false;
    })
    .delegate('.docRmBtn', 'click', function () {
      $(this).closest('.docItem').remove();
      return false;
    })
    .delegate('.mobMenu', 'click', function () {
      body_var.toggleClass('menu_opened');
      return false;
    });

  if ($("#completed_orders_form").length) {
    $completed_orders_form = new dialog('#completed_orders_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '752', false, true);

    popupBtn.on('click', function () {

      $completed_orders_form.openDialog();
      return false;
    });
  }


  auth_popup = $('#auth_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 570,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.authBtn').on('click', function () {
    reg_popup.dialog('close');

    auth_popup.dialog('open');

    return false;
  });


  order_popup = $('#order_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 570,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.newOrderBtn').on('click', function () {
    order_popup.dialog('open');

    return false;
  });

  $('.passToggle').on('click', function () {
    var inp = $(this).toggleClass('_opened').next('input');

    if (inp.attr('type') == 'text') {
      inp.attr('type', 'password');
    } else {
      inp.attr('type', 'text');
    }

    return false;
  });

  reg_popup = $('#reg_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 570,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.regBtn').on('click', function () {
    auth_popup.dialog('close');

    reg_popup.dialog('open');

    return false;
  });


  help_popup = $('#help_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 570,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.helpChildrenBtn').on('click', function () {
    help_popup.dialog('open');

    return false;
  });

  send_popup = $('#send_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 570,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('modal_opened overlay_v2');
    },
    close: function (event, ui) {
      body_var.removeClass('modal_opened overlay_v2');
    }
  });

  $('.sendPopupBtn').on('click', function () {
    send_popup.dialog('open');

    return false;
  });

  initTabs();

  initMask();

  initSelect2();

  initValidation();

  all_dialog_close();

  initScrollBars();

});


function initScrollBars() {

  if ($('.mCSB').length) {
    $('.mCSB').mCustomScrollbar({
      documentTouchScroll: true,
      mouseWheel: {
        preventDefault: true
      },
      theme: "dark",
      scrollEasing: "linear"
    });
  }

  if ($('.mCSBh').length) {
    $('.mCSBh').mCustomScrollbar({
      axis: "x",
      documentTouchScroll: true,
      mouseWheel: {
        //preventDefault: true
      },
      theme: "dark",
      scrollEasing: "linear"
    });
  }
}

function all_dialog_close() {
  body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
  $(".ui-dialog-content").each(function () {
    var $this = $(this);
    if (!$this.parent().hasClass('always_open')) {
      $this.dialog("close");
    }
  });
}

function formatPrice(s) {
  return ('' + s).replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ')
}

function initMask(el) {

  if (el == void 0) {
    el = $("input");
  }

  el.each(function (i, el) {
    var inp = $(el), param = {};

    if (inp.attr('data-inputmask') != void 0) {
      inp.inputmask();
    }

    if (inp.attr('data-inputmask-email') != void 0) {
      param.regex = inp.attr('data-inputmask-email');
      param.placeholder = '_';

      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-regex') != void 0) {
      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-custom') != void 0) {
      inp.inputmask(JSON.parse('{' + inp.attr('data-inputmask-custom').replace(/'/g, '"') + '}'));
    }

  });
}

function initValidation() {
  $('.validateMe').each(function (ind) {
    var f = $(this);

    f.validationEngine({
      //binded: false,
      scroll: false,
      showPrompts: true,
      showArrow: false,
      addSuccessCssClassToField: 'success',
      addFailureCssClassToField: 'error',
      parentFieldClass: '.formCell',
      // parentFormClass: '.order_block',
      promptPosition: "centerRight",
      //doNotShowAllErrosOnSubmit: true,
      //focusFirstField          : false,
      autoHidePrompt: false,
      autoHideDelay: 3000,
      autoPositionUpdate: false,
      doNotValidateEmpty: true,
      prettySelect: true,
      //useSuffix                : "_VE_field",
      addPromptClass: 'relative_mode one_msg',
      showOneMessage: false
    });
  });
}

function initTabs() {

  var tabBlock = $('.tabBlock'), tabs = tabBlock.tabs({
    active: 0,
    tabContext: tabBlock.data('tab-context'),
    activate: function (e, u) {

    },
    create: function (e, u) {

    }
  });
}

function initSelect2() {

  $('.select2').each(function (ind) {
    var slct = $(this);

    slct.select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: slct.parent(),
      width: '100%'
    });
  });
}

function startCounter(counter) {
  var target = 1 * counter.attr('data-counter'), val = 1 * (counter.text().replace(/\D/g, ''));

  if ((val + 1) <= target) {
    setTimeout(function () {
      counter.text(formatPrice(Math.min(target, val + ((counter.attr('data-step') * 1) || 1))));
      startCounter(counter);
    }, counter.attr('data-speed') * 1 || 100);
  }
}

$(window).on('load', function () {

  $('.checkLoad').addClass('_loaded');

});
