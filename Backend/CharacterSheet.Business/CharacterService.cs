using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.DataAccess;
using CharacterSheet.DataAccess.Extensions;
using CharacterSheet.Models.CharacterData;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.Business;

public class CharacterService : ICharacterService
{
    private readonly DatabaseContext _databaseContext;

	public CharacterService(DatabaseContext databaseContext)
	{
		_databaseContext = databaseContext;
	}

	public async Task Add(Character character)
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
	}

	public async Task Delete(long id)
	{
		Character character = await _databaseContext.Characters.FindAsync(id).ConfigureAwait(false);
        if (character == null)
        {
			throw new ArgumentNullException("entity");
		}

        _databaseContext.Characters.Remove(character);
        await _databaseContext.SaveChangesAsync();
	}

	public async Task<Character> Get(long id)
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

	public async Task<IEnumerable<Character>> GetCharactersByUserId(long userId)
	{
		return await _databaseContext.Characters
            .Include(c => c.CharacterClass)
            .Where(c => c.UserId == userId).ToListAsync().ConfigureAwait(false);
	}

	public async Task<bool> IsAllowed(long id, long userId)
	{
		return await _databaseContext.Characters.AnyAsync(c => c.Id == id && c.UserId == userId);
	}

	public async Task Update(Character character)
	{        
        _databaseContext.Entry(character).State = EntityState.Modified;
		await _databaseContext.SyncWithDatabase(character, c => c.Skills, s => s.SkillId, true).ConfigureAwait(false);
		await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
	}

	public async Task Update(PartialCharacter partialCharacter)
	{
		Character character = new()
        {
            Id = partialCharacter.Id
        };
        _databaseContext.Attach(character);
        
        foreach (PropertyInfo propertyInfo in partialCharacter.GetType().GetProperties().Where(p => p.Name != "Id" && p.GetValue(partialCharacter) != null))
        {
            PropertyInfo characterPropInfo = character.GetType().GetProperties().FirstOrDefault(p => p.Name == propertyInfo.Name);
            if (characterPropInfo == null) continue;
            
            Type nonNullableType = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
            var value = propertyInfo.GetValue(partialCharacter, null);
            var safeValue = value == null ? null : Convert.ChangeType(value, nonNullableType);
            characterPropInfo.SetValue(character, safeValue, null);
            _databaseContext.Entry(character).Property(propertyInfo.Name).IsModified = true;
        }
        
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
	}
}