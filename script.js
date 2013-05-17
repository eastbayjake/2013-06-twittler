$(document).ready(function(){
  var $timeline = $('#timeline');

  function newTweets() {
    var index = streams.home.length - 1;
    $timeline.html('');
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + '(' + jQuery.timeago(tweet.created_at) + ')');
      $tweet.appendTo($timeline);
      index -= 1;
    }
  }

  function userTweet() {
    var message = document.getElementById('usermessage').value;
    $('#usermessage').val("");
    writeTweet(message);
  }

  function postSelected(user) {
    var index = streams.users[user].length - 1;
    $("#popout").html('');
    while(index >= 0){
      var tweet = streams.users[user][index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + '(' + jQuery.timeago(tweet.created_at) + ')');
      $tweet.appendTo($("#popout"));
      index -= 1;
    }
  }
  
  setInterval(function() {newTweets()}, 500);

  $("#selectuser").on('change', function() {
    $("#popout").html('');
    var user = $('#selectuser option:selected').val();
    setInterval(function() {postSelected(user)}, 500);
  })

  $('#send').click(function() {
    userTweet();
  });
  $('#usermessage').keypress(function(e) { if (e.which === 13 && $('#usermessage').val() !== '') {
    userTweet();
  }});
});