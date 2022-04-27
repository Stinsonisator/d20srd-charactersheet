using CharacterSheet.Models.Enums;

namespace CharacterSheet.Models.CharacterData
{
    public class CharacterLevel
    {
        public long Id { get; set; }

        public long CharacterId { get; set; }

        public Character Character { get; set; }
        
        public int Hp { get; set; }
    }
}