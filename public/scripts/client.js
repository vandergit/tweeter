// Like $(document).ready(), but lighter
$(() => {
  const loadTweets = () => {
    // Promise type call with Ajax
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((response) => {
        renderTweets(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadTweets();
  
  const renderTweets = function(tweets) {
    const $tweetContainer = $('section.tweet-container');
    $tweetContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }

    return $tweetContainer;
  };

  const createTweetElement = (tweet) => {
    // Instead of calling $().text operations, the article element is shaped by the HTML container in index.html
    const $article = `<article class="tweet" >
                      <header>
                        <div>
                          <img src=${tweet.user.avatars}>
                          <p>${tweet.user.name}</p>
                        </div>
                        <p>${tweet.user.handle}</p>
                      </header>
                      <p>
                      ${tweet.content.text}
                      </p>
                      <footer>
                        <p>${timeago.format(tweet.created_at)}</p>
                        <p class="icon-hover">
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                        </p>
                      </footer>
                    </article>`;
    return $article;
  };

  $('.tweet-form').on(('submit'), function(event) {
    const $currentTweet = $('#tweet-text').val();
    const messageIcon = `<i class="fas fa-exclamation-triangle"></i>`;

    event.preventDefault();
    
    if ($currentTweet === null || $currentTweet === '') {
      // alert('Tweet message is empty or not valid');
      $("#error-message").html(`${messageIcon} Tweet message is empty or not valid ${messageIcon}`).slideDown(500, function() {
        $(this).fadeOut(5000);
      });
      return;
    }
    
    if ($currentTweet.length > 140) {
      // alert('Tweet message longer than allowed');
      $("#error-message").html(`${messageIcon} Tweet message longer than allowed ${messageIcon}`).slideDown(500, function() {
        $(this).fadeOut(5000);
      });
      return;
    }

    const serializedData = $(this).serialize();

    $.post('/tweets', serializedData, () => {
      loadTweets();
    });
  });
});