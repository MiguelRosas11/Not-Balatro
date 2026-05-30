# Not-Balatro

Proyecto final de Sistemas y Tecnologias Web. Not-Balatro es un juego web inspirado en Balatro, con reglas simplificadas de poker, rondas progresivas, jokers, dificultad, vidas, descartes y una interfaz animada.

## Tecnologias usadas

- HTML
- CSS
- JavaScript
- React
- Vite
- NodeJS
- Express

## Estructura

```text
Not-Balatro/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Instalacion del frontend

```bash
cd frontend
npm install
npm run dev
```

Vite abre el frontend en `http://localhost:5173`.

## Scripts desde la raiz

```bash
npm run install:all
npm run dev
npm run build
```

## Funcionalidades implementadas

- Menu principal.
- Selector de dificultad.
- Juego principal responsive.
- Mazo mezclado de 52 cartas.
- Mano de 8 cartas.
- Seleccion visual de cartas.
- Jugada, descarte, salto y reinicio.
- Sistema de vidas.
- Objetivo progresivo por ronda.
- Deteccion de manos de poker.
- Puntaje con multiplicadores.
- Jokers con efectos.
- Modal de eleccion de joker al ganar ronda.
- Pantalla de Game Over.
