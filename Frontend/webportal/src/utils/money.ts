import { Mutation } from '../types/Money';

export function getTotalInCopper(mutation: Mutation): number {
	return (mutation.copper || 0) + (mutation.silver || 0) * 10 + (mutation.gold || 0) * 100 + (mutation.platinum || 0) * 1000;
}
