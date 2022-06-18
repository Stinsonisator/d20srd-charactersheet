import { CharacterClass } from './CharacterClass';
import { Skill } from './Skill';

export type Gender = 'm' | 'v' | 'x';

export type Race = 'human' | 'halfElf' | 'halfling';

export interface Character {
	id: number;
	name: string;
	age: number;
	gender: Gender;
	race: Race;
	size: {
		feet: number;
		inch: number;
	};
	image: string;
	characterClassId: number;
	characterClass?: CharacterClass;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	lethalDamage: number;
	nonlethalDamage: number;
	copper?: number;
	silver?: number;
	gold?: number;
	platinum?: number;
	skills: CharacterSkill[];
	levels: CharacterLevel[];
	customValues?: CharacterCustomValues;
	user?: {
		id: number;
		userId: string;
	};
}

export interface CharacterCustomValues {
	poolPointsUsed: {
		poolName: string;
		value: number;
	}[];
}

export interface CharacterSkill {
	characterId: number;
	character: Character;
	skillId: number;
	skill: Skill;
	points: number;
	countAsClassSkill: boolean;
}

export interface CharacterLevel {
	id: number;
	characterId?: number;
	character?: Character;
	hp: number;
}
