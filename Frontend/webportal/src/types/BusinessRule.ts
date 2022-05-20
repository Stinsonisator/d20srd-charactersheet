import { Ability } from './Ability';

export interface AbilityAdjustment {
	ability: Ability;
	adjustment: number;
}

export interface BaseAttackBonus {
	baseAttackBonus: number;
}

export interface SavingThrowModifiers {
	fortitude: number;
	reflex: number;
	will: number;
}
