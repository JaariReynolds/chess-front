import { TeamColour } from "./types/literals";

export const PIECE_SIZE_MULTIPLIER = 0.75;
export const MOVING_SIZE_MULTIPLIER = 0.9;
export const TRANSITION_LENGTH_MILLISECONDS = 250;
export const BOT_PERFORM_ACTION_DELAY_MILLISECONDS = TRANSITION_LENGTH_MILLISECONDS * 2;
export const PLAYABLE_TEAM_COLOUR: TeamColour = "White"; // black will be playable one day :)
