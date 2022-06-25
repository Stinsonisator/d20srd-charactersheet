using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class SkillSynergyConfiguration : IEntityTypeConfiguration<SkillSynergy>
{
    public void Configure(EntityTypeBuilder<SkillSynergy> builder)
    {
        builder.ToTable("SkillSynergies");
        builder.HasKey(cs => new { cs.SourceSkillId, cs.DestinationSkillId });
		builder.HasOne(s => s.SourceSkill).WithMany(s => s.OutgoingSkillSyngergies);
		builder.HasOne(s => s.DestinationSkill).WithMany(s => s.IncomingSkillSyngergies);
	}
}