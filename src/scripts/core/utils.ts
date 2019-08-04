import { GameOption } from "./game.js";

export function getRandomNumberFromRange(from: number, to: number): number {
    return Math.round(Math.random() * (to - from) + from);
}

export function isGameOption(value: any): value is GameOption {
    return Object.values(GameOption).includes(value);
}
