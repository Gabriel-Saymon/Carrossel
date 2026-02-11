// js/music.js - Versão Lista Retangular Simples

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SUA PLAYLIST ---
    const PLAYLIST = [
        {
            id: 'music1',
            title: "Mirrors", // Título que aparece
            artist: "Justin Timberlake", // Artista
            cover: "assets/capa1.jpeg", // Imagem da capa (pode baixar do Google)
            file: "media/music1.mp3", // O arquivo de áudio original
            startTime: 329, // Se quiser começar num ponto específico
            endTime: 386 // null = vai até o fim
        },
        {
            id: 'music2',
            title: "Caneta e Papel",
            artist: "Os Arrais",
            cover: "assets/capa2.jpeg",
            file: "media/music2.mp3", 
            startTime: 1,  
            endTime: null     
        },
        {
            id: 'track3',
            title: "Silencioso",
            artist: "Sem música de fundo",
            cover: "", 
            file: null, 
            startTime: 0,
            endTime: null
        }
    ];

    const audioPlayer = document.getElementById('bg-music');
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('overlay');
    const container = document.querySelector('.music-list-vertical');
    const audioBtn = document.getElementById('audio-control'); // Pegamos a referência aqui
    
    let selectedTrack = PLAYLIST[0]; 

    // 1. RENDERIZAR A LISTA
    PLAYLIST.forEach(track => {
        const item = document.createElement('div');
        item.className = 'music-card-row';
        
        if (track === selectedTrack) item.classList.add('selected');
        
        const imgHtml = track.cover 
            ? `<img src="${track.cover}" class="music-cover-small" alt="Capa">`
            : `<div class="music-cover-small" style="background:#333; display:flex; align-items:center; justify-content:center; color:#fff;">🎵</div>`;

        item.innerHTML = `
            ${imgHtml}
            <div class="music-info-row">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
            </div>
            ${track === selectedTrack ? '<span></span>' : ''} 
        `;

        item.addEventListener('click', () => {
            document.querySelectorAll('.music-card-row').forEach(i => {
                i.classList.remove('selected');
                const check = i.querySelector('span');
                if(check) check.remove();
            });
            
            item.classList.add('selected');
            if(!item.querySelector('span')) {
                //item.insertAdjacentHTML('beforeend', '<span>✔</span>');
            }
            selectedTrack = track;
        });

        container.appendChild(item);
    });

    // 2. BOTÃO INICIAR
    startBtn.addEventListener('click', () => {
        overlay.classList.add('hidden'); 

        // --- AQUI ESTÁ A MÁGICA: MOSTRAR O BOTÃO DE SOM ---
        if (audioBtn) {
            audioBtn.style.display = 'flex'; // Torna o botão visível
            // Pequena animação de entrada (opcional)
            audioBtn.style.animation = 'fadeIn 1s ease'; 
        }

        if (selectedTrack && selectedTrack.file) {
            audioPlayer.src = selectedTrack.file;
            audioPlayer.currentTime = selectedTrack.startTime || 0;
            
            if (selectedTrack.endTime) {
                audioPlayer.loop = false; 
                audioPlayer.ontimeupdate = () => {
                    if (audioPlayer.currentTime >= selectedTrack.endTime) {
                        audioPlayer.currentTime = selectedTrack.startTime || 0;
                        audioPlayer.play();
                    }
                };
            } else {
                audioPlayer.loop = true; 
                audioPlayer.ontimeupdate = null; 
            }

            audioPlayer.play().catch(e => console.log("Erro play:", e));
        } else {
            // Se escolheu "Silencioso"
            audioPlayer.pause();
            if(audioBtn) {
                audioBtn.textContent = '🔇';
                audioBtn.style.opacity = '0.7';
            }
        }
    });

    // Controle de aba
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            audioPlayer.pause();
        } else {
            if (overlay.classList.contains('hidden') && selectedTrack && selectedTrack.file && !audioPlayer.muted) {
                audioPlayer.play();
            }
        }
    });
});