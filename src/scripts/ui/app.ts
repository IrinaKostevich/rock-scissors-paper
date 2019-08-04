import { GameOption, Game, PlayerChoice, Player } from "../core/game.js";
import { GameBot } from "../core/game-bot.js";
import { isGameOption } from "../core/utils.js";

const RESULT_CLASSES = Object.freeze({
    winner: 'player-choice--winner',
    looser: 'player-choice--looser',
    tie: 'player-choice--tie'
});

const CONTAINERS = {
    side: (document: Document, position: string) => document.querySelector(`.js-player-${position}-choice`) as HTMLElement,
    buttons: (document: Document) => document.querySelector(`.js-player-controls`) as HTMLElement
};

export class App {
    constructor(private game: Game, private document: Document) {
    }

    start() {
        const playerControls: HTMLElement = CONTAINERS.buttons(this.document);
        const playerLeft: Player = { name: 'Irina', position: 'left' };
        const playerRight: GameBot = new GameBot('right');

        playerControls.addEventListener('click', (event: Event) => {
            this.onClick(event, playerLeft, playerRight);
        });
    }

    onClick(event: Event, playerLeft: Player, playerRight: GameBot) {
        this.clearGameResults();

        const userSelection: string = (<HTMLElement>event.target).dataset.value;

        if (!isGameOption(userSelection)) throw new Error('Unexpected dataset value.');

        const leftPlayerChoice: PlayerChoice = this.game.getPlayerChoice(playerLeft, userSelection);
        const rightPlayerChoice: PlayerChoice = playerRight.makeChoice();

        this.renderPlayerChoice(playerLeft, userSelection);
        this.renderPlayerChoice(playerRight, rightPlayerChoice.choice);

        const winner: Player = this.game.defineWinner(leftPlayerChoice, rightPlayerChoice);

        if (winner) {
            const looser: Player = winner === playerLeft ? playerRight : playerLeft;
            this.renderWinnerGameResult(winner, looser);
        } else {
            this.renderTieGameResult();
        }
    }

    renderPlayerChoice(player: Player, option: GameOption) {
        const container: HTMLElement = CONTAINERS.side(this.document, player.position);
        container.innerHTML = `<i class="far fa-hand-${option.toLowerCase()}"></i>`;
    }

    renderWinnerGameResult(winner: Player, looser: Player) {
        const winnerContainer: HTMLElement = CONTAINERS.side(this.document, winner.position);
        winnerContainer.classList.add(RESULT_CLASSES.winner);

        const looserContainer: HTMLElement = CONTAINERS.side(this.document, looser.position);
        looserContainer.classList.add(RESULT_CLASSES.looser);
    }

    renderTieGameResult() {
        const leftContainer: HTMLElement = CONTAINERS.side(this.document, 'left');
        const rightContainer: HTMLElement = CONTAINERS.side(this.document, 'right');

        leftContainer.classList.add(RESULT_CLASSES.tie);
        rightContainer.classList.add(RESULT_CLASSES.tie);
    }

    clearGameResults() {
        const leftContainer: HTMLElement = CONTAINERS.side(this.document, 'left');
        const rightContainer: HTMLElement = CONTAINERS.side(this.document, 'right');

        leftContainer.classList.remove(...Object.values(RESULT_CLASSES));
        rightContainer.classList.remove(...Object.values(RESULT_CLASSES));
    }
}
