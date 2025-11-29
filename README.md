````markdown
# Uma Surpresa Para Você ❤️

Um projeto web personalizado, romântico e interativo, criado para celebrar momentos especiais, acompanhar a leitura bíblica em casal e registrar a contagem do tempo juntos.

## ✨ Funcionalidades

* **Carrossel de Memórias:**
    * Fotos com efeito "Ken Burns" (zoom suave) e transições elegantes.
    * Legendas com tipografia manuscrita.
    * **Controle de Foco:** Ajuste fino para não cortar rostos em fotos verticais.
    * **Trava de Zoom:** Opção para deixar fotos específicas estáticas (`static: true`).
* **Música de Fundo:** Player de áudio local (MP3) compatível com celulares (iOS/Android) via botão de interação inicial.
* **Linha do Tempo (3 Contadores):**
    * Tempo de Namoro (Destaque).
    * Tempo desde que se conheceram.
    * Tempo de Leitura Bíblica juntos.
* **Tracker de Leitura Bíblica:**
    * Lista com os 66 livros da Bíblia (Velho e Novo Testamento).
    * **Persistência de Dados:** O progresso fica salvo no navegador (não se perde ao fechar).
    * **Ciclos de Leitura:** Conta quantas vezes a Bíblia foi lida por completo automaticamente.
* **Carta Digital:** Seção estilizada como papel de carta para deixar uma mensagem especial.

## 📂 Estrutura de Pastas

```text
surpresa/
├─ index.html       # Estrutura principal
├─ css/
│  └─ style.css     # Estilos (Dourado, Fontes, Layout)
├─ js/
│  ├─ app.js        # Lógica do carrossel, datas e bíblia
│  └─ music.js      # Controle do player de áudio
├─ assets/          # Coloque suas fotos aqui (img-1.jpeg, etc.)
├─ media/           # Coloque sua música aqui (music.mp3)
└─ README.md
````

## ⚙️ Configuração

### 1\. Fotos (`js/app.js`)

Edite o array `SLIDES_DATA` no início do arquivo `js/app.js`.

  * **src:** Caminho da imagem.
  * **caption:** Legenda da foto.
  * **focus:** (Opcional) Ajusta o centro da imagem `'X% Y%'` (ex: `'50% 20%'` foca no topo/rosto).
  * **static:** (Opcional) Se `true`, a foto não terá o efeito de zoom (útil para fotos muito fechadas).

<!-- end list -->

```javascript
const SLIDES_DATA = [
    { 
      src: 'assets/foto1.jpg', 
      caption: 'Legenda bonita.', 
      focus: '50% 20%' // Foca mais no rosto
    },
    { 
      src: 'assets/foto2.jpg', 
      caption: 'Legenda estática.', 
      static: true // Sem zoom nesta foto
    }
];
```

### 2\. Datas (`js/app.js`)

No início do arquivo `js/app.js`, altere as constantes para as datas reais (Ano-Mês-Dia):

```javascript
const START_DATE = new Date('2025-04-15T00:00:00');       // Início do Namoro
const MEETING_DATE = new Date('2024-01-01T00:00:00');     // Dia que se conheceram
const BIBLE_START_DATE = new Date('2025-06-01T00:00:00'); // Início da Leitura Bíblica
```

### 3\. Música

1.  Baixe a música desejada em formato **.mp3**.
2.  Renomeie o arquivo para `music.mp3`.
3.  Coloque dentro da pasta `media/`.
4.  *Opcional:* Se quiser ajustar o início/fim do loop, edite as constantes `START_TIME` e `END_TIME` em `js/music.js`.

### 4\. Carta (`index.html`)

Para alterar o texto da carta, edite o conteúdo dentro da `div class="letter-body"` no final do arquivo `index.html`.

## 🚀 Como Rodar

1.  Abra o arquivo `index.html` no seu navegador (Chrome, Edge, Safari, Firefox).
2.  Clique no botão **"COMEÇAR"** para iniciar a música e a experiência.

## 📱 Dicas para Celular

Como o projeto usa arquivos locais, para funcionar perfeitamente no celular da sua namorada, o ideal é hospedar em um serviço gratuito:

  * **Vercel** (Recomendado)
  * **Netlify**
  * **GitHub Pages**

-----
```
```