import { App } from './ui/app.js';
import { Game } from './core/game.js';
import { GameBot } from './core/game-bot.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const app = new App(game, document);

    app.start();
});
