import { Square } from "../types/gameboard";

export default function squareToAlgebraicNotation(square: Square): string {
  const file = String.fromCharCode("a".charCodeAt(0) + square.y);
  const rank = 8 - square.x;
  return `${file}${rank}`;
}
