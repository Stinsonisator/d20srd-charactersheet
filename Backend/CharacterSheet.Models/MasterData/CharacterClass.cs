using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CharacterSheet.Models.MasterData;

public class CharacterClass
{
    public long Id { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Name { get; set; }
    
    public IEnumerable<CharacterClassSkill> ClassSkills { get; set; }
}