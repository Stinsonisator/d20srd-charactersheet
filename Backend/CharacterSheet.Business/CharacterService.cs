using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.DataAccess;
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
    
	public async Task<IEnumerable<Character>> GetCharactersByUserId(long userId)
	{
		return await _databaseContext.Characters
            .Include(c => c.CharacterClass)
            .Where(c => c.UserId == userId).ToListAsync();
	}
}