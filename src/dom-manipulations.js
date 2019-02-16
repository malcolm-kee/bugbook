import $ from 'jquery';

export const appendPost = (message, $img, containerSelector = '.feed') => {
  const $card = $(containerSelector).prepend(`
  <article class="card">
    <div class="card-title">You</div>
    <div class="card-content">
    ${message}
    </div>
    ${$img ? `<div class="card-image-container"></div>` : ''}
    <div class="card-actions">
        <button type="button" class="button">
        Like
        </button>
    </div>
  </article>
  `);

  if ($img) {
    $card
      .find('.card-image-container')
      .append($img)
      .find('img')
      .addClass('card-image');
  }
};
