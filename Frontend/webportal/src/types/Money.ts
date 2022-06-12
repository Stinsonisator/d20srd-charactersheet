import { Character } from './Character';

export type CoinPouch = Pick<Character, 'id'> & Pick<Character, 'copper' | 'silver' | 'gold' | 'platinum'>;

export type Coin = keyof Pick<CoinPouch, 'copper' | 'silver' | 'gold' | 'platinum'>;

export type Mutation = Partial<Pick<CoinPouch, 'copper' | 'silver' | 'gold' | 'platinum'>>;
