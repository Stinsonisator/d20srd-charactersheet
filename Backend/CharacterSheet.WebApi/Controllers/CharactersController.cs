using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.DataAccess;
using CharacterSheet.DataAccess.Extensions;
using CharacterSheet.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CharacterSheet.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace CharacterSheet.WebApi.Controllers;

public class CharactersController : CharacterSheetControllerBase
{
	private readonly ICharacterService _characterService;

	public CharactersController(ICharacterService characterService)
    {
		_characterService = characterService;
	}

    [HttpGet]
    public async Task<IEnumerable<Character>> Get()
    {
		long userId = long.Parse(User.Claims.First(c => c.Type == "internalUserId").Value);
		return await _characterService.GetCharactersByUserId(userId).ConfigureAwait(false);
    }

    [HttpGet("{id:long}")]
    public async Task<Character> Get([FromRoute] long id)
    {
		return await _characterService.Get(id).ConfigureAwait(false);
	}

    [HttpPost]
    public async Task<Character> Post([FromBody] Character character)
    {
		await _characterService.Add(character).ConfigureAwait(false);
		return character;
    }

    [HttpPut("{id:long}")]
    public async Task<Character> Put([FromRoute] long id, [FromBody] Character character)
    {
		await _characterService.Update(character);
        
        return character;
    }

    [HttpPatch("{id:long}")]
    public async Task<PartialCharacter> Patch([FromRoute] long id, [FromBody] PartialCharacter characterPatchModel)
    {
		await _characterService.Update(characterPatchModel);

		return characterPatchModel;
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
}