using System.Text.Json.Nodes;
using CharacterSheet.Models.Interfaces;

namespace CharacterSheet.Models.MasterData;

public class CharacterClassTrait : IEntity
{
    public long Id { get; set; }

    public long CharacterClassId { get; set; }

    public CharacterClass CharacterClass { get; set; }

    public string Name { get; set; }

    public int Level { get; set; }

    public JsonObject Rule { get; set; }
}