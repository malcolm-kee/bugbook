$(document).ready(function() {
  function appendPost(post) {
    $('.load-more-btn')
      .before(
        `
    <article class="card post">
      <div class="card-title">
        <a href="${post.author.src}">${post.author.name}</a>
        <button class="focus-btn" type="button">...</a>
      </div>
      <div class="card-content">${post.post.text &&
        post.post.text.replace(/\n|\r|\r\n/, '<br />')}</div>
      ${
        post.post.image
          ? `<div class="card-image-container"><img class="card-image" src="${post.post.image.src}" alt="${post.post.image.alt}" /></div>`
          : ''
      }
      <div class="card-actions">
          <button type="button" class="button">Like</button>
      </div>
    </article>
    `
      )
      .prev()
      .data('post', post);
  }

  function focusPost(post) {
    $('#focusPost')
      .show()
      .find('.post-content').html(`
    <div>
      <a href="${post.author.src}">${post.author.name}</a>
    </div>
    <div class="card-content">${post.post.text}</div>
    ${
      post.post.image
        ? `<div class="card-image-container"><img class="modal-image" src="${post.post.image.src}" alt="${post.post.image.alt}" /></div>`
        : ''
    }
      `);

    $('body').addClass('modal-open');
  }

  function closeModal() {
    $('#focusPost').hide();
    $('body').removeClass('modal-open');
  }

  var getPosts = (function() {
    var currentPage = 1;
    var postPageLimit = 3;

    return function getPostsCall() {
      $('.load-more-btn').hide();
      $('.spinner').show();

      $.get(
        'https://bugbook-server.herokuapp.com/posts?_page=' +
          currentPage +
          '&_limit=' +
          postPageLimit
      ).done(function(cards) {
        cards.forEach(appendPost);
        $('.spinner').hide();

        if (cards.length >= postPageLimit) {
          currentPage++;
          $('.load-more-btn').show();
        }

        $('.card-actions .button').on('click', function() {
          $(this).toggleClass('button-liked');
        });
      });
    };
  })();

  getPosts();

  $('#like-all-btn').on('click', function() {
    $('.card-actions .button').addClass('button-liked');
  });

  $('.load-more-btn').on('click', function(e) {
    e.preventDefault();
    getPosts();
  });

  $('.feed').on('click', '.focus-btn', function() {
    var $post = $(this).closest('.post');
    focusPost($post.data('post'));
  });

  $('#focusPost .close').on('click', closeModal);
});
