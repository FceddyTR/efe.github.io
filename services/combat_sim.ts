/**
 * Basit, tur tabanlı zamana bölünmüş (time-sliced) bir savaş döngüsü örneği.
 * Cooldown, bekleme ve kaynak tüketimini gösteren bir prototip çıktısı üretir.
 */

type ResourceType = "rage" | "mana";

type Ability = {
  name: string;
  damage: number;
  cooldownSeconds: number;
  cost: number;
  resource: ResourceType;
};

type AbilityState = {
  ability: Ability;
  remainingCooldown: number;
};

type ResourcePool = {
  type: ResourceType;
  current: number;
  max: number;
  regenPerTick: number;
};

type Actor = {
  name: string;
  resource: ResourcePool;
  abilities: AbilityState[];
};

const tickSeconds = 0.5;

function reduceCooldowns(actor: Actor): void {
  actor.abilities.forEach((slot) => {
    slot.remainingCooldown = Math.max(0, slot.remainingCooldown - tickSeconds);
  });
}

function regenerateResource(pool: ResourcePool): void {
  pool.current = Math.min(pool.max, pool.current + pool.regenPerTick);
}

function pickAbility(actor: Actor): AbilityState | undefined {
  return actor.abilities.find(
    (slot) => slot.remainingCooldown <= 0 && actor.resource.current >= slot.ability.cost,
  );
}

function simulate(): void {
  const actor: Actor = {
    name: "Vanguard Deneme",
    resource: {
      type: "rage",
      current: 40,
      max: 100,
      regenPerTick: 8,
    },
    abilities: [
      {
        ability: {
          name: "Şarj",
          damage: 120,
          cooldownSeconds: 10,
          cost: 20,
          resource: "rage",
        },
        remainingCooldown: 0,
      },
      {
        ability: {
          name: "Ezici Darbe",
          damage: 180,
          cooldownSeconds: 8,
          cost: 35,
          resource: "rage",
        },
        remainingCooldown: 0,
      },
      {
        ability: {
          name: "Siper İtimi",
          damage: 90,
          cooldownSeconds: 6,
          cost: 10,
          resource: "rage",
        },
        remainingCooldown: 0,
      },
    ],
  };

  let targetHealth = 900;
  let elapsed = 0;

  console.log("--- Savaş simülasyonu başladı ---");

  while (elapsed < 30 && targetHealth > 0) {
    reduceCooldowns(actor);
    regenerateResource(actor.resource);

    const action = pickAbility(actor);

    if (!action) {
      console.log(
        `t=${elapsed.toFixed(1)}sn | Bekleniyor: yeterli kaynak veya hazır yetenek yok (kaynak=${actor.resource.current.toFixed(0)}).`,
      );
      elapsed += tickSeconds;
      continue;
    }

    const { ability } = action;
    actor.resource.current -= ability.cost;
    action.remainingCooldown = ability.cooldownSeconds;
    targetHealth = Math.max(0, targetHealth - ability.damage);

    console.log(
      `t=${elapsed.toFixed(1)}sn | ${actor.name} -> ${ability.name} (${ability.damage} hasar, hedef kalan HP=${targetHealth}). ` +
        `Kaynak: ${actor.resource.current}/${actor.resource.max}, CD ${ability.name}: ${action.remainingCooldown.toFixed(1)} sn`,
    );

    elapsed += tickSeconds;
  }

  if (targetHealth <= 0) {
    console.log(`--- Hedef düşürüldü, toplam süre: ${elapsed.toFixed(1)}sn ---`);
  } else {
    console.log(`--- Süre doldu (${elapsed.toFixed(1)}sn), hedef kalan HP=${targetHealth} ---`);
  }
}

simulate();
