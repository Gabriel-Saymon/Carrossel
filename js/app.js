// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuração do Carrossel e Contador ---
    const START_DATE = new Date('2025-04-15T00:00:00');
    const AUTOPLAY_INTERVAL_MS = 4500;

    // Defina aqui suas imagens e legendas.
    // Opcional: adicione `focus: "50% 30%"` para ajustar o alinhamento vertical de uma foto específica.
    const SLIDES_DATA = [
        { src: 'assets/img-1.jpeg', alt: 'Descrição da foto 1', caption: 'Primeiro treino como namorados.' },
        { src: 'assets/img-2.jpeg', alt: 'Descrição da foto 2', caption: 'Nosso primeiro encontro.' },
        { src: 'assets/img-3.jpeg', alt: 'Descrição da foto 3', caption: 'Primeira ida na sua casa pos namoro.' },
        { src: 'assets/img-4.jpeg', alt: 'Descrição da foto 4', caption: 'Primeira fotinha no carro.' },
        { src: 'assets/img-5.jpeg', alt: 'Descrição da foto 5', caption: 'O que dizer desse dia...' },
        { src: 'assets/img-6.jpeg', alt: 'Descrição da foto 6', caption: 'Que nem passarinhos.' },
        { src: 'assets/img-7.jpeg', alt: 'Descrição da foto 7', caption: 'Que gatos.' },
        { src: 'assets/img-9.jpeg', alt: 'Descrição da foto 9', caption: 'Que gatos pt2' },
        { src: 'assets/img-11.jpeg', alt: 'Descrição da foto 11', caption: 'Dia de princesa pos-operada.' },
        { src: 'assets/img-12.jpeg', alt: 'Descrição da foto 12', caption: 'Sempre apoiando um ao outro.' },
        { src: 'assets/img-15.jpeg', alt: 'Descrição da foto 15', caption: 'Nossa jeito nerd.' },
        { src: 'assets/img-16.jpeg', alt: 'Descrição da foto 16', caption: 'Mais um dia te amando.' },
        { src: 'assets/img-17.jpeg', alt: 'Descrição da foto 17', caption: 'Nosso treino de seis meses depois do primeiro "Boa noite."' },
        { src: 'assets/img-18.jpeg', alt: 'Descrição da foto 18', caption: 'Nossa trip para BH.' },
        { src: 'assets/img-19.jpeg', alt: 'Descrição da foto 19', caption: 'Nossa selfie de recem casados.' },
        { src: 'assets/img-20.jpeg', alt: 'Descrição da foto 20', caption: 'Seu primeiro aniversario que passamos juntos.' },
    ];

     // --- Seletores de DOM ---
    const slidesContainer = document.getElementById('slides');
    const captionText = document.getElementById('caption-text');
    const dateCounter = document.getElementById('date-counter');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    // --- Estado do Carrossel ---
    let currentIndex = 0;
    let autoplayInterval;
    let autoplayTimeout; // <-- Adicionado para controlar o reinício do autoplay
    let isPausedByUser = false;

    /**
     * Calcula a diferença entre duas datas em meses e dias.
     * @param {Date} startDate - A data inicial.
     * @param {Date} endDate - A data final.
     * @returns {{months: number, days: number}}
     */
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

        // Garante que meses não seja negativo se a data for no futuro próximo
        months = Math.max(0, months);
        
        return { months, days };
    }

    /**
     * Atualiza o contador de tempo no DOM.
     */
    function updateCounter() {
        const now = new Date();
        // A data de início do relacionamento é 15 de abril de 2025
        const diff = diffMonthsDays(new Date('2025-04-15T00:00:00'), now);
        dateCounter.textContent = `Já são ${diff.months} meses e ${diff.days} dias do nosso "sim". ❤️`;
    }

    /**
     * Navega para um slide específico.
     * @param {number} index - O índice do slide para exibir.
     */
    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        const newIndex = (index + slides.length) % slides.length;
        currentIndex = newIndex;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        captionText.textContent = SLIDES_DATA[currentIndex].caption;
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    /**
     * Para o autoplay.
     */
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    /**
     * Inicia o autoplay do carrossel.
     */
    function startAutoplay() {
        stopAutoplay(); // Garante que nenhum loop anterior esteja rodando
        if (isPausedByUser) return;
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    }

    /**
     * Reinicia o autoplay após uma interação manual.
     */
    function resetAutoplay() {
        isPausedByUser = true;
        stopAutoplay();
        
        // Limpa qualquer reinício agendado anteriormente para evitar múltiplos loops
        clearTimeout(autoplayTimeout);

        // Agenda um novo reinício do autoplay
        autoplayTimeout = setTimeout(() => {
            isPausedByUser = false;
            startAutoplay();
        }, AUTOPLAY_INTERVAL_MS * 2); // Dobro do tempo para dar uma pausa
    }

    /**
     * Cria e insere os slides e dots no DOM.
     */
    function createCarousel() {
        SLIDES_DATA.forEach((slideData, index) => {
            const slide = document.createElement('figure');
            slide.className = 'slide';
            const img = document.createElement('img');
            img.src = slideData.src;
            img.alt = slideData.alt;
            if (slideData.focus) {
                img.style.objectPosition = slideData.focus;
            }
            slide.appendChild(img);
            slidesContainer.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Ir para a foto ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });
    }

    /**
     * Configura os listeners para swipe em dispositivos móveis.
     */
    function setupSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 40;

        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff < 0) { nextSlide(); } 
                else { prevSlide(); }
                resetAutoplay();
            }
        });
    }

    /**
     * Função principal de inicialização.
     */
    function init() {
        // A data de início do relacionamento é 15 de abril de 2025
        const startDate = new Date('2025-04-15T00:00:00');
        
        createCarousel();
        
        // A função diffMonthsDays agora usa a data correta
        const diff = diffMonthsDays(startDate, new Date());
        dateCounter.textContent = `Já são ${diff.months} meses e ${diff.days} dias te amando mais do que ontem e menos que amanhã. 🤍`;
        
        // Atualiza o contador a cada hora
        setInterval(() => {
            const currentDiff = diffMonthsDays(startDate, new Date());
            dateCounter.textContent = `Já são ${currentDiff.months} meses e ${currentDiff.days} dias te amando mais do que ontem e menos que amanhã. 🤍`;
        }, 1000 * 60 * 60);

        goToSlide(0);
        startAutoplay();
        setupSwipe();

        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    }

    init();
});