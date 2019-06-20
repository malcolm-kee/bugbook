$(function() {
  $.ajax('https://bugbook-server.herokuapp.com/bugs').done(function(bugs) {
    setTimeout(function() {
      $.each(bugs, function(_, bug) {
        $('#bugs-container').append(`
        <article class="card">
        <div class="card-title">${bug.status}</div>
        <div class="card-content">
        <p>${bug.title}</p>
        <i>Reported by ${bug.reportedBy}</i>
        </div>
        </article>`);
      });

      $('#bugs-container .spinner').hide();
    }, 1000);
  });
});
