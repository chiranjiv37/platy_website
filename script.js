// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add gradient animation to hero section
const hero = document.querySelector(".hero");
let angle = 0;

function updateGradient() {
  angle = (angle + 1) % 360;
  hero.style.background = `linear-gradient(${angle}deg, #ff00ff, #00ffff)`;
  requestAnimationFrame(updateGradient);
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all feature and benefit cards
document.querySelectorAll(".feature-card, .benefit-card").forEach((card) => {
  observer.observe(card);
});

// Video data array
const videos = [
  {
    id: "video1",
    videoSrc: "./assets/video/demo-video.mp4", // Update with your actual video path
    audioTracks: {
      english: "./assets/audio/english.mp3", // Update with your actual audio path
      spanish: "./assets/audio/spanish.mp3", // Update with your actual audio path
    },
    flags: {
      english: "./assets/images/english-flag.png", // Update with your actual flag images
      spanish: "./assets/images/spanish-flag.png",
    },
  },
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("demo-videos");

  // Create video players
  videos.forEach((videoData) => {
    // Create container for this video
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container";
    videoContainer.id = `video-container-${videoData.id}`;

    // Set inner HTML for the video container
    videoContainer.innerHTML = `
      <video id="video-${videoData.id}" class="demo-video">
        <source src="${videoData.videoSrc}" type="video/mp4">
      </video>
      
      <div class="controls">
        <button class="play-pause-button">
          <i class="fas fa-play"></i>
        </button>
        
        <div class="language-controls">
          <button class="flag-button english-flag active-flag">
            <img src="${videoData.flags.english}" alt="English">
          </button>
          <button class="flag-button spanish-flag">
            <img src="${videoData.flags.spanish}" alt="Spanish">
          </button>
        </div>
      </div>

      <audio id="english-audio-${videoData.id}" src="${videoData.audioTracks.english}"></audio>
      <audio id="spanish-audio-${videoData.id}" src="${videoData.audioTracks.spanish}"></audio>
    `;

    // Add the container to main container
    mainContainer.appendChild(videoContainer);

    // Initialize video functionality
    const video = document.getElementById(`video-${videoData.id}`);
    const englishAudio = document.getElementById(
      `english-audio-${videoData.id}`
    );
    const spanishAudio = document.getElementById(
      `spanish-audio-${videoData.id}`
    );
    let currentAudio = englishAudio;

    // Get control elements
    const playPauseButton = videoContainer.querySelector(".play-pause-button");
    const englishButton = videoContainer.querySelector(".english-flag");
    const spanishButton = videoContainer.querySelector(".spanish-flag");

    // Add event listeners
    video.addEventListener("click", () =>
      playPauseVideo(video, currentAudio, playPauseButton)
    );
    playPauseButton.addEventListener("click", () =>
      playPauseVideo(video, currentAudio, playPauseButton)
    );
    englishButton.addEventListener("click", () =>
      switchLanguage(
        "english",
        video,
        englishAudio,
        spanishAudio,
        englishButton,
        spanishButton
      )
    );
    spanishButton.addEventListener("click", () =>
      switchLanguage(
        "spanish",
        video,
        englishAudio,
        spanishAudio,
        englishButton,
        spanishButton
      )
    );
  });
});

// Play/Pause functionality
async function playPauseVideo(video, currentAudio, playPauseButton) {
  if (video.paused) {
    try {
      await Promise.all([video.play(), currentAudio.play()]);
      changePlayPauseSign(video, playPauseButton);
    } catch (error) {
      console.error("Error playing media:", error);
    }
  } else {
    video.pause();
    currentAudio.pause();
    changePlayPauseSign(video, playPauseButton);
  }
}

// Switch language functionality
async function switchLanguage(
  language,
  video,
  englishAudio,
  spanishAudio,
  englishButton,
  spanishButton
) {
  try {
    // Pause current playback
    video.pause();
    englishAudio.pause();
    spanishAudio.pause();

    // Set current audio and update UI
    let currentAudio;
    if (language === "english") {
      currentAudio = englishAudio;
      englishButton.classList.add("active-flag");
      spanishButton.classList.remove("active-flag");
    } else {
      currentAudio = spanishAudio;
      spanishButton.classList.add("active-flag");
      englishButton.classList.remove("active-flag");
    }

    // Sync and play
    currentAudio.currentTime = video.currentTime;
    await Promise.all([video.play(), currentAudio.play()]);
  } catch (error) {
    console.error("Error during language switch:", error);
  }
}

// Update play/pause button
function changePlayPauseSign(video, playPauseButton) {
  const playPauseIcon = playPauseButton.querySelector("i");
  if (video.paused) {
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  } else {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  }
}

updateGradient();
