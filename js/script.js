$(document).ready(function(){
  var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'comster404'];
  channels.forEach(function(val, i){
    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + val + '?callback=?', function(channel) {
      if (channel.status === 404){
        $('#channels').append('<div id="' + val + '"><img src="img/404.png" alt="' + val + 'Not found"><span>' + val + '</span></div>');
        $('#' + val).append('<span class="404">Channel not found</span>')
      } else {
        $('#channels').append('<div id="' + val + '"><a href="' + channel.url + '" target="_blank"><img src="' + channel.logo + '" alt="' + val + ' channel logo">' + val + '</a></div>');
        $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + val + '?callback=?', function(stream){
          (stream.stream) ? $('#' + val).append('<span class="game">' + stream.stream.channel.status + '</span>') : $('#' + val).append('<span class="status">Offline</span>');
        });
      }
      $('#' + val).css('order', i);
    });
  });
  $('li a').click(function(){
    $('li a').css('text-decoration', 'none');
    $(this).css('text-decoration', 'underline');
    if ($(this).text() === "All") {
      $('.game, .status, .404').parent().show();
    } else if ($(this).text() === "Online") {
      $('.game').parent().show();
      $('.status, .404').parent().hide();
    } else {
      $('.game, .404').parent().hide();
      $('.status').parent().show();
    }
  });
  $('li a:not(.selected)').mouseover(function(){
    $(this).css('text-decoration', 'underline');
  });
  $('li a:not(.selected)').mouseout(function(){
    $(this).css('text-decoration', 'none');
  });
});
