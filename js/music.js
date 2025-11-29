// js/music.js (Versão Local - MP3)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuração da Música ---
    const audio = document.getElementById('bg-music');
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('overlay');

    // Defina os tempos em SEGUNDOS
    // Se você cortou o MP3 para ter SÓ o trecho, coloque START_TIME = 0 e END_TIME = null
    const START_TIME = 329; // 5:29
    const END_TIME = 386;   // 6:26

    // --- Lógica de Loop Manual ---
    // (Só é usada se você estiver usando a música completa e quiser tocar um trecho específico)
    if (END_TIME) {
        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= END_TIME) {
                audio.currentTime = START_TIME;
                audio.play();
            }
        });
    } else {
        // Se a música já estiver cortada, usa o loop nativo que é mais suave
        audio.loop = true;
    }

    // --- Iniciar ao Clicar ---
    startBtn.addEventListener('click', () => {
        // 1. Esconde o overlay
        overlay.classList.add('hidden');

        // 2. Prepara o áudio
        audio.currentTime = START_TIME;
        
        // 3. Tenta tocar (Navegadores bloqueiam áudio sem interação, por isso está no click)
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Áudio começou com sucesso
                console.log("Música tocando!");
            })
            .catch(error => {
                console.error("Erro ao tentar tocar:", error);
                // Fallback: Se der erro, tenta tocar mudo e aumentar o volume depois
                // (Raro de acontecer dentro de um evento de click)
            });
        }
    });

});