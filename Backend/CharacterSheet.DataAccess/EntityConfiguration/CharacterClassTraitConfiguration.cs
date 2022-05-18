using System.Text.Json;
using System.Text.Json.Nodes;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CharacterSheet.DataAccess.EntityConfiguration;


public class CharacterClassTraitConfiguration : IEntityTypeConfiguration<CharacterClassTrait>
{
    public void Configure(EntityTypeBuilder<CharacterClassTrait> builder)
    {
        builder.ToTable("CharacterClassTraits");
        builder.Property(cct => cct.Rule).HasColumnType("jsonb");
    }
}