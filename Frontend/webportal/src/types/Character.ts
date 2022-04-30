export type CharacterClass = 'blackBelt';

export type Gender = 'm' | 'v' | 'x';

export type Race = 'human' | 'halfElf' | 'halfling';

export interface Character {
	id: number;
	name: string;
	age: number;
	gender: Gender;
	race: Race;
	size: number;
	characterClass: CharacterClass;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
}
