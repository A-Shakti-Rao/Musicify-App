async function apiData() {
  //Fetching Data From API
  const url = "https://saavn.dev/api/playlists?id=1224047750&limit=1000";
  const options = {
    method: "GET",
  };

  let response;
  let result;

  try {
    response = await fetch(url, options);
    result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  const song_cards = document.querySelector(".song-cards");

  //Function Which Adds All The Info About The Song To A Card
  function addingSongCard(id, name, artist, imgURL) {
    const songCard = document.createElement("div");
    songCard.innerHTML = `<div class="${id} w-5/6 h-3/4 relative rounded-lg max-lg:w-4/5 max-lg:h-2/3">
          <img class="w-full object-cover rounded-lg h-full" src="${imgURL}"
            alt="image">
          <img class="w-10 absolute left-2/3 top-3/4 cursor-pointer max-lg:top-[5.7rem] max-lg:left-20 max-lg:w-8"
            src="./Assests/play.svg" alt="play">
        </div>
        <div class="w-full pl-5 max-lg:pl-4">
          <div class="relative h-5 text-sm w-90% overflow-hidden">
            <h1 class="absolute whitespace-nowrap animate-scroll">
              ${name}</h1>
          </div>
          <p class="text-xs text-gray-300">${artist}</p>
        </div>`;

    songCard.classList.add(
      "cursor-pointer",
      "ease-in-out",
      "bg-box-gray-2",
      "w-48",
      "h-60",
      "rounded-lg",
      "flex",
      "gap-1",
      "flex-col",
      "justify-center",
      "items-center",
      "max-lg:w-38",
      "max-lg:h-48"
    );

    song_cards.append(songCard);
  }

  // Calling This Function For Adding All Songs In The Playlist
  for (let i = 0; i < result.data.songCount; i++) {
    addingSongCard(
      i,
      result.data.songs[i].name,
      result.data.songs[i].artists.all[0].name,
      result.data.songs[i].image[2].url
    );
  }

  // Playing The Songs Whenever User Clicks On The Card
  let currentSong = new Audio();
  let isplaying = false;
  let localStorageFilled = false;
  if (localStorageFilled == false) {
    currentSong.id = 0;
  } else {
    currentSong.id = localStorage.getItem("currentSong.id");
  }
  if (localStorageFilled == false) {
    currentSong.src = result.data.songs[0].downloadUrl[4].url;
  } else {
    currentSong.src = localStorage.getItem("currentSong");
  }
  musicPlayerUpdate();

  song_cards.childNodes.forEach((element) => {
    element.addEventListener("click", (e) => {
      currentSong.id = Number(element.childNodes[0].classList[0]);
      currentSong.src = result.data.songs[currentSong.id].downloadUrl[4].url;
      currentSong.play();
      isplaying = true;
      localStorageFilled = true;
      musicPlayerUpdate();
    });
  });

  //Function For Changes In Music PLayer
  function musicPlayerUpdate() {
    const music_player = document.querySelector(".music-player");
    const song_name = result.data.songs[currentSong.id].name;
    const artist_name = result.data.songs[currentSong.id].artists.all[0].name;
    music_player.firstElementChild.firstElementChild.innerHTML = `${song_name} - ${artist_name}`;

    if (isplaying == true) {
      document.getElementById("play_btn").src = "./Assests/playing.svg";
    } else {
      document.getElementById("play_btn").src = "./Assests/paused.svg";
    }

    //Function That Converts Seconds Into Minutes
    function convertSecondsToMinutes(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    }

    setInterval(() => {
      document.getElementById("playback_time").innerText =
        convertSecondsToMinutes(currentSong.currentTime);
      document.getElementById("duration").innerText = convertSecondsToMinutes(
        currentSong.duration
      );
    }, 1000);

    const seekbar = document.getElementById("seekbar");

    // Function to update the seekbar as the song plays
    function updateSeekbar() {
      const percentage = (currentSong.currentTime / currentSong.duration) * 100;
      seekbar.value = percentage;
    }

    // Function to seek the song to a clicked position on the seekbar
    function seekTo() {
      const newTime = (seekbar.value / 100) * currentSong.duration;
      currentSong.currentTime = newTime;
    }

    seekbar.addEventListener("input", seekTo);
    currentSong.addEventListener("timeupdate", updateSeekbar);
  }

  //Changing The Play Button When Song Stops
  currentSong.addEventListener("pause", () => {
    play_btn.src = play_btn.src.replace("playing", "paused");
    isplaying = false;
  });
  console.log(currentSong.id);
  //Changing The Play Button When Song Plays
  currentSong.addEventListener("play", () => {
    isplaying = true;
    localStorageFilled = true;
    play_btn.src = play_btn.src.replace("paused.svg", "playing.svg");

    //Storing The Current Song Into Local Storage
    localStorage.setItem("currentSong", currentSong.src);

    //Storing The ID Of The Current Song Into Local Storage
    localStorage.setItem("currentSong.id", currentSong.id);
  });

  //Event On Playing Button
  const play_btn = document.getElementById("play_btn");
  play_btn.addEventListener("click", () => {
    if (play_btn.src.search("playing.svg") >= 0) {
      currentSong.pause();
      play_btn.src = play_btn.src.replace("playing.svg", "paused.svg");
    } else {
      currentSong.play();
      play_btn.src = play_btn.src.replace("paused.svg", "playing.svg");
    }
  });

  //Event On Suffle Button
  let suffleCount = 0;
  const suffle_btn = document.getElementById("suffle_btn");
  suffle_btn.addEventListener("click", () => {
    suffleCount++;
    let checkerSuffle = bothSuffleRepeatOnError(suffleCount, repeatCount);
    if (suffleCount % 2 !== 0 && checkerSuffle === false) {
      suffle_btn.src = suffle_btn.src.replace("suffle.svg", "suffle-on.svg");
      currentSong.addEventListener("ended", () => {
        if (suffleCount % 2 !== 0 && checkerSuffle === false) {
          let randomIndex = Math.floor(Math.random() * result.data.songCount);
          currentSong.src = result.data.songs[randomIndex].downloadUrl[4].url;
          currentSong.play();
          currentSong.id = randomIndex;
          musicPlayerUpdate();
        }
      });
    } else {
      suffle_btn.src = suffle_btn.src.replace("suffle-on.svg", "suffle.svg");
    }
  });

  //Event On Repeat Button
  let repeatCount = 0;
  const repeat_btn = document.getElementById("repeat_btn");
  repeat_btn.addEventListener("click", () => {
    repeatCount++;
    let checkerRepeat = bothSuffleRepeatOnError(suffleCount, repeatCount);
    if (repeatCount % 2 !== 0 && checkerRepeat === false) {
      currentSong.loop = true;
      repeat_btn.src = repeat_btn.src.replace("repeat.svg", "repeat-once.svg");
    } else {
      currentSong.loop = false;
      repeat_btn.src = repeat_btn.src.replace("repeat-once.svg", "repeat.svg");
    }
  });

  //Error When Both Suffle And Repeat Button Are Clicked
  function bothSuffleRepeatOnError(suffleCount, repeatCount) {
    if (suffleCount % 2 !== 0 && repeatCount % 2 !== 0) {
      alert("Both Suffle and Repeat Button Can't Be Clicked At The Same Time");
      return true;
    } else {
      return false;
    }
  }

  //Function For Playing The Next Song
  function playNextSong() {
    currentSong.src =
      result.data.songs[Number(currentSong.id) + 1].downloadUrl[4].url;
    currentSong.play();
    currentSong.id = Number(currentSong.id) + 1;
    musicPlayerUpdate();
  }

  //Calling The Play NextSong Function When The Song Is Ended
  currentSong.addEventListener("ended", () => {
    if (
      suffle_btn.src.search("suffle.svg") >= 0 &&
      repeat_btn.src.search("repeat.svg") >= 0
    ) {
      playNextSong();
    }
  });

  //Event On Next Button
  const next_btn = document.getElementById("next_btn");
  next_btn.addEventListener("click", () => {
    if (suffleCount % 2 !== 0) {
      let randomIndex = Math.floor(Math.random() * result.data.songCount);
      currentSong.src = result.data.songs[randomIndex].downloadUrl[4].url;
      currentSong.play();
      currentSong.id = randomIndex;
      musicPlayerUpdate();
    } else {
      playNextSong();
    }
  });

  //Event On Previous Button
  const previous_btn = document.getElementById("previous_btn");
  previous_btn.addEventListener("click", () => {
    if (suffleCount % 2 !== 0) {
      let randomIndex = Math.floor(Math.random() * result.data.songCount);
      currentSong.src = result.data.songs[randomIndex].downloadUrl[4].url;
      currentSong.play();
      currentSong.id = randomIndex;
      musicPlayerUpdate();
    } else {
      currentSong.src =
        result.data.songs[Number(currentSong.id) - 1].downloadUrl[4].url;
      currentSong.play();
      currentSong.id = Number(currentSong.id) - 1;
      musicPlayerUpdate();
    }
  });
}

apiData();
