using System.Collections.Generic;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.MasterData;

namespace CharacterSheet.Business.Interfaces;

public interface ISkillService
{

	Task<IEnumerable<Skill>> GetSkills();

	Task<Skill> Get(long id);

	Task Add(Skill character);

	Task Update(Skill character);

	Task Delete(long id);
}