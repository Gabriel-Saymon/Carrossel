// js/music.js

// --- Configuração da Música ---
const YOUTUBE_VIDEO_ID = 'uuZE_IRwLNI'; // Justin Timberlake - Mirrors
const START_SECONDS = 329; // Início em 5:29
const END_SECONDS = 386;   // Fim em 6:26

// --- Variáveis Globais do Módulo ---
let player;
let loopInterval;
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');

/**
 * Função global chamada pela API do YouTube quando estiver pronta.
 * Não renomeie esta função.
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            'autoplay': 0, // Autoplay desativado por padrão
            'controls': 0, // Sem controles
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

/**
 * Função chamada quando o player do YouTube está pronto.
 * @param {object} event - Evento da API do YouTube.
 */
function onPlayerReady(event) {
    // O player está pronto, mas aguardando interação do usuário.
    startBtn.disabled = false;
    startBtn.textContent = 'Começar';
}

/**
 * Inicia o loop da música e monitora o tempo.
 */
function startMusicLoop() {
    if (!player || typeof player.playVideo !== 'function') {
        console.error('Player do YouTube não está pronto.');
        return;
    }

    // Inicia a música no ponto definido
    player.seekTo(START_SECONDS, true);
    player.playVideo();

    // Limpa qualquer intervalo anterior para evitar múltiplos loops
    if (loopInterval) {
        clearInterval(loopInterval);
    }

    // Cria um timer para verificar o tempo e fazer o loop manualmente
    loopInterval = setInterval(() => {
        if (player.getCurrentTime() >= END_SECONDS) {
            player.seekTo(START_SECONDS, true);
        }
    }, 500); // Verifica a cada meio segundo
}

/**
 * Adiciona o evento de clique ao botão "Começar".
 */
startBtn.addEventListener('click', () => {
    // Esconde o overlay com uma transição suave
    overlay.classList.add('hidden');

    // Inicia a música
    startMusicLoop();
});