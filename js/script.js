const musicList = [
  {
    id: 0,
    img: "/images/faded.png",
    name: "Faded",
    artist: "Alan Walker",
    song: "music/Antoon - Hallo.mp3",
  },
  
  {
    id: 1,
    img: "/images/stay.png",
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    song: "music/stay.mp3",
  },
  {
    id: 2,
    img: "/images/fallingdown.jpg",
    name: "Falling Down",
    artist: "Wid Cards",
    song: "music/fallingdown.mp3",
  },
  {
    id: 3,
    img: "/images/faded.png",
    name: "Rather Be",
    artist: "Clean Bandit",
    song: "music/Rather Be.mp3",
  },
  {
    id: 4,
    img: "/images/faded.png",
    name: "Hallo",
    artist: "Antoon",
    song: "music/Antoon - Hallo.mp3",
  },
];

var audio = document.getElementById("myAudio");
var playPauseBtn = document.getElementById("playPauseBtn");
var slider = document.getElementById("slider");
var volumeSlider = document.getElementById("volumeSlider");
var changeClick = document.querySelector(".change-click");

let sound = "";
let isPlaying = false;
let durationTime = 0;
let currentTime = 0;
let musicDuration = 0;
let currentDuration = 0;
let nowPlaying;
let isRpeat = false;
let isRandom = false;
let isPlayingIndex = 0;

musicList.forEach((music) => {
  document.querySelectorAll(".ul").forEach((ul) => {
    ul.innerHTML += `
    <li class="li" data-key=${music.id}>
      <h3 class="song" id="musicName" data-key=${music.id}>${music.name}</h3>
      <p id="singerName" data-key=${music.id}>${music.artist}</p>
      <audio id="myAudio" src="">${music.song}</audio>
      <button class="li-button-play" id="playPauseBtn" data-key=${music.id}>
        <i class="fa-solid fa-play"></i>
      </button>
    </li>`;
  });
});

const duration = (duration) => {
  musicDuration = duration;

  if (duration < 10) {
    durationTime = "00:" + "0" + parseInt(duration);
  } else if (duration > 10 && duration < 60) {
    durationTime = "00:" + parseInt(duration);
  } else if (duration > 60) {
    if (duration % 60 < 10) {
      durationTime =
        "0" +
        String(duration / 60).split(".")[0] +
        ":" +
        "0" +
        parseInt(duration % 60);
    } else {
      durationTime =
        "0" +
        String(duration / 60).split(".")[0] +
        ":" +
        parseInt(duration % 60);
    }
  }

  music_time.innerHTML = durationTime;
};
let myInterval;
const timer = () => {
  clearInterval(myInterval);

  myInterval = setInterval(() => {
    if (isPlaying) {
      currentTime += 1;
      slider.setAttribute("max", parseInt(musicDuration));
      slider.value = currentTime;
      musicEnd();
      slider.addEventListener("change", (e) => {
        sound.currentTime = e.target.value;
        parseInt(currentTime);
        currentTime = +e.target.value;
        if (currentTime === parseInt(musicDuration)) {
          console.log(isRpeat);
          if (isRpeat) {
            currentTime = 0;
            slider.value = 0;
            sound.currentTime = 0;
            playPauseBtn.classList.remove("fa-pause");
            playPauseBtn.classList.add("fa-play");
          } else {
            clearInterval(myInterval);
          }
        }
      });

      if (currentTime < 10) {
        currentDuration = "00:" + "0" + parseInt(currentTime);
      } else if (currentTime > 10 && currentTime < 60) {
        currentDuration = "00:" + parseInt(currentTime);
      } else if (currentTime > 60) {
        if (currentTime % 60 < 10) {
          currentDuration =
            "0" +
            String(currentTime / 60).split(".")[0] +
            ":" +
            "0" +
            parseInt(currentTime % 60);
        } else {
          currentDuration =
            "0" +
            String(currentTime / 60).split(".")[0] +
            ":" +
            parseInt(currentTime % 60);
        }
      }

      start_music.innerHTML = currentDuration;
      if (currentTime === parseInt(musicDuration)) {
        console.log(isRpeat);
        if (isRpeat) {
          currentTime = 0;
          slider.value = 0;
          sound.currentTime = 0;
          playPauseBtn.classList.remove("fa-play");
          playPauseBtn.classList.add("fa-pause");
        } else {
          clearInterval(myInterval);
        }
      }
    } else {
      clearInterval(myInterval);
    }
  }, 1000);
};
//////////////////////////

