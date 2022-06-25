namespace CharacterSheet.Models.MasterData;

public class SkillSynergy
{
	public long SourceSkillId { get; set; }

	public Skill SourceSkill { get; set; }

	public long DestinationSkillId { get; set; }

	public Skill DestinationSkill { get; set; }

	public bool IsConditional { get; set; }
	
	public string ConditionDescription { get; set; }
}