import * as migration_20260827_204448 from './20260827_204448'
import * as migration_20260830_020652 from './20260830_020652'
import * as migration_20260909_140850 from './20260909_140850'
import * as migration_20260915_031537_add_cta_banner_and_seo_fields from './20260915_031537_add_cta_banner_and_seo_fields'

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
  {
    up: migration_20260909_140850.up,
    down: migration_20260909_140850.down,
    name: '20260909_140850',
  },
  {
    up: migration_20260915_031537_add_cta_banner_and_seo_fields.up,
    down: migration_20260915_031537_add_cta_banner_and_seo_fields.down,
    name: '20260915_031537_add_cta_banner_and_seo_fields',
  },
]
