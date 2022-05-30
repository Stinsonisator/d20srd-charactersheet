using CharacterSheet.Models.Interfaces;

namespace CharacterSheet.WebApi.Models;

public class CharacterPatchModel : IEntity
{
    public long Id { get; set; }
    
    public int? LethalDamage { get; set; }
    
    public int? NonlethalDamage { get; set; }
}
