import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Character } from '../types/Character';
import { Skill } from '../types/Skill';

function providesList<R extends { id: string | number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) {
	return resultsWithIds ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))] : [{ type: tagType, id: 'LIST' }];
}

export const characterSheetApi = createApi({
	reducerPath: 'characterSheetApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	tagTypes: ['Characters', 'Skills'],
	endpoints: (builder) => ({
		getCharacters: builder.query<Character[], void>({
			query: () => 'characters',
			providesTags: (result) => providesList(result, 'Characters')
		}),
		getCharacter: builder.query<Character, number>({
			query: (id) => `characters/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'Characters', id }]
		}),
		addCharacter: builder.mutation<Character, Character>({
			query: (charachter) => ({
				url: 'characters',
				method: 'POST',
				body: charachter
			}),
			invalidatesTags: [{ type: 'Characters', id: 'LIST' }]
		}),
		deleteCharacter: builder.mutation<void, number>({
			query: (id) => ({
				url: `characters/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (_result, _error, id) => [{ type: 'Characters', id }]
		}),
		getSkills: builder.query<Skill[], void>({
			query: () => 'skills',
			providesTags: (result) => providesList(result, 'Skills')
		}),
		getSkill: builder.query<Skill, number>({
			query: (id) => `skills/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'Skills', id }]
		}),
		addSkill: builder.mutation<Skill, Skill>({
			query: (skill) => ({
				url: 'skills',
				method: 'POST',
				body: skill
			}),
			invalidatesTags: [{ type: 'Skills', id: 'LIST' }]
		})
	})
});

export const { useGetCharactersQuery, useGetCharacterQuery, useAddCharacterMutation, useDeleteCharacterMutation, useGetSkillsQuery, useAddSkillMutation } = characterSheetApi;
