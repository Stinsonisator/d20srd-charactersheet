import { Character } from './Character';

export type Ability = keyof Abilities;

export type Abilities = Pick<Character, 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'>;
