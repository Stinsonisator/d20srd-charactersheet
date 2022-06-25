import { Skill } from './Skill';

export interface SkillSynergy {
	sourceSkillId: number;
	sourceSkill?: Skill;
	destinationSkillId: number;
	destinationSkill?: Skill;
	isConditional: boolean;
	conditionDescription?: string;
}
