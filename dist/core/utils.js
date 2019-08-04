import { GameOption } from "./game.js";
export function getRandomNumberFromRange(from, to) {
    return Math.round(Math.random() * (to - from) + from);
}
export function isGameOption(value) {
    return Object.values(GameOption).includes(value);
}
//# sourceMappingURL=utils.js.map