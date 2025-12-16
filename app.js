// js/app.js - Versão Final (Sem Digitação)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DADOS PESSOAIS ---
    const START_DATE = new Date('2025-04-15T00:00:00'); 
    const MEETING_DATE = new Date('2025-03-18T00:00:00');   
    const BIBLE_START_DATE = new Date('2025-05-05T00:00:00'); 
    
    const AUTOPLAY_INTERVAL_MS = 5000;

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
        { src: 'assets/img-20.jpeg', alt: 'Foto 20', caption: 'Primeiro aniversário juntos.', focus: '50% 20%' },
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

        let savedProgress = JSON.parse(localStorage.getItem('bibleProgress')) || {};
        let completionCount = parseInt(localStorage.getItem('bibleCompletions')) || 0;

        updateStats();

        function updateStats() {
            const currentCount = Object.keys(savedProgress).length;
            booksCountEl.textContent = `${currentCount} / ${TOTAL_BOOKS}`;
            cyclesCountEl.textContent = `${completionCount}`;
        }

        function checkCompletion() {
            if (Object.keys(savedProgress).length === TOTAL_BOOKS) {
                setTimeout(() => {
                    alert("Parabéns! Vocês completaram a leitura de toda a Bíblia juntos! ❤️\n\nO ciclo será reiniciado.");
                    completionCount++;
                    localStorage.setItem('bibleCompletions', completionCount);
                    savedProgress = {};
                    localStorage.setItem('bibleProgress', JSON.stringify(savedProgress));
                    
                    renderBooks(oldTestament, 'ot-books');
                    renderBooks(newTestament, 'nt-books');
                    updateStats();
                }, 500);
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
                    btn.classList.toggle('read');
                    if (btn.classList.contains('read')) {
                        savedProgress[book] = true;
                    } else {
                        delete savedProgress[book];
                    }
                    localStorage.setItem('bibleProgress', JSON.stringify(savedProgress));
                    updateStats();
                    checkCompletion();
                });
                container.appendChild(btn);
            });
        }
        renderBooks(oldTestament, 'ot-books');
        renderBooks(newTestament, 'nt-books');
    }

    // --- INICIALIZAÇÃO ---
    function init() {
        createCarousel();
        
        const updateDate = () => {
            const now = new Date();

            // 1. Contador Namoro
            const diffNamoro = diffMonthsDays(START_DATE, now);
            dateCounter.textContent = `${diffNamoro.months} meses e ${diffNamoro.days} dias de nós.`;

            // 2. Contador Conhecemos
            const diffConheceram = diffMonthsDays(MEETING_DATE, now);
            meetCounter.textContent = `${diffConheceram.months} meses e ${diffConheceram.days} dias de história.`;

            // 3. Contador Bíblia
            const diffBiblia = diffMonthsDays(BIBLE_START_DATE, now);
            bibleCounter.textContent = `${diffBiblia.months} meses e ${diffBiblia.days} dias de leitura.`;
        };
        
        updateDate(); 
        setInterval(updateDate, 1000 * 60 * 60);

        goToSlide(0);
        startAutoplay();
        setupSwipe();
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        initBibleTracker();

        // CONTROLE AUDIO
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
    }

    init();
});