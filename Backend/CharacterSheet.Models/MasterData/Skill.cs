using System.Collections.Generic;
using CharacterSheet.Models.Enums;
using CharacterSheet.Models.Interfaces;

namespace CharacterSheet.Models.MasterData;

public class Skill : IEntity
{
    public long Id { get; set; }

    public string Name { get; set; }

	public Ability KeyAbility { get; set; }

    public bool Untrained { get; set; }

    public IEnumerable<SkillSynergy> OutgoingSkillSyngergies { get; set; }

    public IEnumerable<SkillSynergy> IncomingSkillSyngergies { get; set; }
}