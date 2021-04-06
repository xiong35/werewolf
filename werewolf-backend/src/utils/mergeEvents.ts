import {
  CharacterEvent,
  GameEvent,
} from "../../../werewolf-frontend/shared/ModelDefs";

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
