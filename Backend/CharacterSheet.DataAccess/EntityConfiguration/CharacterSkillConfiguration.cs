using CharacterSheet.Models.CharacterData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class CharacterSkillConfiguration : IEntityTypeConfiguration<CharacterSkill>
{
    public void Configure(EntityTypeBuilder<CharacterSkill> builder)
    {
        builder.ToTable("CharacterSkills");
        builder.HasKey(cs => new { cs.CharacterId, cs.SkillId });
    }
}