export type Gender = 'female' | 'male' | 'nonbinary';

export interface AbilityRef {
  id: string;
  name: string;
  description?: string;
  element?: string;
}

export interface SkillSet {
  id: string;
  name: string;
  summary: string;
  abilities: AbilityRef[];
}

export interface CharacterCreateRequest {
  nickname?: string;
  gender: Gender;
  skillSetId: string;
}
