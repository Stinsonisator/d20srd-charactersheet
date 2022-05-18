import { Skill } from './Skill';

export interface CharacterClassSkill {
	characterClassId: number;
	characterClass?: CharacterClass;
	skillId: number;
	skill?: Skill;
}

export interface CharacterClass {
	id: number;
	name: string;
	classSkills: CharacterClassSkill[];
}
