import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import merge from 'lodash/merge';

import { Character, CharacterLevel } from '../types/Character';
import { CharacterClass } from '../types/CharacterClass';
import { Skill } from '../types/Skill';
import { getAccessTokenSilently } from './authentication';

function providesList<R extends { id: string | number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) {
	return resultsWithIds
		? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
		: [{ type: tagType, id: 'LIST' }];
}

export const characterSheetApi = createApi({
	reducerPath: 'characterSheetApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/',
		prepareHeaders: async (headers) => {
			const access_token = await getAccessTokenSilently();
			if (access_token) {
				headers.set('Authorization', `Bearer ${access_token}`);
			}
			return headers;
		}
	}),
	tagTypes: ['Characters', 'Skills', 'CharacterClasses'],
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
		updateCharacter: builder.mutation<Character, Character>({
			query: (character) => ({
				url: `characters/${character.id}`,
				method: 'PUT',
				body: character
			}),
			invalidatesTags: (_result, _error, arg) => [{ type: 'Characters', id: arg.id }]
		}),
		partialUpdateCharacter: builder.mutation<void, Pick<Character, 'id'> & Partial<Character>>({
			query: (charachter) => ({
				url: `characters/${charachter.id}`,
				method: 'PATCH',
				body: charachter
			}),
			async onQueryStarted({ id, ...patchData }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					characterSheetApi.util.updateQueryData('getCharacter', id, (originalCharacter) => {
						const newPatchData = {
							...patchData,
							copper: patchData.copper === 0 ? null : patchData.copper,
							silver: patchData.silver === 0 ? null : patchData.silver,
							gold: patchData.gold === 0 ? null : patchData.gold,
							platinum: patchData.platinum === 0 ? null : patchData.platinum
						};
						merge(originalCharacter, newPatchData);
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			}
		}),
		deleteCharacter: builder.mutation<void, number>({
			query: (id) => ({
				url: `characters/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (_result, _error, id) => [{ type: 'Characters', id }]
		}),
		addCharacterLevel: builder.mutation<CharacterLevel, CharacterLevel>({
			query: (characterLevel) => ({
				url: `characters/${characterLevel.characterId}/levels`,
				method: 'POST',
				body: characterLevel
			}),
			invalidatesTags: (result) => [{ type: 'Characters', id: result.characterId }]
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
		}),
		updateSkill: builder.mutation<Skill, Skill>({
			query: (skill) => ({
				url: `skills/${skill.id}`,
				method: 'PUT',
				body: skill
			}),
			invalidatesTags: (_result, _error, arg) => [{ type: 'Skills', id: arg.id }]
		}),
		deleteSkill: builder.mutation<void, number>({
			query: (id) => ({
				url: `skills/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'Skills', id: 'LIST' },
				{ type: 'Skills', id: arg }
			]
		}),
		getCharacterClasses: builder.query<CharacterClass[], void>({
			query: () => 'characterclasses',
			providesTags: (result) => providesList(result, 'CharacterClasses')
		}),
		getCharacterClass: builder.query<CharacterClass, number>({
			query: (id) => `characterclasses/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'CharacterClasses', id }]
		}),
		addCharacterClass: builder.mutation<CharacterClass, CharacterClass>({
			query: (characterClass) => ({
				url: 'characterclasses',
				method: 'POST',
				body: characterClass
			}),
			invalidatesTags: [{ type: 'CharacterClasses', id: 'LIST' }]
		}),
		updateCharacterClass: builder.mutation<CharacterClass, CharacterClass>({
			query: (characterClass) => ({
				url: `characterclasses/${characterClass.id}`,
				method: 'PUT',
				body: characterClass
			}),
			invalidatesTags: (_result, _error, arg) => [{ type: 'CharacterClasses', id: arg.id }]
		}),
		deleteCharacterClass: builder.mutation<void, number>({
			query: (id) => ({
				url: `characterclasses/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'CharacterClasses', id: 'LIST' },
				{ type: 'CharacterClasses', id: arg }
			]
		})
	})
});

export const {
	useGetCharactersQuery,
	useGetCharacterQuery,
	useAddCharacterMutation,
	useUpdateCharacterMutation,
	usePartialUpdateCharacterMutation,
	useDeleteCharacterMutation,
	useAddCharacterLevelMutation,
	useGetSkillsQuery,
	useGetSkillQuery,
	useAddSkillMutation,
	useUpdateSkillMutation,
	useDeleteSkillMutation,
	useGetCharacterClassesQuery,
	useGetCharacterClassQuery,
	useAddCharacterClassMutation,
	useUpdateCharacterClassMutation,
	useDeleteCharacterClassMutation
} = characterSheetApi;
