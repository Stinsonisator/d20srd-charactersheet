import { AbilityAdjustment } from './BusinessRule';
import { Skill } from './Skill';

export interface CharacterClassSkill {
	characterClassId: number;
	characterClass?: CharacterClass;
	skillId: number;
	skill?: Skill;
}

type TraitRule = AbilityAdjustment;

export interface CharacterClassTrait {
	id: number;
	characterClassId: number;
	characterClass?: CharacterClass;
	name: string;
	level: number;
	rule: TraitRule;
}

export interface CharacterClass {
	id: number;
	name: string;
	startingHp: number;
	classSkills: CharacterClassSkill[];
	traits: CharacterClassTrait[];
}
