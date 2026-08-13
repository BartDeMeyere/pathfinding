https://bartdemeyere.github.io/pathfinding/

# Maze Solver Studio

Een interactieve webapplicatie waarin je een doolhof kunt bekijken, genereren en laten oplossen met een visuele zoekprocedure. De app is opgebouwd met HTML5 Canvas en JavaScript-modules, en laat zien hoe een pad wordt opgebouwd door de solver door het doolhof te navigeren.

## Kenmerken

- 🧩 Genereert een nieuw doolhof
- 🔍 Laat een solver een pad door het doolhof volgen
- ⏯️ Ondersteunt pauzeren en hervatten
- 📊 Toont het aantal bezochte cellen en de huidige padlengte
- 🎨 Heeft een eenvoudige, moderne UI rond de canvas

## Projectstructuur

```text
project/
├── index.html
├── main.js
└── src/
    ├── app.js
    ├── renderer.js
    └── scene/
        ├── cell.js
        ├── controlmanager.js
        ├── eventHandler.js
        ├── grid.js
        ├── maze.js
        ├── scene.js
        └── solver.js
```

## Hoe het werkt

- De maze wordt aangemaakt door een random generator in [src/scene/maze.js](src/scene/maze.js).
- De grid en individuele cellen worden getekend op de canvas via [src/scene/grid.js](src/scene/grid.js) en [src/scene/cell.js](src/scene/cell.js).
- De solver beweegt stap voor stap door het doolhof in [src/scene/solver.js](src/scene/solver.js).
- De UI-knoppen en labels worden beheerd via [src/scene/controlmanager.js](src/scene/controlmanager.js).

## Aan de slag

1. Om het project te doen werken moet het draaien op een server. Live server uit Vscode. Of rechtstreeks de repo volgen op github.
3. Gebruik de knoppen om een nieuw doolhof te laden of de solver te starten, pauzeren of te resetten.

## Vereisten

- Moderne browser met ondersteuning voor ES Modules
- Geen externe libraries vereist

## Licentie

Vrij te gebruiken en aan te passen voor persoonlijke en commerciële doeleinden.
