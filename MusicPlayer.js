const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');

const trackArt = document.getElementById('track-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeDisplay = document.getElementById('current-time');
const durationTimeDisplay = document.getElementById('duration-time');
const playlistContainer = document.getElementById('playlist');

// 1. Song Data
const songs = [
    { title: "Neon Nights", artist: "SynthWave Kid", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400" },
    { title: "Deep Focus", artist: "Lofi Girl", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400" },
    { title: "Midnight City", artist: "Retro Vibes", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400" }
];

let songIndex = 0;
let isPlaying = false;

// 2. Load Song
function loadSong(song) {
    trackTitle.innerText = song.title;
    trackArtist.innerText = song.artist;
    trackArt.src = song.cover;
    audio.src = song.src;
}

// 3. Play/Pause Logic
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playIcon.classList.replace('fa-play', 'fa-pause');
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playIcon.classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

// 4. Progress & Time
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    // Calculate display time
    let curMins = Math.floor(currentTime / 60);
    let curSecs = Math.floor(currentTime % 60);
    if (curSecs < 10) curSecs = `0${curSecs}`;
    currentTimeDisplay.innerText = `${curMins}:${curSecs}`;

    if (duration) {
        let durMins = Math.floor(duration / 60);
        let durSecs = Math.floor(duration % 60);
        if (durSecs < 10) durSecs = `0${durSecs}`;
        durationTimeDisplay.innerText = `${durMins}:${durSecs}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (progressBar.value / 100) * duration;
}

// 5. Playlist & Autoplay
function initPlaylist() {
    playlistContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `p-3 rounded-lg cursor-pointer transition ${index === songIndex ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/5'}`;
        item.innerHTML = `<p class="font-medium">${song.title}</p><p class="text-xs opacity-50">${song.artist}</p>`;
        item.onclick = () => { songIndex = index; loadSong(songs[songIndex]); playSong(); initPlaylist(); };
        playlistContainer.appendChild(item);
    });
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => { songIndex--; if(songIndex < 0) songIndex = songs.length - 1; loadSong(songs[songIndex]); playSong(); initPlaylist(); });
nextBtn.addEventListener('click', () => { songIndex++; if(songIndex > songs.length - 1) songIndex = 0; loadSong(songs[songIndex]); playSong(); initPlaylist(); });
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => { nextBtn.click(); }); // Autoplay next
progressBar.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);

// Initial Load
loadSong(songs[songIndex]);
initPlaylist();