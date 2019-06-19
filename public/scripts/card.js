$(document).ready(function() {
  $('.card-actions .button').on('click', function() {
    $('.card-actions .button').toggleClass('button-liked');
  });

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

  $('.load-more-btn').on('click', function(e) {
    e.preventDefault();

    $.ajax('/data/posts.json').done(function(cards) {
      setTimeout(() => {
        cards.forEach(appendCard);
      }, 1000);
    });
  });
});
