using CharacterSheet.Models.Enums;
using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class AbilityConfiguration : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        builder.Property(s => s.KeyAbility).HasConversion(new EnumToStringConverter<Ability>());
    }
}