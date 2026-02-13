const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const qScreen = document.getElementById('question-screen');
const sScreen = document.getElementById('success-screen');
const speechBubble = document.getElementById('speech-bubble');

let noClicks = 0;
const messages = [
    "Nie tak szybko! 🏃‍♂️",
    "Pudło! 🎮",
    "Ciągle próbujesz? 😏",
    "Złap mnie! ✨",
    "O nie! 😅"
];

function moveButton() {
    if (noClicks < 3) {
        const padding = 50;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const x = Math.max(padding, Math.floor(Math.random() * maxX));
        const y = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;

        showSpeechBubble();
    }
}

function showSpeechBubble() {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    speechBubble.innerText = randomMsg;
    speechBubble.style.display = 'block';
    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 1200);
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

noBtn.addEventListener('click', () => {
    noClicks++;
    if (noClicks >= 3) {
        noBtn.classList.add('fade-out');
        setTimeout(() => noBtn.style.display = 'none', 400);
    }
});

yesBtn.addEventListener('click', () => {
    qScreen.classList.add('hidden');
    sScreen.classList.remove('hidden');
    speechBubble.style.display = 'none';
    spawnHearts();
});

function spawnHearts() {
    for (let i = 0; i < 50; i++) {
        const h = document.createElement('div');
        h.style.position = 'fixed';
        h.style.top = '-20px';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.width = '24px';
        h.style.height = '24px';
        h.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23ff4d6d' d='M1 2h1v-1h2v1h1v-1h2v1h1v2h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1z'/%3E%3C/svg%3E\")";
        h.style.backgroundSize = 'contain';
        h.style.zIndex = '9999';
        h.style.animation = `fall ${Math.random() * 2 + 2}s steps(10) forwards`;
        document.body.appendChild(h);
    }
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fall { to { transform: translateY(110vh) rotate(90deg); } }`;
document.head.appendChild(styleSheet);