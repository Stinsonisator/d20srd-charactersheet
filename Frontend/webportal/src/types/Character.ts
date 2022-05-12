import { Skill } from './Skill';

export type CharacterClass = 'blackBelt';

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
	characterClass: CharacterClass;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	skills: CharacterSkill[];
}

export interface CharacterSkill {
	characterId: number;
	character: Character;
	skillId: number;
	skill: Skill;
	points: number;
	countAsClassSkill: boolean;
}

export type Abilities = Pick<Character, 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'>;
