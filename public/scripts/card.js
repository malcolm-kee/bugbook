$(document).ready(function() {
  function appendCard(card) {
    $('.load-more-btn').before(`
    <article class="card">
      <div class="card-title">
        <a href="${card.author.src}">${card.author.name}</a>
      </div>
      <div class="card-content">
      ${card.post.text}
      </div>
      ${
        card.post.image
          ? `<div class="card-image-container"><img class="card-image" src="${card.post.image.src}" alt="${card.post.image.alt}" /></div>`
          : ''
      }
      <div class="card-actions">
          <button type="button" class="button">
          Like
          </button>
      </div>
    </article>
    `);
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
        cards.forEach(appendCard);
        $('.spinner').hide();

        if (cards.length >= postPageLimit) {
          currentPage++;
          $('.load-more-btn').show();
        }
      });
    };
  })();

  getPosts();

  $('.card-actions .button').on('click', function() {
    $('.card-actions .button').toggleClass('button-liked');
  });

  $('#like-all-btn').on('click', function() {
    $('.card-actions .button').addClass('button-liked');
  });

  $('.load-more-btn').on('click', function(e) {
    e.preventDefault();
    getPosts();
  });
});
