import { getRandomNumberFromRange } from './utils.js';
import { GameOption, Player, PlayerChoice } from './game.js';

export class GameBot implements Player {
    name: string = 'Computer';

    constructor(public position: 'left' | 'right') {
    }

    makeChoice(): PlayerChoice {
        const choiceOption: number = getRandomNumberFromRange(0, Object.keys(GameOption).length - 1);
        const choice: GameOption = Object.values(GameOption)[choiceOption];

        return {
            player: this,
            choice
        }
    }
}
