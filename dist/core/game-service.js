import { getRandomNumberFromRange } from './utils.js';
import { GameOption } from './game.js';
export function generateComputerChoice() {
    const choiceOption = getRandomNumberFromRange(1, 3);
    return Object.keys(GameOption).length;
}
export class GameBot {
    makeChoice() {
        const choice = 1;
        return {
            player: this,
            choice
        };
    }
}
//# sourceMappingURL=game-service.js.map