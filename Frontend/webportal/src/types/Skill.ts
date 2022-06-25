import { Ability } from './Ability';
import { SkillSynergy } from './SkillSynergy';

export interface Skill {
	id: number;
	name: string;
	keyAbility: Ability;
	untrained: boolean;
	outgoingSkillSyngergies: SkillSynergy[];
	incomingSkillSyngergies?: SkillSynergy[];
}
