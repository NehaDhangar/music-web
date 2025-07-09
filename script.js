const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const current = document.getElementById('current');
const duration = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

let songs = [
  {
    name: "amaran.mp3",
    title: "amaran",
    artist: "Amaran"
  },
  {
    name: "Jaane tu.mp3",
    title: "Jaane tu",
    artist: "Arijit Singh"
  },
  {
    name: "fir kabhi.mp3",
    title: "fir kabhi",
    artist: "Arijit Singh"
  },
  {
    name: "izajat.mp3",
    title: "Izajat",
    artist: "Nehal"
  }

];

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}`;
  updatePlaylistUI();
}

function playSong() {
  audio.play();
  playPauseBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  playPauseBtn.textContent = '▶';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // autoplay

function updateProgress() {
  const { currentTime, duration: dur } = audio;
  const percent = (currentTime / dur) * 100;
  progress.style.width = percent + '%';
  current.textContent = formatTime(currentTime);
  duration.textContent = formatTime(dur);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const dur = audio.duration;
  audio.currentTime = (clickX / width) * dur;
}

function changeVolume(vol) {
  audio.volume = vol;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Build playlist
function updatePlaylistUI() {
  playlistEl.innerHTML = '';
  songs.forEach((s, idx) => {
    const li = document.createElement('li');
    li.textContent = `${s.title} - ${s.artist}`;
    if (idx === songIndex) li.classList.add('active');
    li.onclick = () => {
      songIndex = idx;
      loadSong(songs[songIndex]);
      playSong();
    };
    playlistEl.appendChild(li);
  });
}

// Initial load
loadSong(songs[songIndex]);
