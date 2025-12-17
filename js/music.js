// js/music.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuração da Música ---
    const audio = document.getElementById('bg-music');
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('overlay');
    const audioBtn = document.getElementById('audio-control'); // Referência ao botão flutuante

    // Defina os tempos em SEGUNDOS
    const START_TIME = 329; 
    const END_TIME = 386; 

    // --- Lógica de Loop Manual ---
    if (END_TIME) {
        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= END_TIME) {
                audio.currentTime = START_TIME;
                audio.play();
            }
        });
    } else {
        audio.loop = true;
    }

    // --- Iniciar ao Clicar (Overlay) ---
    startBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        audio.currentTime = START_TIME;
        audio.play().catch(error => console.log("Erro autolay:", error));
    });

    // --- CORREÇÃO: Parar música ao sair da aba/minimizar ---
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Se o usuário minimizou ou trocou de aba -> PAUSA
            audio.pause();
        } else {
            // Se o usuário voltou...
            // Só dá play se o overlay JÁ ESTIVER ESCONDIDO (ou seja, se ele já tinha clicado em começar)
            // E se o usuário não tiver mutado manualmente pelo botão flutuante (opcional)
            if (overlay.classList.contains('hidden')) {
                audio.play();
            }
        }
    });
});