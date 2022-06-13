export type CalculationValue = number;

export interface CalculationStep {
	description: string;
	value: CalculationValue;
}

export interface CalculationResult {
	value: CalculationValue;
	calculationSteps: CalculationStep[];
}

export interface CharacterSheetData {
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
}
