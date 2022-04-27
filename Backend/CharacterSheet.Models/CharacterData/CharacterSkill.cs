using CharacterSheet.Models.MasterData;

namespace CharacterSheet.Models.CharacterData;

public class CharacterSkill
{
    public long CharacterId { get; set; }

    public Character Character { get; set; }

    public long SkillId { get; set; }

    public Skill Skill { get; set; }

    public short Points { get; set; }

    public bool CountAsClassSkill { get; set; }
}
