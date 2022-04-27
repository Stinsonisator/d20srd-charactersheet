using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class CharacterLevelConfiguration : IEntityTypeConfiguration<CharacterLevel>
{
    public void Configure(EntityTypeBuilder<CharacterLevel> builder)
    {
        builder.ToTable("CharacterLevels");
    }
}