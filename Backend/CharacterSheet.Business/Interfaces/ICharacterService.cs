using System.Collections.Generic;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;

namespace CharacterSheet.Business.Interfaces
{
    public interface ICharacterService
    {
        Task<IEnumerable<Character>> GetCharactersByUserId(long userId);

		Task<Character> Get(long id);

		Task Add(Character character);

		Task Update(Character character);

		Task Update(PartialCharacter partialCharacter);
        
		Task Delete(long id);
	}
}