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

## Como correrlo local

Para alguien que acaba de clonar el repositorio:

```bash
git clone https://github.com/MiguelRosas11/Not-Balatro.git
cd Not-Balatro/app
npm.cmd run install:all
npm.cmd run dev
```

El comando `npm.cmd run install:all` instala las dependencias del backend y del frontend. Si ya tienes las dependencias instaladas, solo ejecuta:

```bash
cd Not-Balatro/app
npm.cmd run dev
```

El frontend corre en:

```text
http://localhost:5173
```

El backend corre en:

```text
http://localhost:3001
```

## Estructura

```text
Not-Balatro/
├── app/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── data/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── server.js
│   │   └── package.json
│   └── package.json
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
├── README.md
└── .gitignore
```

## Scripts disponibles

Desde la carpeta `app`:

```bash
npm.cmd run install:all
npm.cmd run dev
npm.cmd run dev:backend
npm.cmd run dev:frontend
npm.cmd run build
```

Desde la raiz del proyecto tambien se puede ejecutar:

```bash
npm.cmd run install:all
npm.cmd run dev
npm.cmd run build
```

## Endpoints backend

- `GET /api/health`: estado del servidor.
- `GET /api/jokers`: lista de jokers disponibles.
- `GET /api/difficulties`: configuracion de dificultad.
- `POST /api/game/score`: calcula puntaje para cartas seleccionadas y jokers.
- `GET /api/stats/summary`: endpoint preparado para futuras estadisticas.
- `POST /api/stats/match`: endpoint preparado para guardar partidas futuras.

## Reglas del juego

1. Se usa una baraja tradicional de 52 cartas.
2. Al iniciar, se mezcla el mazo y se reparten 8 cartas.
3. Cada ronda tiene puntaje objetivo. El objetivo aumenta al avanzar.
4. El jugador selecciona de 1 a 5 cartas para jugar.
5. El sistema detecta combinaciones de poker: carta alta, par, doble par, trio, escalera, color, full house, poker y escalera de color.
6. El puntaje usa valor de cartas, multiplicador de la combinacion, cartas especiales y jokers activos.
7. Si se alcanza el objetivo, se gana la ronda y se elige 1 de 2 jokers aleatorios.
8. Si no se alcanza, las cartas jugadas se reemplazan si hay mazo.
9. El jugador puede descartar, saltar ronda con penalizacion, reiniciar o continuar.
10. Si no quedan vidas, manos o recursos suficientes, aparece Game Over.

## Funcionalidades implementadas

- Menu principal.
- Selector de dificultad: facil, normal y dificil.
- Juego principal responsive.
- Mazo mezclado de 52 cartas.
- Mano de 8 cartas.
- Seleccion visual de cartas.
- Jugada, descarte, salto y reinicio.
- Sistema de vidas.
- Objetivo progresivo por ronda.
- Deteccion de manos de poker.
- Puntaje con multiplicadores.
- 6 jokers con efectos distintos.
- Cartas especiales simples.
- Modal de eleccion de joker al ganar ronda.
- Pantalla de victoria de ronda.
- Pantalla de Game Over.
- Backend Express con datos y endpoints listos.

## Link Del Video
https://youtu.be/Rl7_9H8FppI?si=s5lG1kcW7WWV55fB
