# Surpresa 

Mini-projeto com **carrossel responsivo**, **contador de meses & dias** e **música (YouTube)**.

## Estrutura
```
surpresa/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ app.js      // carrossel, contador, swipe e autoplay
│  └─ music.js    // player do YouTube (Mirrors)
├─ assets/        // coloque suas fotos aqui (img-1.jpg, img-2.jpg, ...)
├─ media/         // (opcional) áudio local caso não use YouTube
└─ favicon/       // (opcional)
```

## Passo a passo
1. Coloque suas fotos em `assets/` (ex.: `img-1.jpg` ... `img-5.jpg`).  
2. Ajuste os textos no array `SLIDES` em `js/app.js`.  
3. A data de início do relacionamento está em `js/app.js` (`RELATIONSHIP_START`).  
4. Música: `js/music.js` usa **YouTube IFrame API** com o vídeo *Mirrors*.
   - Para começar no refrão: defina `YT_START_SECONDS` (segundos).
   - Para loopar um trecho: defina `YT_END_SECONDS` (segundos).
5. Abra `index.html` no navegador. Clique em **“Começar”** para tocar a música e iniciar o carrossel.

> Observação: navegadores exigem interação do usuário para tocar áudio — por isso existe o overlay de **“Começar”**.

## Dicas
- Se quiser **áudio local** (com direitos de uso), substitua o player do YouTube por um `<audio>` no `index.html` e crie os controles no `music.js`.
- Cores e visual ficam em `css/style.css` (variáveis CSS no topo).
- Para publicar, use GitHub Pages, Netlify ou Vercel.
