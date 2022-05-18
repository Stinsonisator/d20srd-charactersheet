import { Ability } from './Ability';

export interface Skill {
	id: number;
	name: string;
	keyAbility: Ability;
	untrained: boolean;
}
