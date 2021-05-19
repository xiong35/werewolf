import { CharacterEvent, GameEvent } from "../../../werewolf-frontend/shared/ModelDefs";

/**
 * @param characterEvents 角色对应的 events
 * @returns 按时间排序的events
 */
export function mergeEvents(
  characterEvents: CharacterEvent[]
): GameEvent[] {
  return characterEvents
    .reduce<GameEvent[]>(
      (outPrev, cEvent) =>
        cEvent.events.reduce<GameEvent[]>(
          (innerPrev, eValue) => [
            ...innerPrev,
            {
              at: eValue.at,
              character: cEvent.character,
              deed: eValue.deed,
            },
          ],
          outPrev
        ),
      []
    )
    .sort((e1, e2) => e1.at - e2.at);
}
