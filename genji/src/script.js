const images = document.querySelectorAll('.floating-image');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close');

// 🎈 Floating image animation
function animateImages() {
  const centerZoneWidth = 600; // px
  const padding = 50;

  images.forEach(image => {
    let x, y;
    let attempts = 0;
    do {
      x = Math.random() * (window.innerWidth - padding * 2) + padding;
      y = Math.random() * (window.innerHeight - padding * 2) + padding;
      attempts++;
    } while (
      x > (window.innerWidth - centerZoneWidth) / 2 &&
      x < (window.innerWidth + centerZoneWidth) / 2 &&
      attempts < 20
    ); // Avoid placing images directly in the center text zone

    const duration = Math.random() * 5 + 5; // Random duration for movement
    image.style.setProperty('--x', `${x}px`);
    image.style.setProperty('--y', `${y}px`);
    image.style.transitionDuration = `${duration}s`;
  });
}

// 🖼️ Modal functionality
images.forEach(image => {
  image.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = image.src;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Trigger animation on load
window.onload = () => {
  animateImages();
  setInterval(animateImages, 10000); // Re-animate every 10 seconds
};

// Sleep function that returns a promise
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 🎵 Background music autoplay with fallback
window.addEventListener("DOMContentLoaded", async () => {
    const music = document.getElementById("background-music");
    try {
        await music.play();
        setTimeout(() => {
            music.muted = false; // Unmute after a short delay to ensure autoplay works
        }, 1000);
    } catch (err) {
        // Autoplay failed, likely due to browser policy. Add a click listener as fallback.
        window.addEventListener("click", () => music.play(), { once: true });
    }

    const lines = document.querySelectorAll('.intro-line'); // Select the subsequent lines
    const footer = document.querySelector('.bottom-line'); // Select the footer

    // Function to show lines with a delay
    async function showContent() {
        await sleep(3000); // Wait for 4 seconds
        
        for (let index = 0; index < lines.length; index++) {
            lines[index].classList.add('visible'); // Show subsequent lines
            await sleep(3500); // Wait for 3 seconds before showing the next line
        }
        // wait before showing footer
        await sleep(2000);
        footer.classList.add('visible');
    }

    // Call the function to show lines
    await showContent(); // Ensure this is awaited to maintain the flow
});