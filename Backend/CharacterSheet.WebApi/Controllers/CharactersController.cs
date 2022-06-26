using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.WebApi.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.WebApi.MiddleWare;
using CharacterSheet.DataAccess;

namespace CharacterSheet.WebApi.Controllers;

[ServiceFilter(typeof(IsUserOwner), Order = int.MaxValue)]
public class CharactersController : WebApiControllerBase
{
	private readonly ICharacterService _characterService;
	private readonly DatabaseContext _databaseContext;

	public CharactersController(ICharacterService characterService, DatabaseContext databaseContext)
	{
		_characterService = characterService;
		_databaseContext = databaseContext;
	}

	[HttpGet]
	public async Task<IEnumerable<Character>> Get()
	{
		return await _characterService.GetCharacters().ConfigureAwait(false);
	}

	[HttpGet("{id:long}")]
	public async Task<Character> Get([FromRoute] long id)
	{
		return await _characterService.Get(id).ConfigureAwait(false);
	}

	[HttpPost]
	public async Task<Character> Post([FromBody] Character character)
	{
		long userId = long.Parse(User.Claims.First(c => c.Type == "internalUserId").Value);
		character.UserId = userId;
		await _characterService.Add(character).ConfigureAwait(false);
		return character;
	}

	[HttpPut("{id:long}")]
	public async Task<Character> Put([FromRoute] long id, [FromBody] Character character)
	{
		await _characterService.Update(character).ConfigureAwait(false);

		return character;
	}

	[HttpPatch("{id:long}")]
	public async Task<PartialCharacter> Patch([FromRoute] long id, [FromBody] PartialCharacter character)
	{
		await _characterService.Update(character).ConfigureAwait(false);

		return character;
	}

	[HttpDelete("{id:long}")]
	public async Task<IActionResult> Delete([FromRoute] long id)
	{
		try
		{
			await _characterService.Delete(id).ConfigureAwait(false);
		}
		catch (ArgumentNullException ex)
		{
			if (ex.ParamName == "entity")
			{
				return NotFound();
			}

			throw;
		}

		return Ok();
	}

	[HttpPost("{id:long}/levels")]
	public async Task<CharacterLevel> Levelup([FromBody] CharacterLevel characterLevel)
	{
		_databaseContext.Add(characterLevel);
		await _databaseContext.SaveChangesAsync();
		return characterLevel;
	}
}