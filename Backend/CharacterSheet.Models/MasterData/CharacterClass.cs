using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CharacterSheet.Models.Interfaces;

namespace CharacterSheet.Models.MasterData;

public class CharacterClass : IEntity
{
    public long Id { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Name { get; set; }
    
    public int StartingHp { get; set; }
    
    public IEnumerable<CharacterClassSkill> ClassSkills { get; set; }
    
    public  IEnumerable<CharacterClassTrait> Traits { get; set; }
}