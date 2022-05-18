namespace CharacterSheet.Models.MasterData;

public class CharacterClassSkill
{
    public long CharacterClassId { get; set; }

    public CharacterClass CharacterClass { get; set; }

    public long SkillId { get; set; }

    public Skill Skill { get; set; }
}