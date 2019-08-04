export enum GameOption {
    ROCK = 'ROCK',
    SCISSORS = 'SCISSORS',
    PAPER = 'PAPER'
}

const rules = {
    [GameOption.ROCK]: [GameOption.SCISSORS],
    [GameOption.SCISSORS]: [GameOption.PAPER],
    [GameOption.PAPER]: [GameOption.ROCK],
};

export interface Player {
    name: string;
    position: 'left' | 'right';
}

export interface PlayerChoice {
    player: Player;
    choice: GameOption;
}

export class Game {
    getPlayerChoice(player: Player, choice: GameOption): PlayerChoice {
        return { player, choice };
    }

    defineWinner(left: PlayerChoice, right: PlayerChoice): Player {
        if (rules[left.choice].some(option => option === right.choice)) return left.player;
        if (rules[right.choice].some(option => option === left.choice)) return right.player;

        return null;
    }
}
