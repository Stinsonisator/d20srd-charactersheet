import { Character } from './Character';

export type Abilities = Pick<Character, 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'>;

export type Ability = keyof Abilities;
