export default function isPawnPromoteAction(actionAlgebraicNotation: string): boolean {
  return actionAlgebraicNotation.includes("=");
}
