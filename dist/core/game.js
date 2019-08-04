export var GameOption;
(function (GameOption) {
    GameOption["ROCK"] = "ROCK";
    GameOption["SCISSORS"] = "SCISSORS";
    GameOption["PAPER"] = "PAPER";
})(GameOption || (GameOption = {}));
const rules = {
    [GameOption.ROCK]: [GameOption.SCISSORS],
    [GameOption.SCISSORS]: [GameOption.PAPER],
    [GameOption.PAPER]: [GameOption.ROCK],
};
export class Game {
    getPlayerChoice(player, choice) {
        return { player, choice };
    }
    defineWinner(left, right) {
        if (rules[left.choice].some(option => option === right.choice))
            return left.player;
        if (rules[right.choice].some(option => option === left.choice))
            return right.player;
        return null;
    }
}
//# sourceMappingURL=game.js.map