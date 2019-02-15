import $ from 'jquery';

export const appendPost = (message, containerSelector = '.feed') =>
  $(containerSelector).prepend(`
  <article class="card">
    <div class="card-title">You</div>
    <div class="card-content">
    ${message}
    </div>
    <div class="card-actions">
        <button type="button" class="button">
        Like
        </button>
    </div>
  </article>
  `);
