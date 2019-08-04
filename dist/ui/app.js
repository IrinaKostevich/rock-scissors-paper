import { GameBot } from "../core/game-bot.js";
import { isGameOption } from "../core/utils.js";
const RESULT_CLASSES = Object.freeze({
    winner: 'player-choice--winner',
    looser: 'player-choice--looser',
    tie: 'player-choice--tie'
});
const CONTAINERS = {
    side: (document, position) => document.querySelector(`.js-player-${position}-choice`),
    buttons: (document) => document.querySelector(`.js-player-controls`)
};
export class App {
    constructor(game, document) {
        this.game = game;
        this.document = document;
    }
    start() {
        const playerControls = CONTAINERS.buttons(this.document);
        const playerLeft = { name: 'Irina', position: 'left' };
        const playerRight = new GameBot('right');
        playerControls.addEventListener('click', (event) => {
            this.onClick(event, playerLeft, playerRight);
        });
    }
    onClick(event, playerLeft, playerRight) {
        this.clearGameResults();
        const userSelection = event.target.dataset.value;
        if (!isGameOption(userSelection))
            throw new Error('Unexpected dataset value.');
        const leftPlayerChoice = this.game.getPlayerChoice(playerLeft, userSelection);
        const rightPlayerChoice = playerRight.makeChoice();
        this.renderPlayerChoice(playerLeft, userSelection);
        this.renderPlayerChoice(playerRight, rightPlayerChoice.choice);
        const winner = this.game.defineWinner(leftPlayerChoice, rightPlayerChoice);
        if (winner) {
            const looser = winner === playerLeft ? playerRight : playerLeft;
            this.renderWinnerGameResult(winner, looser);
        }
        else {
            this.renderTieGameResult();
        }
    }
    renderPlayerChoice(player, option) {
        const container = CONTAINERS.side(this.document, player.position);
        container.innerHTML = `<i class="far fa-hand-${option.toLowerCase()}"></i>`;
    }
    renderWinnerGameResult(winner, looser) {
        const winnerContainer = CONTAINERS.side(this.document, winner.position);
        winnerContainer.classList.add(RESULT_CLASSES.winner);
        const looserContainer = CONTAINERS.side(this.document, looser.position);
        looserContainer.classList.add(RESULT_CLASSES.looser);
    }
    renderTieGameResult() {
        const leftContainer = CONTAINERS.side(this.document, 'left');
        const rightContainer = CONTAINERS.side(this.document, 'right');
        leftContainer.classList.add(RESULT_CLASSES.tie);
        rightContainer.classList.add(RESULT_CLASSES.tie);
    }
    clearGameResults() {
        const leftContainer = CONTAINERS.side(this.document, 'left');
        const rightContainer = CONTAINERS.side(this.document, 'right');
        leftContainer.classList.remove(...Object.values(RESULT_CLASSES));
        rightContainer.classList.remove(...Object.values(RESULT_CLASSES));
    }
}
//# sourceMappingURL=app.js.map