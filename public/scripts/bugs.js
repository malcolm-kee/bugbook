$(function() {
  function appendBug(bug) {
    $('#bugs-container').prepend(`
    <article 
      class="card bug-item" 
      data-bugid="${bug.id}" 
      data-title="${bug.title}"
      data-status="${bug.status}"
      data-reportedby="${bug.reportedBy}"
    >
      <div class="card-title">${bug.status}</div>
      <div class="card-content">
        <p>${bug.title}</p>
        <i>Reported by ${bug.reportedBy}</i>
      </div>
    </article>`);
  }

  function updateBug(bug) {
    var $bugCard = $(`#bugs-container [data-bugid="${bug.id}"]`);
    $bugCard.data('bugid', bug.id);
    $bugCard.data('title', bug.title);
    $bugCard.data('status', bug.status);
    $bugCard.data('reportedby', bug.reportedBy);

    $bugCard.html(`
    <div class="card-title">${bug.status}</div>
    <div class="card-content">
      <p>${bug.title}</p>
      <i>Reported by ${bug.reportedBy}</i>
    </div>
    `);
  }

  function resetForm() {
    $('#bug-form').trigger('reset');
  }

  $.ajax('https://bugbook-server.herokuapp.com/bugs').done(function(bugs) {
    setTimeout(function() {
      $.each(bugs, function(_, bug) {
        appendBug(bug);
      });

      $('#bugs-container .spinner').hide();
    }, 1000);
  });

  $('#bugs-container').on('click', '.card', function() {
    var bugId = $(this).data('bugid');
    var title = $(this).data('title');
    var status = $(this).data('status');
    var reportedBy = $(this).data('reportedby');

    $('#bug-form .card-title').text('Edit Issue');
    $('#bug-form button[type="submit"]').text('Save');
    $('#bug-form #id').val(bugId);
    $('#bug-form #title').val(title);
    $('#bug-form #status').val(status);
    $('#bug-form #reportedBy').val(reportedBy);
  });

  $('#bug-form').on('reset', function() {
    $('#bug-form .card-title').text('Create Issue');
  });

  $('#bug-form').on('submit', function(ev) {
    ev.preventDefault();

    var $form = $(this);
    var data = {};

    $.each($form.serializeArray(), function(_, field) {
      data[field.name] = field.value;
    });

    if (data.id) {
      $.ajax({
        url: 'https://bugbook-server.herokuapp.com/bugs/' + data.id,
        type: 'PUT',
        data: data,
        success: function onUpdateSuccess(updatedBug) {
          updateBug(updatedBug);
          resetForm();
        }
      });
    } else {
      $.post(
        'https://bugbook-server.herokuapp.com/bugs',
        data,
        function onCreateBugSuccess(newBug) {
          appendBug(newBug);
          resetForm();
        }
      );
    }
  });
});
