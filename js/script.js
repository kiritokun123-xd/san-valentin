const screens = document.querySelectorAll(".screen");
const backBtn = document.getElementById("backBtn");
const music = document.getElementById("bgMusic");
let currentScreen = 0;

/* Activar música en primer clic */
document.body.addEventListener("click", () => {
    music.volume = 1.0;
    music.play();
}, { once: true });

function showScreen(index) {
    screens[currentScreen].classList.remove("active");
    currentScreen = index;
    screens[currentScreen].classList.add("active");
    backBtn.classList.toggle("hidden", currentScreen === 0);
}

/* Navegación */
document.getElementById("screen1").addEventListener("click", () => showScreen(1));
document.getElementById("yesBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    showScreen(2);
});
document.getElementById("screen3").addEventListener("click", () => showScreen(3));

backBtn.addEventListener("click", () => {
    if (currentScreen > 0) showScreen(currentScreen - 1);
});

/* BOTÓN NO IMPOSIBLE */
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * (window.innerWidth/4) + "px";
    noBtn.style.top = Math.random() * (window.innerHeight/4) + "px";
});

/* ===== PARTÍCULAS ===== */

function createParticles(canvasId, emoji, count) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 1 + 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.font = p.size + "px Arial";
            ctx.fillText(emoji, p.x, p.y);
            p.y -= p.speed;
            if (p.y < -20) p.y = canvas.height;
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== CARRUSEL AUTOMÁTICO ===== */

const images = document.querySelectorAll(".carousel-img");
let currentImage = 0;

function startCarousel() {
    setInterval(() => {
        images[currentImage].classList.remove("active");
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add("active");
    }, 4000); // cada 4 segundos
}

/* Iniciar carrusel cuando llegamos a pantalla 4 */
const screen4 = document.getElementById("screen4");

const observer = new MutationObserver(() => {
    if (screen4.classList.contains("active")) {
        startCarousel();
    }
});

observer.observe(screen4, { attributes: true });


/* Corazones pantalla 1 */
createParticles("heartsCanvas", "💖", 30);

/* Explosión amor pantalla 3 */
createParticles("loveExplosion", "💕", 40);

/* Nieve pantalla 4 */
createParticles("snowCanvas", "❄️", 50);

/* Estrellas pantalla 2 */
createParticles("starsCanvas", "✨", 30);

