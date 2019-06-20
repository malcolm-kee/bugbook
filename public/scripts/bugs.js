$(function() {
  $.ajax('https://bugbook-server.herokuapp.com/bugs').done(function(bugs) {
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
  });
});
