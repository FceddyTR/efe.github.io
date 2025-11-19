# Progression, Stats, and Item Requirements

## Stat and Level Scaling
- **Base stats per archetype (level 1):**
  - Warrior/Paladin: 120 Health, 10 Strength, 8 Stamina, 4 Intellect, 6 Agility, 8 Armor.
  - Rogue/Ranger: 95 Health, 6 Strength, 6 Stamina, 6 Intellect, 12 Agility, 4 Armor.
  - Mage/Priest: 85 Health, 3 Strength, 5 Stamina, 12 Intellect, 8 Agility, 2 Armor.
- **Scaling formulas (additive per level):**
  - Health: `base + (level ^ 1.2 * healthGrowth)` where growth = 12 (tank), 9 (hybrid), 7 (caster).
  - Primary damage stat (Strength/Intellect/Agility): `base + level * primaryGrowth` where growth = 3 (main stat), 2 (off stat).
  - Armor: `base + (level ^ 1.1 * armorGrowth)` where growth = 1.8 (frontline), 1.2 (skirmisher), 0.8 (caster).
  - Regen: `1% of resource per 5s + 0.08 * level` for mana/energy regeneration breakpoints.
- **Power bands:**
  - Levels 1-9: tutorial/story; enemies pull from `normal-enemy` loot table.
  - Levels 10-19: dungeons introduce `boss` table; elite mobs use `normal-enemy` with +25% to rare/epic weights.
  - Level 20+: raids/world bosses; unlock full `boss` table including legendary items.

## Item Requirement Framework
- **Minimum level by rarity:** Common 1, Rare 5, Epic 10, Legendary 15 baseline; individual items can raise the requirement (e.g., Dragonheart Signet min 20).
- **Class/role constraints:** Each item lists `classRestriction` and `roleTags` (e.g., Tank, Caster) in `Design/loot-table.json` to enforce build identity.
- **Equip rules:**
  - Players must meet both minimum level and class restriction to equip.
  - Off-role equipping is allowed at +3 level above the item requirement (e.g., Agility dagger usable by Warrior at item level + 3).
  - Legendary items are soulbound on pickup; others bind on equip.
- **Upgrade path:**
  - Items can be upgraded by +2 item levels per rarity tier (Common +2, Rare +4, Epic +6, Legendary +8) to match stat scaling at higher player levels.
  - Crafted upgrades never change the rarity weight, keeping drop economy stable.

## Loot Table Binding by Source
- Normal enemies (e.g., Forest Wolves, Bandit Scouts, Cave Spiders) reference the `normal-enemy` drop table.
- Bosses (Cinder Drake, Nightfall Matriarch, Ruinstone Colossus) reference the `boss` drop table.
- Encounter designers can add bespoke tables by cloning `normal-enemy` or `boss` structures and assigning them to new enemy tags.
