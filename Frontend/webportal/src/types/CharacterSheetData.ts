import { CharacterCustomValues, CharacterLevel } from './Character';
import { CharacterClass } from './CharacterClass';

export type CalculationValue = number;

export interface CalculationStep {
	description: string;
	value: CalculationValue;
}

export interface CalculationResult {
	value: CalculationValue;
	calculationSteps: CalculationStep[];
}

export interface CharacterSheetSkill {
	name: string;
	modifier: CalculationResult;
}

export interface CharacterSheetPool {
	name: string;
	remaining: number;
	total: number;
}

export interface CharacterSheetData {
	id: number;
	name: string;
	image: string;
	characterClass?: CharacterClass;
	maxHp: number;
	lethalDamage: number;
	nonlethalDamage: number;
	copper?: number;
	silver?: number;
	gold?: number;
	platinum?: number;
	levels: CharacterLevel[];
	abilities: {
		strength?: CalculationResult;
		dexterity?: CalculationResult;
		constitution?: CalculationResult;
		intelligence?: CalculationResult;
		wisdom?: CalculationResult;
		charisma?: CalculationResult;
	};
	savingThrows: {
		fortitude?: CalculationResult;
		reflex?: CalculationResult;
		will?: CalculationResult;
	};
	skills: CharacterSheetSkill[];
	pools: CharacterSheetPool[];
	customValues: CharacterCustomValues;
}
