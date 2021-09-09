$(document).ready(() => {
  const $tweet = $('#tweet-text');
  
  $('#tweet-text').on('keyup', function(event) {
    const $remainChar = $('#chars-counter');
    let $charInput = $(this); // #tweet-text DOM element is the source of our event.
    let textLength  = $charInput.val().length;
    let diff = 140 - textLength;

    if (diff < 0 ) {
      $($remainChar).html(diff).addClass('off-limit-counter');
    } else {
      $($remainChar).html(diff).removeClass('off-limit-counter');
    }
  })
})