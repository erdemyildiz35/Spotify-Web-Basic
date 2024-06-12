const container = document.querySelector(".container");
const image = document.querySelector("#music_image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev ");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar")
const Player = new MusicPlayer(musicList);
const volume = document.querySelector("#volume")
const Volume_Bar = document.querySelector("#volume-bar")
const ul = document.querySelector("ul")
window.addEventListener("load", () => {
    let music = Player.getMusic();
    displayMusic(music);
    displayMusicList(Player
        .musicList)
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    console.log(isMusicPlay);
    isMusicPlay ? PlayMusic() : PauseMusic();


});

prev.addEventListener("click", () => {
    prevMusic();

});

next.addEventListener("click", () => {
    NextMusic();


});

function PauseMusic() {
    container.classList.add("playing");
    play.classList = ("fa-solid fa-play");
    audio.pause();
}

function PlayMusic() {
    container.classList.remove("playing");
    play.classList = ("fa-solid fa-pause");
    audio.play();
}

function prevMusic() {
    Player.previus();
    let music = Player.getMusic();
    displayMusic(music);
    PlayMusic();

}

function NextMusic() {

    Player.next();
    let music = Player.getMusic();
    displayMusic(music);
    PlayMusic();
}
const calculateTime = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const SecondLeft = Math.floor(seconds % 60);
    const UploadedSec = seconds < 10 ? `0${SecondLeft}` : `${SecondLeft}`;
    const Result = `${minute}:${UploadedSec}`;
    return Result;
}

audio.addEventListener("loadedmetadata", () => {
    console.log(audio.duration);
    duration.textContent = calculateTime(
        audio.duration
    );
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let MuteState = "Non_Muted";
Volume_Bar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        MuteState = "Muted"
        volume.classList = "fa-solid fa-volume-xmark";
        Volume_Bar.value = 0;
    } else {
        audio.muted = false;
        MuteState = "Non_Muted"
        volume.classList = "fa-solid fa-volume-high";

    }
});
volume.addEventListener("click", () => {
    if (MuteState === "Non_Muted") {
        audio.muted = true;
        MuteState = "Muted"
        volume.classList = "fa-solid fa-volume-xmark";
        Volume_Bar.value = 0;

    } else {
        audio.muted = false;
        MuteState = "Non_Muted"
        volume.classList = "fa-solid fa-volume-high";
        Volume_Bar.value = 100;
    }

});
const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
    `;
        ul.insertAdjacentHTML("beforeend", liTag);
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}