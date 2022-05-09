import { Abilities } from './Character';

export type AbilityCode = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type Ability = keyof Abilities;