const playMusic = (sound) => {
  if (sound.paused === true) {
    sound.play();
    isPlaying = true;
  } else if (audio.paused !== true) {
    sound.pause();
    isPlaying = false;
  }
};

const setMusicVolume = () => {
  volumeSlider.addEventListener("change", (e) => {
    sound.volume = e.target.value / 10;
  });
};

const loadMusic = (musicIndex) => {
  player_musicName.innerHTML = musicList[musicIndex].name;
  player_singerName.innerHTML = musicList[musicIndex].artist;
  player_musicImage.src = musicList[musicIndex].img;
  sound = new Audio(musicList[musicIndex].song);

  durationTime = 0;
  currentTime = 0;

  sound.volume = volumeSlider.value / 10;

  playPauseBtn.classList.remove("fa-play");
  playPauseBtn.classList.add("fa-pause");

  playMusic(sound);
  setMusicVolume();

  sound.onloadedmetadata = function () {
    duration(sound.duration);
    timer();
  };
};

const getActiveMusic = (e) => {
  document.querySelectorAll(".li").forEach((li) => {
    li.classList.remove("active");
    if (+li.dataset.key === e) li.classList.add("active");
  });
};

const musicEnd = (e) => {
  if (currentTime === parseInt(musicDuration)) {
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
  }
};

const musics = document.querySelectorAll(".li");
musics.forEach((music, index) => {
  music.addEventListener("click", (e) => {
    sound ? sound.pause() : null;
    loadMusic(index);
    nowPlaying = index;
    e.preventDefault();
    getActiveMusic(+e.target.dataset.key);
  });
});

nextButton.addEventListener("click", (musicIndex) => {
  sound ? sound.pause() : null;
  clearInterval(myInterval);

  if (isRandom) {
    let randomIndex = Math.floor(Math.random() * musicList.length);

    if (isPlayingIndex === randomIndex) {
      randomIndex = Math.floor(Math.random() * musicList.length);
      loadMusic(randomIndex);
      getActiveMusic(randomIndex);
      isPlayingIndex = randomIndex;
    } else {
      loadMusic(randomIndex);
      getActiveMusic(randomIndex);
      isPlayingIndex = randomIndex;
    }
  } else {
    if (nowPlaying == musicList.length - 1) {
      nowPlaying = -1;
      nowPlaying++;
      loadMusic(nowPlaying);
      getActiveMusic(nowPlaying);
    } else {
      nowPlaying++;
      loadMusic(nowPlaying);
      getActiveMusic(nowPlaying);
    }
  }
});

prevButton.addEventListener("click", (musicIndex) => {
  sound ? sound.pause() : null;
  clearInterval(myInterval);

  if (isRandom) {
    let randomIndex = Math.floor(Math.random() * musicList.length);

    if (isPlayingIndex === randomIndex) {
      randomIndex = Math.floor(Math.random() * musicList.length);
      loadMusic(randomIndex);
      getActiveMusic(randomIndex);
      isPlayingIndex = randomIndex;
    } else {
      loadMusic(randomIndex);
      getActiveMusic(randomIndex);
      isPlayingIndex = randomIndex;
    }
  } else {
    if (nowPlaying == 0) {
      nowPlaying = musicList.length;
      nowPlaying--;
      loadMusic(nowPlaying);
      getActiveMusic(nowPlaying);
    } else {
      nowPlaying--;
      loadMusic(nowPlaying);
      getActiveMusic(nowPlaying);
    }
  }
});

playPauseBtn.addEventListener("click", (e) => {
  if (sound) {
    if (e.target.classList.contains("fa-play")) {
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      if (currentTime === parseInt(musicDuration)) currentTime = 0;
      sound.play();
      isPlaying = true;
      timer();
    } else {
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      sound.pause();
      isPlaying = false;
    }
  }
});


repeatMusic.addEventListener("click", (e) => {
  isRpeat = !isRpeat;
  isRpeat
    ? e.target.classList.add("active")
    : e.target.classList.remove("active");
});

randomMusic.addEventListener("click", (e) => {
  isRandom = !isRandom;
  isRandom
    ? e.target.classList.add("active")
    : e.target.classList.remove("active");
});

bars.addEventListener("click", (e) => {
  mySidenav.classList.toggle("showList");
  document.querySelector("body").classList.toggle("overflow-hidden");
});
