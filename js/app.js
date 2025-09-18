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
        { src: 'assets/img-8.jpeg', alt: 'Descrição da foto 8', caption: 'Que gatos pt2.' },
        { src: 'assets/img-9.jpeg', alt: 'Descrição da foto 9', caption: 'Que gatos pt3' },
        { src: 'assets/img-10.jpeg', alt: 'Descrição da foto 10', caption: 'Que gatos pt4.' },
        { src: 'assets/img-11.jpeg', alt: 'Descrição da foto 11', caption: 'Dia de princesa pos-operada.' },
        { src: 'assets/img-12.jpeg', alt: 'Descrição da foto 12', caption: 'Sempre apoiando um ao outro.' },
        { src: 'assets/img-13.jpeg', alt: 'Descrição da foto 13', caption: 'Mais um deep com voce.' },
        { src: 'assets/img-14.jpeg', alt: 'Descrição da foto 14', caption: 'Momentos que guardo no coração.' },
        { src: 'assets/img-15.jpeg', alt: 'Descrição da foto 15', caption: 'Nossa jeito nerd.' },
        { src: 'assets/img-16.jpeg', alt: 'Descrição da foto 16', caption: 'Mais um dia te amando.' },
        { src: 'assets/img-17.jpeg', alt: 'Descrição da foto 17', caption: 'Nosso treino de seis meses depois do primeiro Boa noite.' },
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
        months = months <= 0 ? 0 : months;

        let days = 0;
        if (endDate.getDate() >= startDate.getDate()) {
            days = endDate.getDate() - startDate.getDate();
        } else {
            months--;
            const daysInLastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
            days = (daysInLastMonth - startDate.getDate()) + endDate.getDate();
        }
        return { months, days };
    }

    /**
     * Atualiza o contador de tempo no DOM.
     */
    function updateCounter() {
        const now = new Date();
        const diff = diffMonthsDays(START_DATE, now);
        dateCounter.textContent = `Já são ${diff.months} meses e ${diff.days} dias do nosso "sim". ❤️`;
    }

    /**
     * Navega para um slide específico.
     * @param {number} index - O índice do slide para exibir.
     */
    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        // Garante que o índice esteja dentro dos limites
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

    /**
     * Funções para ir para o slide seguinte e anterior.
     */
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    /**
     * Inicia o autoplay do carrossel.
     */
    function startAutoplay() {
        if (isPausedByUser) return;
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    }

    /**
     * Para o autoplay.
     */
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    /**
     * Reinicia o autoplay após uma interação manual.
     */
    function resetAutoplay() {
        isPausedByUser = true;
        stopAutoplay();
        // Retoma o autoplay após um tempo
        setTimeout(() => {
            isPausedByUser = false;
            startAutoplay();
        }, AUTOPLAY_INTERVAL_MS * 2);
    }

    /**
     * Cria e insere os slides e dots no DOM.
     */
    function createCarousel() {
        SLIDES_DATA.forEach((slideData, index) => {
            // Cria o slide
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

            // Cria o dot
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
        const swipeThreshold = 40; // Mínimo de pixels para considerar um swipe

        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff < 0) { // Swipe para a esquerda
                    nextSlide();
                } else { // Swipe para a direita
                    prevSlide();
                }
                resetAutoplay();
            }
        });
    }

    /**
     * Função principal de inicialização.
     */
    function init() {
        createCarousel();
        updateCounter();
        // Atualiza o contador a cada hora
        setInterval(updateCounter, 1000 * 60 * 60);

        // Define o estado inicial
        goToSlide(0);
        startAutoplay();
        setupSwipe();

        // Listeners dos botões
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    }

    // Inicia a aplicação
    init();
});