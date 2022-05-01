using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class CharacterConfiguration : IEntityTypeConfiguration<Character>
{
    public void Configure(EntityTypeBuilder<Character> builder)
    {
        builder.Property(c => c.CharacterClass).HasConversion(new EnumToStringConverter<CharacterClass>());
        builder.OwnsOne(c => c.Size);
    }
}