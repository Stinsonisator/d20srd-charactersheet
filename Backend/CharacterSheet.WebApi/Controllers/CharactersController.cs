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

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CharactersController : ControllerBase
{
    private readonly DatabaseContext _databaseContext;

	private readonly ICharacterService _characterService;

	public CharactersController(DatabaseContext databaseContext, ICharacterService characterService)
    {
        _databaseContext = databaseContext;
		_characterService = characterService;
	}

    [HttpGet]
    public async Task<IEnumerable<Character>> Get()
    {
        return await _characterService.GetCharactersByUserId(long.Parse(User.Claims.First(c => c.Type == "internalUserId").Value)).ConfigureAwait(false);
    }

    [HttpGet("{id:long}")]
    public async Task<Character> Get([FromRoute] long id)
    {
        return await _databaseContext.Characters
            .Include(c => c.CharacterClass)
            .ThenInclude(cc => cc.Traits)
            .Include(c => c.CharacterClass)
            .ThenInclude(cc => cc.ClassSkills)
            .Include(c => c.Skills)
            .ThenInclude(c => c.Skill)
            .Include(c => c.Levels)
            .FirstOrDefaultAsync(c => c.Id == id)
            .ConfigureAwait(false);
    }

    [HttpPost]
    public async Task<Character> Post([FromBody] Character character)
    {
        _databaseContext.Entry(character).State = EntityState.Added;
        _databaseContext.Entry(character.Size).State = EntityState.Added;
        foreach (CharacterSkill skill in character.Skills)
        {
            _databaseContext.Entry(skill).State = EntityState.Added;
        }
        foreach (CharacterLevel level in character.Levels)
        {
            _databaseContext.Entry(level).State = EntityState.Added;
        }
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return character;
    }

    [HttpPut("{id:long}")]
    public async Task<Character> Put([FromRoute] long id, [FromBody] Character character)
    {
        if (character.Skills != null)
        {
            _databaseContext.ChangeTracker.AutoDetectChangesEnabled = false;
            List<CharacterSkill> currentItems = await _databaseContext.Set<CharacterSkill>()
                .AsNoTracking()
                .Where(cs => cs.CharacterId == character.Id)
                .ToListAsync().ConfigureAwait(false);

            IEnumerable<CharacterSkill> newItemsList = character.Skills.ToList();
            foreach (CharacterSkill entity in currentItems.ExceptCustom(newItemsList, e => e.SkillId))
            {
                _databaseContext.Entry(entity).State = EntityState.Deleted;
            }

            foreach (CharacterSkill entity in newItemsList.ExceptCustom(currentItems, e => e.SkillId))
            {
                _databaseContext.Entry(entity).State = EntityState.Added;
            }

            foreach (CharacterSkill entity in newItemsList.Where(e => _databaseContext.Entry(e).State == EntityState.Detached))
            {
                _databaseContext.Entry(entity).State = EntityState.Modified;
            }

            _databaseContext.ChangeTracker.DetectChanges();
            _databaseContext.ChangeTracker.AutoDetectChangesEnabled = true;
        }
        
        _databaseContext.Entry(character).State = EntityState.Modified;
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return character;
    }

    [HttpPatch("{id:long}")]
    public async Task<CharacterPatchModel> Patch([FromRoute] long id, [FromBody] CharacterPatchModel characterPatchModel)
    {
        Character character = new()
        {
            Id = id
        };
        _databaseContext.Attach(character);
        
        foreach (PropertyInfo propertyInfo in characterPatchModel.GetType().GetProperties().Where(p => p.Name != "Id" && p.GetValue(characterPatchModel) != null))
        {
            PropertyInfo characterPropInfo = character.GetType().GetProperties().FirstOrDefault(p => p.Name == propertyInfo.Name);
            if (characterPropInfo == null) continue;
            
            Type nonNullableType = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
            var value = propertyInfo.GetValue(characterPatchModel, null);
            var safeValue = value == null ? null : Convert.ChangeType(value, nonNullableType);
            characterPropInfo.SetValue(character, safeValue, null);
            _databaseContext.Entry(character).Property(propertyInfo.Name).IsModified = true;
        }
        
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return characterPatchModel;
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        Character character = await _databaseContext.Characters.FindAsync(id);
        if (character == null)
        {
            return NotFound();
        }

        _databaseContext.Characters.Remove(character);
        await _databaseContext.SaveChangesAsync();

        return Ok();
    }
}