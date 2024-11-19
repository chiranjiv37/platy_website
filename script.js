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
    videoSrc: "assets/videos/video.mp4", // Update with your actual video path
    audioTracks: {
      original: "assets/audios/english_audio.mp3", // Update with your actual audio path
      dub: "assets/audios/spanish_audio.wav", // Update with your actual audio path
    },
    flags: {
      original: "assets/img/us-flag.png", // Update with your actual flag imgae
      dub: "assets/img/spanish-flag.png",
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
          <!-- Video Element -->
          <video id="video-${videoData.id}" class="demo-video" src="${videoData.videoSrc}" muted></video>

          <!-- Audio Tracks -->
          <audio
            id="original-audio-${videoData.id}"
            src="${videoData.audioTracks.original}"
          ></audio>
          <audio
            id="dub-audio-${videoData.id}"
            src="${videoData.audioTracks.dub}"
          ></audio>

          <!-- Language Toggle Buttons -->
          <div class="switch-language-button-container">
            <button
              class="flag-img-container"
              id="original-audio-button-${videoData.id}"
              onclick="switchLanguage('original')"
            >
              <img
                width="100%"
                src="${videoData.flags.original}" 
                alt="flag-icon"
              />
            </button>
            <!-- greater than sign -->
            <svg
              class="greater-than-sign"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="m6 12 4-4-4-4"
              ></path>
            </svg>
            <button
              class="flag-img-container"
              id="dub-audio-button-${videoData.id}"
              onclick="switchLanguage('dub')"
            >
              <img
                width="100%"
                src="${videoData.flags.dub}"
              />
            </button>
            <button class="play-pause-button" id="play-pause-button-${videoData.id}" >
              <div id="play-sign-${videoData.id}" class="play-sign">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M17 10 5.75 16.928V3.072z"
                  ></path>
                </svg>
              </div>
              <div id="pause-sign-${videoData.id}" class="pause-sign">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M4 3h4v14H4zM12 3h4v14h-4z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        `;

    // Add the container to main container
    mainContainer.appendChild(videoContainer);

    // Initialize video functionality
    const video = document.getElementById(`video-${videoData.id}`);
    const originalAudio = document.getElementById(
      `original-audio-${videoData.id}`
    );
    const dubAudio = document.getElementById(`dub-audio-${videoData.id}`);
    const originalAudioPlayButton = document.getElementById(
      `original-audio-button-${videoData.id}`
    );
    const dubAudioPlayButton = document.getElementById(
      `dub-audio-button-${videoData.id}`
    );
    const playButton = document.getElementById(`play-sign-${videoData.id}`);
    const pauseButton = document.getElementById(`pause-sign-${videoData.id}`);
    const playPauseButton = document.getElementById(
      `play-pause-button-${videoData.id}`
    );

    // let currentAudio = originalAudio;
    const currentAudioRef = { audio: originalAudio };

    // Add event listeners
    // video.addEventListener("click", () =>
    //   playPauseVideo(video, currentAudio, playPauseButton)
    // );
    playPauseButton.addEventListener("click", () =>
      playPauseDemoVideo(
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      )
    );
    originalAudioPlayButton.addEventListener("click", () => {
      switchLanguage(
        "original",
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      );
    });
    dubAudioPlayButton.addEventListener("click", () => {
      switchLanguage(
        "dub",
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      );
    });
  });
});

function changePlayPauseSign(
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  if (video.paused) {
    playButton.style.display = "block";
    pauseButton.style.display = "none";

    dubAudioPlayButton.classList.remove("active-flag");
    originalAudioPlayButton.classList.remove("active-flag");
  } else {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    if (currentAudioRef.audio === originalAudio) {
      originalAudioPlayButton.classList.add("active-flag");
      dubAudioPlayButton.classList.remove("active-flag");
    } else if (currentAudioRef.audio === dubAudio) {
      dubAudioPlayButton.classList.add("active-flag");
      originalAudioPlayButton.classList.remove("active-flag");
    }
  }
}

function playPauseDemoVideo(
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudioRef.audio.play();
  } else {
    video.pause();
    currentAudioRef.audio.pause();
  }
  changePlayPauseSign(
    video,
    currentAudioRef,
    playButton,
    pauseButton,
    dubAudioPlayButton,
    originalAudioPlayButton,
    originalAudio,
    dubAudio
  );
}

function switchLanguage(
  language,
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  // Pause the current audio
  currentAudioRef.audio.pause();

  // Set the current audio based on the selected language
  if (language === "original") {
    currentAudioRef.audio = originalAudio;
  } else if (language === "dub") {
    currentAudioRef.audio = dubAudio;
  }

  // Sync audio with video and play if video is playing
  currentAudioRef.audio.currentTime = video.currentTime;

  // Check if video is paused
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudioRef.audio.play(); // Start playing the selected audio
  } else {
    currentAudioRef.audio.play(); // Continue playing the selected audio if video is already playing
  }
  changePlayPauseSign(
    video,
    currentAudioRef,
    playButton,
    pauseButton,
    dubAudioPlayButton,
    originalAudioPlayButton,
    originalAudio,
    dubAudio
  );
}

// submit button in contact page
document
  .querySelector(".touch-button")
  .addEventListener("click", async function () {
    const name = document
      .querySelector('.contact-inputField[placeholder="Your Name"]')
      .value.trim();
    const email = document
      .querySelector('.contact-inputField[placeholder="Your Email"]')
      .value.trim();
    const message = document.querySelector(".form-textArea").value.trim();
    const timestamp = new Date().toLocaleString();

    if (!name || !email || !message) {
      alert("Please fill out all fields before submitting!");
      return;
    }

    const data = { timestamp, name, email, message };

    try {
      const response = await fetch("/save-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Details saved successfully!");
        // Reset the form
        document.querySelector(
          '.contact-inputField[placeholder="Your Name"]'
        ).value = "";
        document.querySelector(
          '.contact-inputField[placeholder="Your Email"]'
        ).value = "";
        document.querySelector(".form-textArea").value = "";
      } else {
        alert("Failed to save details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });

updateGradient();
