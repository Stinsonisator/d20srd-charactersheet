using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class CharacterClassSkillConfiguration : IEntityTypeConfiguration<CharacterClassSkill>
{
    public void Configure(EntityTypeBuilder<CharacterClassSkill> builder)
    {
        builder.ToTable("CharacterClassSkills");
        builder.HasKey(cs => new { cs.CharacterClassId, cs.SkillId });
    }
}