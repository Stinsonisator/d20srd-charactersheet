using CharacterSheet.Models.Enums;

namespace CharacterSheet.Models.MasterData;

public class Skill
{
    public long Id { get; set; }

    public string Name { get; set; }

	public Ability KeyAbility { get; set; }

    public bool Untrained { get; set; }
}