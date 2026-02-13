const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const qScreen = document.getElementById('question-screen');
const sScreen = document.getElementById('success-screen');
const speechBubble = document.getElementById('speech-bubble');
const card = document.querySelector('.card');
const bossHp = document.getElementById('boss-hp');
const bossBar = document.querySelector('.boss-bar');

const maxHp = 5;
let hp = maxHp;

function spawnSparkles() {
    const rect = noBtn.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';

        const x = rect.left - cardRect.left + rect.width / 2 + (Math.random() * 16 - 8);
        const y = rect.top - cardRect.top + rect.height / 2 + (Math.random() * 16 - 8);

        s.style.left = `${x}px`;
        s.style.top  = `${y}px`;

        // losowa długość animacji, żeby wyglądało naturalnie
        const duration = 0.5 + Math.random() * 0.5; // 0.5s do 1s
        s.style.animationDuration = `${duration}s`;

        card.appendChild(s);

        // usuń po animacji
        setTimeout(() => s.remove(), duration * 1000);
    }
}

let noClicks = 0;
// Usuniete polskie znaki z tekstow
const messages = [
    "Nie tak szybko! 🏃‍♂️", 
    "Pudlo! 🎮", 
    "Ciagle probujesz? 😏", 
    "Zlap mnie! ✨", 
    "O nie! 😅"
];

function moveButton() {
    noClicks++;

    if (noClicks === 1) {
        noBtn.classList.add('angry');
        bossBar.style.display = 'block';
    }

    damageBoss();

    if (noClicks > 1) {
        spawnSparkles();
    }

    if (noClicks < maxHp) {

        const padding = 25;

        const maxX = card.clientWidth - noBtn.offsetWidth - padding;
        const maxY = card.clientHeight - noBtn.offsetHeight - padding;

        const x = Math.max(padding, Math.floor(Math.random() * maxX));
        const y = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.margin = '0';

        showSpeechBubble();

    } else {

        noBtn.classList.add('fade-out');

        setTimeout(() => {
            noBtn.style.display = 'none';
            speechBubble.style.display = 'none';

            bossBar.style.display = 'none';

        }, 400);
    }
}

function showSpeechBubble() {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    speechBubble.innerText = randomMsg;
    speechBubble.style.display = 'block';

    const rect = noBtn.getBoundingClientRect();
    
    speechBubble.style.left = `${rect.left + rect.width / 2}px`;
    speechBubble.style.top = `${rect.top - 45}px`;
    speechBubble.style.transform = 'translateX(-50%)';

    setTimeout(() => {
        speechBubble.style.display = 'none';
    }, 1000);
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

yesBtn.addEventListener('click', () => {
    qScreen.classList.add('hidden');
    sScreen.classList.remove('hidden');
    speechBubble.style.display = 'none';
    noBtn.style.display = 'none';
    spawnHearts();
});

function spawnHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.style.position = 'fixed';
            h.style.top = '-20px';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.width = '24px';
            h.style.height = '24px';
            h.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23ff4d6d' d='M1 2h1v-1h2v1h1v-1h2v1h1v2h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1z'/%3E%3C/svg%3E\")";
            h.style.backgroundSize = 'contain';
            h.style.zIndex = '9999';
            const duration = Math.random() * 2 + 2;
            h.style.animation = `fall ${duration}s linear forwards`;
            document.body.appendChild(h);
            setTimeout(() => h.remove(), duration * 1000);
        }, i * 100);
    }
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fall { to { transform: translateY(110vh) rotate(360deg); } }`;
document.head.appendChild(styleSheet);

function damageBoss(){
    hp--;

    if(hp < 0) hp = 0;

    bossHp.style.width = (hp / maxHp * 100) + "%";
}
