var body_var,
  doc,
  wnd,
  global_window_Height,
  popupOrderItem,
  controlPanelBtn,
  popupBtn,
  $completed_orders_form;

$(function ($) {

  body_var = $('body');
  doc = $(document);
  wnd = $(window);

  if ($("#completed_orders_form").length) {
    $completed_orders_form = new dialog('#completed_orders_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '752', false, true);

    popupBtn.on('click', function () {

      $completed_orders_form.openDialog();
      return false;
    });

  }

  all_dialog_close();

});

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
