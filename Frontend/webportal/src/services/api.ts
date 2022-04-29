import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Character } from '../types/Character';

export const characterSheetApi = createApi({
	reducerPath: 'characterSheetApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	endpoints: (builder) => ({
		getCharacters: builder.query<Character[], void>({
			query: () => 'characters'
		}),
		getCharacter: builder.query<Character, number>({
			query: (id) => `characters/${id}`
		})
	})
});

export const { useGetCharactersQuery, useGetCharacterQuery } = characterSheetApi;
