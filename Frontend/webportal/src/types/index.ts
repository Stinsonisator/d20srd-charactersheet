import { Abilities } from './Character';

export type AbilityCode = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type Ability = keyof Abilities;
