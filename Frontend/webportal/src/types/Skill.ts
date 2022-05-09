import { AbilityCode } from '.';

export interface Skill {
	id: number;
	name: string;
	keyAbility: AbilityCode;
	untrained: boolean;
}
