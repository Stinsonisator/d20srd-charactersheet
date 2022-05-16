import { Ability } from '.';

export interface Skill {
	id: number;
	name: string;
	keyAbility: Ability;
	untrained: boolean;
}
