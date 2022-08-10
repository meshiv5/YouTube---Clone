function search(){
  event.preventDefault();
  let query = document.querySelector('.query').value;
  localStorage.setItem('query',String(query));
  window.location.href = 'search.html'
}
var tag = document.createElement('script');
let videoID = JSON.parse(localStorage.getItem('vidId'));
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '490',
    width: '640',
    videoId: videoID,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerReady(event) {
  event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}



document.querySelector('.yt-logo').addEventListener('click',function(){
  window.location.href = 'index.html';
})

document.querySelector('iframe').setAttribute('src',`https://www.youtube.com/embed/${videoID}?autoplay=1&amp;mute=1`)