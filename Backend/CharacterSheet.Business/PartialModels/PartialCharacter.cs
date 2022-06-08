namespace CharacterSheet.Business.Interfaces;

public class PartialCharacter
{
	public long Id { get; set; }
    
    public int? LethalDamage { get; set; }
    
    public int? NonlethalDamage { get; set; }
}
