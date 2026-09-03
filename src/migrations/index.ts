import * as migration_20260827_204448 from './20260827_204448'
import * as migration_20260830_020652 from './20260830_020652'

export const migrations = [
  {
    up: migration_20260827_204448.up,
    down: migration_20260827_204448.down,
    name: '20260827_204448',
  },
  {
    up: migration_20260830_020652.up,
    down: migration_20260830_020652.down,
    name: '20260830_020652',
  },
]
