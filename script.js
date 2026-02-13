const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');

let noClickCount = 0;

// Funkcja przesuwania przycisku NIE
noBtn.addEventListener('mouseover', () => {
    if (noClickCount < 3) {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
});

// Obsługa kliknięć w NIE
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    if (noClickCount >= 3) {
        noBtn.classList.add('fade-out');
        setTimeout(() => {
            noBtn.style.display = 'none';
        }, 500);
    }
});

// Obsługa kliknięcia w TAK
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    
    // Opcjonalnie: dodaj efekt konfetti w konsoli lub na ekranie
    createHearts();
});

//Spadające serduszka w tle po kliknięciu TAK
function createHearts() {
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-20px';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
        document.body.appendChild(heart);
    }
}

// Styl animacji spadania dodany dynamicznie
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        to { transform: translateY(110vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);