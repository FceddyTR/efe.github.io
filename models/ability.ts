export type AbilityScaling = {
  STR: number;
  DEX: number;
  INT: number;
};

export type Ability = {
  id: string;
  name: string;
  archetype: string;
  levelReq: number;
  resourceCost: number;
  cooldown: number;
  scaling: AbilityScaling;
  effects: string[];
};
