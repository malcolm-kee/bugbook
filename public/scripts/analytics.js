$(function() {
  function sendAnalytics(cb) {
    // this is a mock service, assume it is making ajax call
    setTimeout(cb, 1000);
  }

  $('.button').on('click', function() {
    var $btn = $(this);
    var className = $btn.prop('class');
    $btn.addClass('button-loading');

    sendAnalytics(function() {
      $btn.prop('class', className);
    });
  });
});
