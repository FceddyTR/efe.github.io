import { Ability } from "../models/ability";

/**
 * Returns the list of abilities unlocked when the player levels up.
 * @param abilities Complete list of abilities available in the game.
 * @param archetype The player's current archetype.
 * @param previousLevel The level before experience gain.
 * @param newLevel The level after experience gain.
 */
export function getNewlyUnlockedAbilities(
  abilities: Ability[],
  archetype: string,
  previousLevel: number,
  newLevel: number
): Ability[] {
  if (newLevel <= previousLevel) {
    return [];
  }

  return abilities.filter(
    (ability) =>
      ability.archetype === archetype &&
      ability.levelReq > previousLevel &&
      ability.levelReq <= newLevel
  );
}
