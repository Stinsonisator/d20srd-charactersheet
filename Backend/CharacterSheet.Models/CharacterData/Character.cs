using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CharacterSheet.Models.Enums;
using CharacterSheet.Models.MasterData;
using CharacterSheet.Models.Security;

namespace CharacterSheet.Models.CharacterData;

public class Character
{
    public long Id { get; set; }

    public long? UserId { get; set; }

    public User user { get; set; }

	[Required(AllowEmptyStrings = false)]
    public string Name { get; set; }
    
    public short Age { get; set; }
    
    public Gender Gender { get; set; }
    
    public Race Race { get; set; }

    public CreatureSize Size { get; set; }
    
    public string Image { get; set; }
    
    public long CharacterClassId { get; set; }
    
    public CharacterClass CharacterClass { get; set; }
    
    public short Strength { get; set; }

    public short Dexterity { get; set; }

    public short Constitution { get; set; }

    public short Intelligence { get; set; }

    public short Wisdom { get; set; }

    public short Charisma { get; set; }
    
    public int LethalDamage { get; set; }
    
    public int NonlethalDamage { get; set; }

	public IEnumerable<CharacterSkill> Skills { get; set; }

    public IEnumerable<CharacterLevel> Levels { get; set; }
}