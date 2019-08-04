import { getRandomNumberFromRange } from './utils.js';
import { GameOption } from './game.js';
export class GameBot {
    constructor(position) {
        this.position = position;
        this.name = 'Computer';
    }
    makeChoice() {
        const choiceOption = getRandomNumberFromRange(0, Object.keys(GameOption).length - 1);
        const choice = Object.values(GameOption)[choiceOption];
        return {
            player: this,
            choice
        };
    }
}
//# sourceMappingURL=game-bot.js.map