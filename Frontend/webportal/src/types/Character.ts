export type CharacterClass = 'blackBelt';

export interface Character {
	id: number;
	name: string;
	class: CharacterClass;
	strength: number;
	dexterity: number;
	constitution: number;
	intelegence: number;
	wisdom: number;
	charisma: number;
}
