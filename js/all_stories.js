$(function ($) {

  var storyTags = $('.storyTags'), sampleTags = ['Выздоровление', 'Везение', 'Судьба', 'Интересующиеся', 'Надежда', 'Восстановление'];

  $(window).stellar({
    hideDistantElements: false
  });

  $('.tagToggleBtn').on('click', function () {
    $(this).toggleClass('_opened');

    $('.tagToggleBlock').slideToggle(600);

    storyTags.removeClass('tags_active');

    return false;
  });

  body_var
    .delegate('.tagLink', 'click', function () {
      var tag = $(this);

      if (tag.hasClass('_selected')) {
        storyTags.tagit('removeTagByLabel', tag.text());
      } else {
        storyTags.tagit('createTag', tag.text());
      }

      storyTags.removeClass('tags_active');

      return false;
    })
    .delegate('.filterLink', 'click', function () {
      var link = $(this);

      link.parent().addClass('_active').siblings().removeClass('_active');

      return false;
    });

  storyTags
    .on('click', function () {
      $(this).addClass('tags_active');
    })
    .tagit({
      availableTags: sampleTags,
      showAutocompleteOnFocus: true,
      autocomplete: {
        appendTo: storyTags.parent()
      },
      placeholderText: 'Начните вводить названия тегов',
      onTagAdded: function (q, w) {
        updateTags($(w).text(), true);
      },
      onTagRemoved: function (q, w) {
        updateTags($(w).text(), false);
      }
    });

  doc.click(function (e) {
    if ($(e.target).parents().filter('.story_search_form').length != 1) {
      storyTags.removeClass('tags_active');
    }
  });

});

function updateTags(txt, add) {

  $('.tagToggleBlock .tagLink').each(function (ind) {
    var tag = $(this);

    if (tag.text() == txt) {
      tag.toggleClass('_selected', add);
    }

  });

}
