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

const video = document.getElementById("video");
const englishAudio = document.getElementById("englishAudio");
const spanishAudio = document.getElementById("spanishAudio");
const englishButton = document.getElementById("englishButton");
const spanishButton = document.getElementById("spanishButton");
const playButton = document.getElementById("play-sign");
const pauseButton = document.getElementById("pause-sign");

let currentAudio = englishAudio; // Default to English audio

function syncAudio() {
  currentAudio.currentTime = video.currentTime;
}

video.addEventListener("play", () => currentAudio.play());
video.addEventListener("pause", () => currentAudio.pause());
video.addEventListener("timeupdate", syncAudio);

function changePlayPauseSign() {
  if (video.paused) {
    playButton.style.display = "block";
    pauseButton.style.display = "none";

    spanishButton.classList.remove("active-flag");
    englishButton.classList.remove("active-flag");
  } else {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    if (currentAudio === englishAudio) {
      englishButton.classList.add("active-flag");
      spanishButton.classList.remove("active-flag");
    } else if (currentAudio === spanishAudio) {
      spanishButton.classList.add("active-flag");
      englishButton.classList.remove("active-flag");
    }
  }
}

function playPauseDemoVideo() {
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudio.play();
  } else {
    video.pause();
    currentAudio.pause();
  }
  changePlayPauseSign();
}

function switchLanguage(language) {
  // Pause the current audio
  currentAudio.pause();

  // Set the current audio based on the selected language
  if (language === "english") {
    currentAudio = englishAudio;
  } else if (language === "spanish") {
    currentAudio = spanishAudio;
  }

  // Sync audio with video and play if video is playing
  currentAudio.currentTime = video.currentTime;

  // Check if video is paused
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudio.play(); // Start playing the selected audio
  } else {
    currentAudio.play(); // Continue playing the selected audio if video is already playing
  }
  changePlayPauseSign();
}

updateGradient();
