// js/app.js - Versão com Envelope e Modais

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDeYBvzUntv1mB6Kxi9T6hz52MeWP_0DFg",
  authDomain: "nossahistoria-e51b5.firebaseapp.com",
  databaseURL: "https://nossahistoria-e51b5-default-rtdb.firebaseio.com",
  projectId: "nossahistoria-e51b5",
  storageBucket: "nossahistoria-e51b5.firebasestorage.app",
  messagingSenderId: "123554417708",
  appId: "1:123554417708:web:c200a1ad87663037e79589"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
        { src: 'assets/img-20.jpeg', alt: 'Foto 20', caption: 'Seu primeiro aniversário juntos.', focus: '50% 20%' },
        { src: 'assets/img-21.jpeg', alt: 'Foto 21', caption: 'Meu primeiro aniversário juntos.' },
        { src: 'assets/img-22.jpeg', alt: 'Foto 22', caption: 'Primeiro Natal juntos.' },
        { src: 'assets/img-23.jpeg', alt: 'Foto 23', caption: 'Servindo juntos.' },
    ];

   // --- CARTAS ---
    const LETTERS_DATA = [
        {
            date: "15 de abril de 2025",
            content: `
                <p>Ei, meu bem! Espero que essa seja a primeira de muitas cartas. Em um dia tão especial quanto hoje, gostaria de fazer algo muito especial também.. é simples por ser uma carta, mas com certeza de muito valor.</p>
                <p>Não preciso nem dizer sobre o quão especial é e está sendo esse processo de me aproximar de você… você sem dúvida foi um presente dos céus em minha vida. Vejo em você uma mulher forte, determinada, carinhosa, dedicada e linda… Poderia dedicar diversos outros adjetivos no que se referem a você, mas deixo esses por enquanto para que nas próximas oportunidades venha utilizar os demais.</p>
                <p>Muito obrigado por ser quem você é dia após dia! Muito obrigado pelas orações, preocupações e conselhos. Não tenho palavras pra descrever o quão você é importante para mim. </p>
                <p>Não tenho dúvidas sobre o que você é, e naquilo que vejo em você na minha jornada. Quero que saiba que estarei sempre ao seu lado e celebraremos cada vitória e conquista juntos, bem como lutas e dificuldades.</p>
                <p>Hoje estarei conhecendo seus pais e em breve você estará “conhecendo” os meus… e assim vamos seguindo, passo a passo para vivermos um belo propósito. Saiba que você é amada, e cada dia que passa, farei o possível para que você veja e sinta isso.</p>
            `,
            signature: "Seu Preto 🤍"
        },
        {
            date: "16 de Maio de 2025",
            content: `
                <p>Enfim, nosso primeiro mês! Na verdade, não sei o quanto vou escrever nesta mensagem… vou apenas expor um pouco daquilo que penso, sinto e vivo ao seu lado. Caso não esteja escrito à mão, me desculpe! Cê sabe que minha letra não é formosa e tão pouco legível rs.</p>
                <p>A verdade é que nesse primeiro mês de namoro o que me vem em mente é um sentimento de gratidão. Gratidão a Deus por ter colocado em minha vida uma pessoa tão incrível! Uma mulher de fato preciosa. Que se mostra cada vez mais companheira, amiga, auxiliadora, cuidadosa, amorosa e por aí vai…</p>
                <p>Obrigado por me aconselhar, obrigado por me apoiar e obrigado por escolher me amar. Amo te amar, e sou tão feliz por estar com você! Você tem alegrado meus dias e me inspirado a ser um homem melhor.</p>
                <p>Desde que você chegou tenho me dedicado mais, me esforçado mais, buscando ser um filho melhor e tentando ser o melhor namorado possível dentro daquilo posso nas atuais condições. Hoje eu vejo, que ainda em pouco tempo existe um Gabriel antes e um Gabriel depois da Rhaiza. E sigo firme em cumprir nossa promessa, no qual se for para mudar, que seja para melhor.</p>
                <p>Espero que essa data se repita mais e mais vezes. Espero ter mais momentos ao teu lado, sejam bons ou ruins… te apoiando, te impulsionando e chorando com você se necessário, bem como nos alegrando nos momentos de vitória, alegria e bonança. Espero continuar ouvindo o quanto você se sente cuidada, amada e protegida.. pra eu continuar a ver e saber que não estou falhando com homem. Espero que juntos venhamos crescer em graça e em conhecimento, buscando a Deus cada vez mais e fazendo com Ele seja o centro do nosso relacionamento… hoje terminamos de ler um livro da Bíblia juntos, mas em breve estaremos concluindo toda ela. E assim, vivermos um propósito e fazer com que Ele seja conhecido através de nós!</p>
                <p>Que venhamos desfrutar de mais dias 15, muito mais… além de desfrutar 2, 5, 8, 10 meses.. e pela graça e vontade de Deus, uma vida toda!</p>
                <p>Te amo, Rhaiza!!!</p>
            `,
            signature: "Seu Preto 🤍"
        },
        {
            date: "15 de Outubro de 2025",
            content: `
                <p>Como prometido, mais uma carta na qual eu espero ser muitas. Diga-se de passagem que eu já planejava te escrever antes mesmo que você viesse a cobrar… tava esperando chegar ao nosso sexto mês como namorados para lhe dedicar mais uma carta.</p>
                <p>Posso dizer que de certo modo é um pouco difícil colocar em palavras como em um formato de carta tendo em vista o fato de sempre lhe dizer o quão especial e fundamental você é na minha vida.</p>
                <p>Posso afirmar que essas não são como palavras repetidas ditas de maneira recorrente! Cada vez que eu digo que te amo, pode ter certeza que estou dizendo com mais amor do que na vez anterior. Cada vez que digo que você é especial é que de fato você tem se tornado mais especial ainda do que as demais vezes ditas. E assim vai em todas as declarações nas quais eu dedico a ti.</p>
                <p>Desfrutar desse tempo ao seu lado tem sido a melhor experiência da minha vida. Nesses meus 23 anos ainda tenho dúvidas sobre minha carreira profissional, incertezas sobre o futuro acadêmico ou até mesmo em coisas relacionadas a isso… mas em apenas 6 meses sei que a escolha mais importante da minha vida já foi tomada e escolhida, e essa escolha é você e passar o resto dos meus dias com você!</p>
                <p>Só tenho a agradecer! Encontrei muito mais que um tesouro… encontrei um propósito! Encontrei um amor! Encontrei uma parceira! Encontrei a minha família! Você é a mulher dos meus sonhos e minha futura mulher se assim Deus permitir. Você, meu amor.. é a prova viva de que os realmente os planos de Deus são melhores que os nossos. Pois, no que para os homens é uma história improvável e rara, de certo modo impossível até de acreditar que aconteceu como aconteceu, se tornou o capítulo história mais linda de um homem que não é merecedor de tanto. E por isso me faltam palavras para agradecer a Deus por ter sido tão bom para alguém como eu, me dando a chance de ter alguém como você. Te amo!</p>
            `,
            signature: "Seu Preto 🤍"
        },
        {
            date: "20 de Novembro de 2025",
            content: `
                <p>É meu anjo, cá estou eu para colocar um pouco em palavras tudo aquilo que estamos vivendo, sonhando e até mesmo um pouco daquilo que você representa para mim.</p>
                <p>Sem dúvida a cada dia que passa me impressiono mais com você… costumo dizer que existe um Gabriel antes e depois da Rhaiza, mas é possível observar que a recíproca é verdadeira! Pois o que antes era incrível a cada dia tem se melhorado mais ainda.</p>
                <p>Ver todo cuidado e carinho que você tem por mim, se importar em saber o que pode melhorar, fazer tanto por amor e ainda ser tudo que você é… confesso que às vezes me pergunto se mereço isso tudo. Porque olha, você é muito mais do que eu pedi ou sonhei…</p>
                <p>Por isso oro tanto e peço a Deus que me dê sabedoria, mansidão e me ensine todo necessário para que eu possa cuidar tão bem do tesouro que Ele está confiando a mim!</p>
                <p>Obrigado por trazer alegria e significado aos meus dias! Você me faz querer ser um homem melhor todos os dias… não para que eu conquiste muitas coisas para mim, mas para que eu conquiste muitas coisas por você! Eu te amo mais do que ontem e menos que amanhã.</p>
            `,
            signature: "Seu Preto 🤍"
        },
        {
            date: "10 de Janeiro de 2026",
            content: `
                <p>Estava pensando em como seria mais uma carta para minha gatinha!! A verdade é que vai ser algo que tenho aprendido com o Senhor a cada dia que passa e algo que tem ressoado cada vez mais ao meu coração.</p>
                <p>É bem verdade que tudo que virei a dizer já é do seu conhecimento… mas quando paro para olhar e sondar tudo quanto já passamos nesses últimos meses, eu posso dizer que me transborda gratidão.</p>
                <p>Tenho aprendido muito com você, sei que já disse isso mas é um fato que tenho muuuito a melhorar! Eu realmente queria que você tivesse a oportunidade de ver o quão incrível você é aos meus olhos!! E o quão isso me motiva a ser um homem melhor por/para você.</p>
                <p>Sou muito grato por ter você ao meu lado. Uma mulher forte, mas também sensível.. uma mulher decidida, mas que deposita confiança em minhas decisões, uma mulher centrada e séria nos momentos devidos, mas engraçada e extrovertida nos mesmo… e por aí vai!!</p>
                <p>Passamos por diversos momentos e fases.. a cada dia nos conhecendo mais e aprendendo mais um com outro… mas com certeza se amando mais e com mais convicção do queremos viver e desfrutar. Superando assim cada adversidade e desafio que vem surgindo.</p>
                <p>Então de verdade, obrigado por me escolher e obrigado por ser o amor da minha vida! Te amo e luto por você dia após dia! E pode apostar que isso é uma promessa.</p>
            `,
            signature: "Seu Preto 🤍"
        }
        
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

    // --- FUNÇÕES GERAIS ---
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

    // --- LÓGICA DO CARROSSEL DE FOTOS ---
    let currentIndex = 0;
    let autoplayInterval;
    let autoplayTimeout;
    let isPausedByUser = false;

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

    // --- NOVO SISTEMA DE CARTAS (ENVELOPE) ---
    function initLetterSystem() {
        const envelopeTrigger = document.getElementById('envelope-trigger');
        const menuModal = document.getElementById('letter-menu-modal');
        const readModal = document.getElementById('letter-read-modal');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const closeReadBtn = document.getElementById('close-read-btn');
        const lettersList = document.getElementById('letters-list');
        
        // Elementos do Modal de Leitura
        const modalDate = document.getElementById('modal-date');
        const modalBody = document.getElementById('modal-body');
        const modalSignature = document.getElementById('modal-signature');

        // 1. Abrir Menu ao clicar no Envelope
        envelopeTrigger.addEventListener('click', () => {
            renderLetterMenu();
            openModal(menuModal);
        });

        // 2. Fechar Menu
        closeMenuBtn.addEventListener('click', () => closeModal(menuModal));

        // 3. Voltar da Carta para o Menu (ou Fechar tudo)
        closeReadBtn.addEventListener('click', () => {
            closeModal(readModal);
            // Opcional: Reabrir o menu se quiser que volte para a lista
            openModal(menuModal);
        });

        // Função Auxiliar: Renderizar a Lista de Datas
        function renderLetterMenu() {
            lettersList.innerHTML = ''; // Limpa
            LETTERS_DATA.forEach((letter, index) => {
                const btn = document.createElement('button');
                btn.className = 'letter-option-btn';
                btn.innerHTML = `<strong>${letter.date}</strong>`;
                
                btn.addEventListener('click', () => {
                    openLetter(index);
                });

                lettersList.appendChild(btn);
            });
        }

        // Função Auxiliar: Abrir uma carta específica
        function openLetter(index) {
            const letter = LETTERS_DATA[index];
            
            // Preenche os dados
            modalDate.textContent = letter.date;
            modalBody.innerHTML = letter.content;
            modalSignature.textContent = letter.signature;

            // Troca os modais (Fecha menu, abre leitura)
            closeModal(menuModal);
            openModal(readModal);
        }

        function openModal(modal) {
            modal.classList.remove('hidden'); // Mostra
            // Pequeno delay para animação de opacidade funcionar
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
        }

        function closeModal(modal) {
            modal.style.opacity = '0';
            setTimeout(() => { modal.classList.add('hidden'); }, 500); // Espera animação
        }
    }

    // --- TRACKER FINANCEIRO ---
    function initFinanceTracker() {
        const savedDisplay = document.getElementById('money-saved');
        const leftDisplay = document.getElementById('money-left');
        const progressBar = document.getElementById('finance-progress-bar');
        const percentDisplay = document.getElementById('finance-percent');
        const inputField = document.getElementById('finance-input');
        const addBtn = document.getElementById('finance-add-btn');
        const historyList = document.getElementById('finance-history-list');
        const toggleBtn = document.getElementById('toggle-history-btn');
        
        const GOAL = 20000;
        const transactionsRef = ref(db, 'finance/transactions');
        
        if(toggleBtn && historyList) {
            toggleBtn.addEventListener('click', () => {
                historyList.classList.toggle('hidden');
                
                if (historyList.classList.contains('hidden')) {
                    toggleBtn.textContent = 'Mostrar';
                } else {
                    toggleBtn.textContent = 'Ocultar';
                }
            });
        }
        
        addBtn.addEventListener('click', () => {
            const value = parseFloat(inputField.value);
            if (!value || value <= 0) {
                alert("Digite um valor válido maior que zero!");
                return;
            }
            const newTransaction = {
                amount: value,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            push(transactionsRef, newTransaction)
                .then(() => { inputField.value = ''; })
                .catch((error) => alert("Erro ao salvar: " + error.message));
        });

        onValue(transactionsRef, (snapshot) => {
            const data = snapshot.val();
            let totalSaved = 0;
            historyList.innerHTML = '';

            if (data) {
                const transactionsArray = Object.entries(data).map(([key, value]) => {
                    return { id: key, ...value };
                });
                transactionsArray.sort((a, b) => b.timestamp - a.timestamp);

                transactionsArray.forEach(item => {
                    totalSaved += item.amount;
                    addHistoryItem(item);
                });
            }
            updateStats(totalSaved);
        });

        function updateStats(total) {
            let totalLeft = GOAL - total;
            if (totalLeft < 0) totalLeft = 0;
            let percent = (total / GOAL) * 100;
            if (percent > 100) percent = 100;

            savedDisplay.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            leftDisplay.textContent = totalLeft.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            progressBar.style.width = `${percent}%`;
            percentDisplay.textContent = `${percent.toFixed(1)}% Concluído`;

            if (total >= GOAL) {
                percentDisplay.textContent = "🎉 META BATIDA! 🎉";
                percentDisplay.style.color = "#2ecc71";
                percentDisplay.style.fontWeight = "bold";
            } else {
                percentDisplay.style.color = "var(--text-secondary)";
                percentDisplay.style.fontWeight = "normal";
            }
        }

        function addHistoryItem(item) {
            const li = document.createElement('li');
            li.className = 'history-item';
            const dateObj = new Date(item.date);
            const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

            li.innerHTML = `
                <div class="history-info">
                    <span class="history-amount">+ ${item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <span class="history-date">${dateStr}</span>
                </div>
                <button class="delete-btn" title="Apagar">🗑️</button>
            `;
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                if(confirm(`Tem certeza que quer apagar o depósito de R$ ${item.amount}?`)) {
                    const itemRef = ref(db, `finance/transactions/${item.id}`);
                    remove(itemRef);
                }
            });
            historyList.appendChild(li);
        }
    }

    // --- TRACKER BÍBLIA ---
    function initBibleTracker() {
        const booksCountEl = document.getElementById('books-count');
        const cyclesCountEl = document.getElementById('cycles-count');
        const TOTAL_BOOKS = 66; 

        const oldTestament = ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester", "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oseias", "Joel", "Amós", "Obadias", "Jonas", "Miqueias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias"];
        const newTestament = ["Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"];

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
                setTimeout(() => { handleCompletion(); }, 500);
            }
        }

        function handleCompletion() {
            if (Object.keys(savedProgress).length > 0) {
                alert(`Completamos a leitura de toda a Bíblia juntos! ❤\n\nEsta foi a leitura nº ${completionCount + 1}.\n\nRumo a mais uma!`);
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
                    if (isRead) delete newProgress[book];
                    else newProgress[book] = true;
                    set(progressRef, newProgress);
                });
                container.appendChild(btn);
            });
        }
        renderBooks(oldTestament, 'ot-books');
        renderBooks(newTestament, 'nt-books');
    }

    // --- MAPA DOS LUGARES ---
    function initMap() {
        // 1. Defina o ponto central
        // Dica: Pegue essas coordenadas no Google Maps clicando com botão direito no local
        const center = [-20.19245, -40.23604]; 
        
        const map = L.map('map').setView(center, 12); 

        // 2. VISUAL DE MAPA CLÁSSICO (OpenStreetMap Padrão)
        // Substituí o 'Dark Matter' por este aqui que é o visual tradicional
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // 3. Ícone Personalizado
        const customIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // 4. Lista de Lugares
        const places = [
            {
                coords: [-20.192753, -40.243153], 
                title: "Onde nos conhecemos",
                desc: "O dia que minha vida mudou."
            },
            {
                coords: [-20.19315, -40.22920], 
                title: "Primeiro Encontro",
                desc: "Lembra do nervosismo?"
            },
            {
                coords: [-20.31800, -40.80541], 
                title: "Primeira Viagem juntos",
                desc: "Friozinho baum de Paraju"
            },
            {
                coords: [-19.85184, -40.97980], 
                title: "Segunda viagem juntos",
                desc: "Muitas comilanças em BH"
            },
            {
                coords: [-20.19336, -40.19048], 
                title: "Primeira praia juntos",
                desc: "Depois de tanto tempo"
            },
            {
                coords: [-20.43318, -41.03515], 
                title: "Ida a Domingos Martins",
                desc: "Uma das fotos mais bonitas que temos"
            }
        ];

        places.forEach(place => {
            L.marker(place.coords, { icon: customIcon }).addTo(map)
                .bindPopup(`<h3>${place.title}</h3><p>${place.desc}</p>`);
        });
    }

    // --- INIT GERAL ---
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
        initFinanceTracker(); 
        initLetterSystem(); // INICIA O NOVO SISTEMA

        initMap();

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
