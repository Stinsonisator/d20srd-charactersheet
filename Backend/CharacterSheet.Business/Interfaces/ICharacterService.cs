using System.Collections.Generic;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;

namespace CharacterSheet.Business.Interfaces
{
    public interface ICharacterService
    {
        Task<IEnumerable<Character>> GetCharactersByUserId(long userId);
    }
}