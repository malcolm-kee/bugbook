$(function() {
  function appendBug(bug) {
    $('#bugs-container').prepend(`
    <article class="card">
    <div class="card-title">${bug.status}</div>
    <div class="card-content">
    <p>${bug.title}</p>
    <i>Reported by ${bug.reportedBy}</i>
    </div>
    </article>`);
  }

  $.ajax('https://bugbook-server.herokuapp.com/bugs').done(function(bugs) {
    setTimeout(function() {
      $.each(bugs, function(_, bug) {
        appendBug(bug);
      });

      $('#bugs-container .spinner').hide();
    }, 1000);
  });

  $('#bug-form').on('submit', function(ev) {
    ev.preventDefault();

    var data = {};

    $.each($(this).serializeArray(), function(_, e) {
      data[e.name] = e.value;
    });

    $.post('https://bugbook-server.herokuapp.com/bugs', data, function(newBug) {
      appendBug(newBug);

      $('#reportedBy').val('');
      $('#status').val('');
      $('#title').val('');
    });
  });
});
