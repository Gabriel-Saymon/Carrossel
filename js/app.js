// js/app.js - Versão Sincronizada (Firebase)

// Importa as funções do Firebase diretamente da nuvem
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- CONFIGURAÇÃO DO FIREBASE ---
// 1. Vai à consola do Firebase > Definições do Projeto > Geral > As suas aplicações
// 2. Copia o conteúdo de "const firebaseConfig = { ... }" e COLA ABAIXO substituindo este bloco:

const firebaseConfig = {
  apiKey: "AIzaSyDeYBvzUntv1mB6Kxi9T6hz52MeWP_0DFg",
  authDomain: "nossahistoria-e51b5.firebaseapp.com",
  databaseURL: "https://nossahistoria-e51b5-default-rtdb.firebaseio.com",
  projectId: "nossahistoria-e51b5",
  storageBucket: "nossahistoria-e51b5.firebasestorage.app",
  messagingSenderId: "123554417708",
  appId: "1:123554417708:web:c200a1ad87663037e79589"
};

// Inicializa o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DADOS PESSOAIS ---
    const START_DATE = new Date('2025-04-15T00:00:00'); 
    const MEETING_DATE = new Date('2025-03-18T00:00:00');   
    const BIBLE_START_DATE = new Date('2025-05-05T00:00:00'); 
    
    const AUTOPLAY_INTERVAL_MS = 5000;
    // --- GRID FINANCEIRO (Soma total: R$ 20.000) ---
    // Distribuição: Max R$ 200. Total de 160 caixinhas.
    // Ordem fixa misturada para garantir sincronia visual entre os dispositivos.
    const FIXED_VALUES = [
        200, 50, 100, 200, 50, 150, 100, 200, 50, 100,
        200, 100, 50, 200, 150, 100, 200, 50, 100, 200,
        50, 100, 200, 50, 150, 200, 100, 50, 200, 100,
        150, 200, 50, 100, 200, 50, 100, 200, 150, 50,
        100, 200, 50, 100, 200, 50, 150, 200, 100, 50,
        200, 100, 200, 50, 100, 200, 150, 50, 100, 200,
        50, 100, 200, 50, 200, 100, 50, 150, 200, 100,
        200, 50, 100, 200, 50, 100, 200, 150, 50, 100,
        200, 50, 100, 200, 50, 200, 100, 150, 50, 200,
        100, 50, 200, 50, 100, 200, 150, 50, 100, 200,
        50, 100, 200, 50, 200, 100, 150, 50, 200, 100,
        200, 50, 100, 200, 50, 100, 200, 150, 50, 100,
        200, 50, 100, 200, 50, 200, 100, 150, 50, 200,
        100, 50, 200, 50, 100, 200, 150, 50, 100, 200,
        50, 100, 200, 50, 200, 100, 150, 50, 200, 100,
        200, 50, 100, 200, 50, 100, 200, 150, 50, 100
    ];
    // Se quiser usar a ordem fixa, use FIXED_VALUES no lugar de CHALLENGE_VALUES

    // --- SLIDES ---
    const SLIDES_DATA = [
        { src: 'assets/img-1.jpeg', alt: 'Foto 1', caption: 'Primeiro treino como namorados.' },
        { src: 'assets/img-2.jpeg', alt: 'Foto 2', caption: 'Nosso primeiro encontro.' },
        { src: 'assets/img-3.jpeg', alt: 'Foto 3', caption: 'Primeira ida na sua casa.', focus: '50% 20%'},
        { src: 'assets/img-4.jpeg', alt: 'Foto 4', caption: 'Primeira fotinha no carro.' },
        { src: 'assets/img-5.jpeg', alt: 'Foto 5', caption: 'O que dizer desse dia...' },
        { src: 'assets/img-6.jpeg', alt: 'Foto 6', caption: 'Que nem passarinhos.' },
        { src: 'assets/img-7.jpeg', alt: 'Foto 7', caption: 'Que gatos.' },
        { src: 'assets/img-9.jpeg', alt: 'Foto 9', caption: 'Que gatos pt2' },
        { src: 'assets/img-11.jpeg', alt: 'Foto 11', caption: 'Dia de princesa.', focus: '30% 10%'},
        { src: 'assets/img-12.jpeg', alt: 'Foto 12', caption: 'Sempre apoiando um ao outro.', focus: '40% 50%'},
        { src: 'assets/img-15.jpeg', alt: 'Foto 15', caption: 'Nosso jeito nerd.' },
        { src: 'assets/img-16.jpeg', alt: 'Foto 16', caption: 'Mais um dia te amando.' },
        { src: 'assets/img-17.jpeg', alt: 'Foto 17', caption: 'Treino de seis meses.' },
        { src: 'assets/img-18.jpeg', alt: 'Foto 18', caption: 'Nossa trip para BH.' },
        { src: 'assets/img-19.jpeg', alt: 'Foto 19', caption: 'Selfie de recém casados.', focus: '50% 45%'},
        { src: 'assets/img-20.jpeg', alt: 'Foto 20', caption: 'Seu primeiro aniversário juntos.', focus: '50% 20%' },
        { src: 'assets/img-21.jpeg', alt: 'Foto 21', caption: 'Meu primeiro aniversário juntos.' },
        { src: 'assets/img-22.jpeg', alt: 'Foto 22', caption: 'Primeiro Natal juntos.' },
    ];

    // --- DOM REFERENCES ---
    const slidesContainer = document.getElementById('slides');
    const captionText = document.getElementById('caption-text');
    const dateCounter = document.getElementById('date-counter');
    const meetCounter = document.getElementById('meet-counter');
    const bibleCounter = document.getElementById('bible-reading-counter');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    let currentIndex = 0;
    let autoplayInterval;
    let autoplayTimeout;
    let isPausedByUser = false;

    // --- FUNÇÕES ---
    function diffMonthsDays(startDate, endDate) {
        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        let days;
        if (endDate.getDate() >= startDate.getDate()) {
            days = endDate.getDate() - startDate.getDate();
        } else {
            months--;
            const daysInLastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
            days = (daysInLastMonth - startDate.getDate()) + endDate.getDate();
        }
        return { months: Math.max(0, months), days };
    }

    // --- CARROSSEL ---
    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const newIndex = (index + slides.length) % slides.length;
        currentIndex = newIndex;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        captionText.textContent = SLIDES_DATA[currentIndex].caption;
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoplay() {
        clearInterval(autoplayInterval);
        if (isPausedByUser) return;
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    }

    function resetAutoplay() {
        isPausedByUser = true;
        clearInterval(autoplayInterval);
        clearTimeout(autoplayTimeout);
        autoplayTimeout = setTimeout(() => {
            isPausedByUser = false;
            startAutoplay();
        }, AUTOPLAY_INTERVAL_MS * 1.5);
    }

    function createCarousel() {
        SLIDES_DATA.forEach((slideData, index) => {
            const slide = document.createElement('figure');
            slide.className = 'slide';
            const img = document.createElement('img');
            img.src = slideData.src;
            img.alt = slideData.alt;
            if (slideData.focus) img.style.objectPosition = slideData.focus;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.addEventListener('click', () => { goToSlide(index); resetAutoplay(); });
            dotsContainer.appendChild(dot);
        });
    }

    function setupSwipe() {
        let touchStartX = 0;
        slidesContainer.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        slidesContainer.addEventListener('touchend', (e) => {
            if (Math.abs(e.changedTouches[0].screenX - touchStartX) > 40) {
                if (e.changedTouches[0].screenX < touchStartX) nextSlide(); else prevSlide();
                resetAutoplay();
            }
        });
    }

    // --- TRACKER FINANCEIRO (NOVO) ---
    function initFinanceTracker() {
        const gridContainer = document.getElementById('finance-grid');
        const savedDisplay = document.getElementById('money-saved');
        const leftDisplay = document.getElementById('money-left');
        const progressBar = document.getElementById('finance-progress-bar');
        const percentDisplay = document.getElementById('finance-percent');
        
        const GOAL = 20000;
        // Referência no Firebase: finance/deposits
        const financeRef = ref(db, 'finance/deposits');
        
        // Dados locais (index: boolean)
        let paidIndices = {};

        // 1. Gera o Grid
        // Usamos FIXED_VALUES para garantir que seja igual para os dois
        const valuesList = FIXED_VALUES; 

        // 2. Ouve o Firebase
        onValue(financeRef, (snapshot) => {
            paidIndices = snapshot.val() || {};
            renderGrid();
            updateTotals();
        });

        function updateTotals() {
            let totalSaved = 0;
            // Soma apenas os índices que estão marcados como true
            Object.keys(paidIndices).forEach(index => {
                if (paidIndices[index]) {
                    totalSaved += valuesList[index];
                }
            });

            let totalLeft = GOAL - totalSaved;
            let percent = (totalSaved / GOAL) * 100;

            // Formata para moeda Real
            savedDisplay.textContent = totalSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            leftDisplay.textContent = totalLeft.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            // Atualiza barra
            progressBar.style.width = `${percent}%`;
            percentDisplay.textContent = `${percent.toFixed(1)}% Concluído`;

            // Efeito visual de completou
            if (totalSaved >= GOAL) {
                percentDisplay.textContent = "🎉 META BATIDA! PARABÉNS! 🎉";
                percentDisplay.style.color = "#2ecc71";
                percentDisplay.style.fontWeight = "bold";
            }
        }

        function renderGrid() {
            gridContainer.innerHTML = '';
            valuesList.forEach((val, index) => {
                const item = document.createElement('div');
                item.className = 'finance-item';
                
                // Marca se estiver pago
                if (paidIndices[index]) item.classList.add('paid');

                item.innerHTML = `<small>R$</small><span>${val}</span>`;

                item.addEventListener('click', () => {
                    const isPaid = !!paidIndices[index];
                    
                    // Clona o estado atual e inverte o clicado
                    const newIndices = {...paidIndices};
                    
                    if (isPaid) {
                        delete newIndices[index]; // Remove pagamento
                    } else {
                        newIndices[index] = true; // Adiciona pagamento
                    }

                    // Salva no Firebase
                    set(financeRef, newIndices);
                });

                gridContainer.appendChild(item);
            });
        }
    }

    // --- TRACKER BÍBLIA ---
    function initBibleTracker() {
        const booksCountEl = document.getElementById('books-count');
        const cyclesCountEl = document.getElementById('cycles-count');
        const TOTAL_BOOKS = 66; 

        const oldTestament = [
            "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", 
            "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester",
            "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações", 
            "Ezequiel", "Daniel", "Oseias", "Joel", "Amós", "Obadias", "Jonas", "Miqueias", "Naum", 
            "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias"
        ];
        const newTestament = [
            "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", 
            "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", 
            "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", 
            "1 João", "2 João", "3 João", "Judas", "Apocalipse"
        ];

        let savedProgress = {};
        let completionCount = 0;

        const progressRef = ref(db, 'bible/progress');
        const completionRef = ref(db, 'bible/completions');

        onValue(progressRef, (snapshot) => {
            savedProgress = snapshot.val() || {}; 
            updateStats();
            renderBooks(oldTestament, 'ot-books');
            renderBooks(newTestament, 'nt-books');
        });

        onValue(completionRef, (snapshot) => {
            completionCount = snapshot.val() || 0;
            updateStats();
        });

        function updateStats() {
            const currentCount = Object.keys(savedProgress).length;
            booksCountEl.textContent = `${currentCount} / ${TOTAL_BOOKS}`;
            cyclesCountEl.textContent = `${completionCount}`;
            
            if (currentCount === TOTAL_BOOKS) {
                setTimeout(() => {
                    handleCompletion();
                }, 500);
            }
        }

        function handleCompletion() {
            if (Object.keys(savedProgress).length > 0) {
                alert(`Parabéns! Vocês completaram a leitura de toda a Bíblia juntos! ❤️\n\nEsta foi a leitura nº ${completionCount + 1}.\n\nO progresso será reiniciado para a próxima jornada!`);
                set(completionRef, completionCount + 1);
                set(progressRef, {}); 
            }
        }

        function renderBooks(bookList, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = ''; 
            bookList.forEach(book => {
                const btn = document.createElement('div');
                btn.className = 'book-item';
                if (savedProgress[book]) btn.classList.add('read');
                btn.innerHTML = `<span>${book}</span> <span class="check-icon">✓</span>`;
                btn.addEventListener('click', () => {
                    const isRead = !!savedProgress[book];
                    const newProgress = {...savedProgress};
                    if (isRead) {
                        delete newProgress[book];
                    } else {
                        newProgress[book] = true;
                    }
                    set(progressRef, newProgress);
                });
                container.appendChild(btn);
            });
        }
        renderBooks(oldTestament, 'ot-books');
        renderBooks(newTestament, 'nt-books');
    }

    // --- INIT ---
    function init() {
        createCarousel();
        
        const updateDate = () => {
            const now = new Date();
            const diffNamoro = diffMonthsDays(START_DATE, now);
            dateCounter.textContent = `${diffNamoro.months} meses e ${diffNamoro.days} dias de nós.`;
            const diffConheceram = diffMonthsDays(MEETING_DATE, now);
            meetCounter.textContent = `${diffConheceram.months} meses e ${diffConheceram.days} dias de história.`;
            const diffBiblia = diffMonthsDays(BIBLE_START_DATE, now);
            bibleCounter.textContent = `${diffBiblia.months} meses e ${diffBiblia.days} dias de leitura da Bíblia.`;
        };
        
        updateDate(); 
        setInterval(updateDate, 1000 * 60 * 60);

        goToSlide(0);
        startAutoplay();
        setupSwipe();
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        initBibleTracker();
        initFinanceTracker(); // INICIA O NOVO TRACKER FINANCEIRO

        const audioBtn = document.getElementById('audio-control');
        const audioPlayer = document.getElementById('bg-music');
        let isMuted = false;
        if(audioBtn && audioPlayer) {
            audioBtn.addEventListener('click', () => {
                isMuted = !isMuted;
                audioPlayer.muted = isMuted;
                if(isMuted) {
                    audioBtn.textContent = '🔇';
                    audioBtn.style.opacity = '0.7';
                } else {
                    audioBtn.textContent = '🔊';
                    audioBtn.style.opacity = '1';
                }
            });
        }

        const envelope = document.getElementById('envelope');
        const typedTextContainer = document.getElementById('typed-text');
        const signature = document.getElementById('signature');
        const fullLetterText = `É meu anjo... (SEU TEXTO AQUI)...`; // Lembre de colocar seu texto da carta
        
        let hasOpened = false;
        function typeWriter(text, element, speed = 30) {
            let i = 0;
            function removeCursor() {
                const style = document.createElement('style');
                style.innerHTML = '.typewriter-body::after { display: none; }';
                document.head.appendChild(style);
            }
            function type() {
                if (i < text.length) {
                    if (text.charAt(i) === '\n') {
                        element.innerHTML += '<br>';
                    } else {
                        element.innerHTML += text.charAt(i);
                    }
                    i++;
                    setTimeout(type, speed); 
                } else {
                    removeCursor();
                    signature.style.transition = "opacity 2s";
                    signature.style.opacity = "1";
                }
            }
            type();
        }
        if(envelope) {
            envelope.addEventListener('click', () => {
                if (!hasOpened) {
                    hasOpened = true;
                    envelope.classList.add('open');
                    setTimeout(() => {
                        typeWriter(fullLetterText, typedTextContainer, 30); 
                    }, 800);
                }
            });
        }
    }

    init();
});