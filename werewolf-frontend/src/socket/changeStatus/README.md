


|     角色/事件      | HUNTER              | WITCH           | SEER      | GUARD        | VILLAGER | WEREWOLF      | SHERIFF           |
| :----------------: | ------------------- | --------------- | --------- | ------------ | -------- | ------------- | ----------------- |
|     WOLF_KILL      |                     |                 |           |              |          | wolfKill      |                   |
|  WOLF_KILL_CHECK   |                     |                 |           |              |          | wolfKillCheck |                   |
|     SEER_CHECK     |                     |                 | seerCheck |              |          |               |                   |
|     WITCH_ACT      |                     | witchAct        |           |              |          |               |                   |
|   GUARD_PROTECT    |                     |                 |           | guardProtect |          |               |                   |
|    HUNTER_CHECK    | hunterCheck         |                 |           |              |          |               |                   |
|   SHERIFF_ELECT    | allSheriffElect     | 同              | 同        | 同           | 同       | 同            | 同                |
|    SHERIFF_VOTE    | allSheriffVote      | 同              | 同        | 同           | 同       | 同            | 同                |
| SHERIFF_VOTE_CHECK | allSheriffVoteCheck | 同              | 同        | 同           | 同       | 同            | 同                |
|   SHERIFF_ASSIGN   | waitSheriffAssign   | 同左            | 同左      | 同左         | 同左     | 同左          | **sheriffAssign** |
| BEFORE_DAY_DISCUSS | allBeforeDayDiscuss | 同              | 同        | 同           | 同       | 同            | 同                |
|    DAY_DISCUSS     | allDayDiscuss       | 同              | 同        | 同           | 同       | 同            | 同                |
|     EXILE_VOTE     | allExileVote        | 同              | 同        | 同           | 同       | 同            | 同                |
|  EXILE_VOTE_CHECK  | allExileVoteCheck   | 同              | 同        | 同           | 同       | 同            | 同                |
|    HUNTER_SHOOT    | **hunterShoot**     | waitHunterShoot | 同左      | 同左         | 同左     | 同左          | 同左              |
|     LEAVE_MSG      | waitLeaveMsg        | 同左            | 同左      | 同左         | 同左     | 同左          | **leaveMsg**      |
