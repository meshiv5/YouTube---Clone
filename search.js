async function search(){
  document.querySelector('.video-container').innerHTML = `<div class="hr"></div>`;
  let query = document.querySelector('.query').value || localStorage.getItem('query');
  document.querySelector('.query').value = query;
  document.title = `(353) ${query} - YouTube`;
  if(event){
    event.preventDefault();
  }
  try{
    // const API_KEY = 'AIzaSyAIKpVgXIrhmWyThxs3ZIcf4Q9NjLY-0Jg';
    const API_KEY = 'AIzaSyBlTC_xZOsZfXomHxDvj9picW3H3XTiKAw';
    const request = await fetch(`https://youtube.googleapis.com/youtube/v3/search?type=video&maxResults=20&part=snippet&q=${query}&key=${API_KEY}`);
    const response = await request.json();
    let {items} = response;
    console.log(items);
    items.forEach(element => {
      let videoDiv = document.createElement('div');
      videoDiv.classList.add('video');
      videoDiv.addEventListener("click", () => {
        localStorage.setItem("vidId", JSON.stringify(element.id.videoId));
        location.href = "video.html";
      });
      let thumbnailDiv = document.createElement('div');
      thumbnailDiv.classList.add('thumbnail');
      let thumnailImg = document.createElement('img');
      thumnailImg.setAttribute('src',element.snippet.thumbnails.high.url);
      let durationSpan = document.createElement('span');
      durationSpan.classList.add('timer');
      durationSpan.innerText = '3:45';
      thumbnailDiv.append(thumnailImg);


      let metaDiv = document.createElement('div');
      metaDiv.classList.add('metadata');

      let videoTitle = document.createElement('p');
      videoTitle.classList.add('video-title');
      videoTitle.innerText = element.snippet.title;
      let views = document.createElement('p');
      views.classList.add('views');
      let time = 12 - element.snippet.publishTime.split("-")[1];
      if (time < 1) {
        time = "2 Weeks ago";
      } else if (time > 1 && time < 3) {
        time = `${time} Years ago`;
      } else {
        time = `${time} Months ago`;
      }
      views.innerHTML = `${Math.floor(
        Math.random() * 10
      )}M views <span class="dot">·</span> ${time}`;

      let channelDiv = document.createElement('div');
      channelDiv.classList.add('channel-name');
      let channelLogo = document.createElement('img');
      channelLogo.setAttribute('src','https://yt3.ggpht.com/ytc/AMLnZu9MhPBL3N1wCHUzuxoDih1GThHBetcbDpkvAg7k9_4=s68-c-k-c0x00ffffff-no-rj');
      let channelName = document.createElement('p');
      channelName.innerText = element.snippet.channelTitle;
      channelName.style.display = 'inline';
      let svgTick = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 14px; height: 100%;"><g class="style-scope yt-icon"><path d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M9.8,17.3l-4.2-4.1L7,11.8l2.8,2.7L17,7.4 l1.4,1.4L9.8,17.3z" class="style-scope yt-icon"></path></g></svg>`;
      channelDiv.append(channelLogo,channelName);
      channelDiv.insertAdjacentHTML('beforeend',svgTick)

      let description = document.createElement('p');
      description.classList.add('desc')
      description.innerText = element.snippet.description;
      let subtitle = `<p class="subtitle">Subtitles</p>`;
      description.insertAdjacentHTML('beforeend',subtitle);
      metaDiv.append(videoTitle,views,channelDiv,description);

      videoDiv.append(thumbnailDiv,metaDiv);
      document.querySelector('.video-container').append(videoDiv);
    });
  }catch(e){
    console.log(e);
  }
  
  
}
search();



document.querySelector('.yt-logo').addEventListener('click',function(){
  window.location.href = 'index.html';
})