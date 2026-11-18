
const pages = document.querySelectorAll(".page");
const starsContainer = document.getElementById("stars");
const sparklesContainer = document.getElementById("sparkles");

const envelope = document.getElementById("envelope");
const letterNext = document.getElementById("letterNext");
const tapHint = document.getElementById("tapHint");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

let currentPage = 1;
let musicPlaying = false;
let toastTimer;
let musicAttempted = false;


// STARS

function createStars() {
  for (let i = 0; i < 90; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    starsContainer.appendChild(star);
  }
}


// PAGE NAVIGATION

function nextPage(number) {
  const target = document.getElementById("page" + number);

  if (!target) return;

  pages.forEach(page => page.classList.remove("active"));

  target.classList.add("active");
  currentPage = number;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (number === 6) {
    launchFireworks();
    showToast("The whole kingdom celebrates you, Bubu! 💜");
  }
}


// ENVELOPE

function openLetter() {
  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");

  tapHint.textContent = "A little message, straight from the heart 💜";

  setTimeout(() => {
    letterNext.classList.remove("hidden");
  }, 1000);
}


// TOAST

function showToast(message) {
  const toast = document.getElementById("toast");

  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


// MUSIC PLAYER

async function startMusic() {
  if (!music) return;

  try {
    await music.play();

    musicPlaying = true;
    musicBtn.classList.add("playing");
    musicBtn.textContent = "♫";

    musicLabel.textContent = "Now Playing ♡";
    musicLabel.classList.add("show");

    setTimeout(() => {
      musicLabel.classList.remove("show");
    }, 2500);

  } catch (error) {
    musicPlaying = false;
    musicBtn.classList.remove("playing");

    showToast("Tap the music button to play ♫");
  }
}

function stopMusic() {
  music.pause();

  musicPlaying = false;
  musicBtn.classList.remove("playing");

  musicBtn.textContent = "♫";
  musicLabel.classList.remove("show");
}

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

// Try autoplay on opening.
window.addEventListener("load", () => {
  setTimeout(() => {
    startMusic();
  }, 500);
});

// Fallback: first interaction starts music if autoplay was blocked.
document.addEventListener("pointerdown", () => {
  if (!musicPlaying && !musicAttempted) {
    musicAttempted = true;
    startMusic();
  }
}, { once: true });

music.addEventListener("play", () => {
  musicPlaying = true;
  musicBtn.classList.add("playing");
});

music.addEventListener("pause", () => {
  musicPlaying = false;
  musicBtn.classList.remove("playing");
});

music.addEventListener("error", () => {
  showToast("Check that music.mp3 is in the website folder.");
});


// FIREWORKS

function launchFireworks() {
  const colors = [
    "#f8d98b",
    "#e9a9d2",
    "#ffffff",
    "#c7a2ff",
    "#ffcf9f"
  ];

  for (let i = 0; i < 65; i++) {
    setTimeout(() => {
      const burst = document.createElement("div");

      const color = colors[
        Math.floor(Math.random() * colors.length)
      ];

      burst.style.position = "fixed";
      burst.style.left = Math.random() * 100 + "vw";
      burst.style.top = (15 + Math.random() * 65) + "vh";
      burst.style.width = "5px";
      burst.style.height = "5px";
      burst.style.borderRadius = "50%";
      burst.style.background = color;
      burst.style.boxShadow = `0 0 12px 4px ${color}`;
      burst.style.zIndex = "30";
      burst.style.pointerEvents = "none";

      document.body.appendChild(burst);

      burst.animate([
        {
          transform: "scale(0)",
          opacity: 1
        },
        {
          transform: "scale(5)",
          opacity: 0
        }
      ], {
        duration: 900 + Math.random() * 700,
        easing: "ease-out"
      });

      setTimeout(() => burst.remove(), 1800);

    }, i * 65);
  }

  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 180);
  }
}


// FLOATING HEARTS

function createFloatingHeart() {
  const heart = document.createElement("div");

  heart.className = "floating-heart";

  heart.textContent = [
    "💜",
    "💖",
    "✨",
    "♡",
    "🌸"
  ][Math.floor(Math.random() * 5)];

  heart.style.left = Math.random() * 95 + "vw";
  heart.style.top = (65 + Math.random() * 25) + "vh";
  heart.style.fontSize = (16 + Math.random() * 20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3200);
}


// FINAL CELEBRATION

function celebrateAgain() {
  launchFireworks();

  showToast("A thousand wishes for your happiness! ✨");
}


// AMBIENT SPARKLES

function createAmbientSparkles() {
  setInterval(() => {
    const sparkle = document.createElement("div");

    sparkle.className = "floating-heart";
    sparkle.textContent = "✦";

    sparkle.style.color = "#f5d991";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = "95vh";
    sparkle.style.fontSize = "12px";

    sparklesContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3000);

  }, 900);
}


// INITIALIZE

createStars();
createAmbientSparkles();
