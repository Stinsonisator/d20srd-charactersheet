namespace CharacterSheet.Business.Interfaces;

public class PartialCharacter
{
	public long Id { get; set; }
    
    public int? LethalDamage { get; set; }
    
    public int? NonlethalDamage { get; set; }

	public int? Copper { get; set; }

	public int? Silver {get;set;}
    
    public int? Gold { get; set; }

    public int? Platinum { get; set; }
}
