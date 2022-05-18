﻿// <auto-generated />
using System.Text.Json.Nodes;
using CharacterSheet.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20220518200639_CharacterClassTraits")]
    partial class CharacterClassTraits
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.Character", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<short>("Age")
                        .HasColumnType("smallint");

                    b.Property<long>("CharacterClassId")
                        .HasColumnType("bigint");

                    b.Property<short>("Charisma")
                        .HasColumnType("smallint");

                    b.Property<short>("Constitution")
                        .HasColumnType("smallint");

                    b.Property<short>("Dexterity")
                        .HasColumnType("smallint");

                    b.Property<int>("Gender")
                        .HasColumnType("integer");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<short>("Intelligence")
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Race")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<short>("Strength")
                        .HasColumnType("smallint");

                    b.Property<short>("Wisdom")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("CharacterClassId");

                    b.ToTable("Characters");
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.CharacterLevel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("CharacterId")
                        .HasColumnType("bigint");

                    b.Property<int>("Hp")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CharacterId");

                    b.ToTable("CharacterLevels", (string)null);
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.CharacterSkill", b =>
                {
                    b.Property<long>("CharacterId")
                        .HasColumnType("bigint");

                    b.Property<long>("SkillId")
                        .HasColumnType("bigint");

                    b.Property<bool>("CountAsClassSkill")
                        .HasColumnType("boolean");

                    b.Property<short>("Points")
                        .HasColumnType("smallint");

                    b.HasKey("CharacterId", "SkillId");

                    b.HasIndex("SkillId");

                    b.ToTable("CharacterSkills", (string)null);
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClass", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StartingHp")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("CharacterClasses");
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClassSkill", b =>
                {
                    b.Property<long>("CharacterClassId")
                        .HasColumnType("bigint");

                    b.Property<long>("SkillId")
                        .HasColumnType("bigint");

                    b.HasKey("CharacterClassId", "SkillId");

                    b.HasIndex("SkillId");

                    b.ToTable("CharacterClassSkills", (string)null);
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClassTrait", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("CharacterClassId")
                        .HasColumnType("bigint");

                    b.Property<int>("Level")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<JsonObject>("Rule")
                        .HasColumnType("jsonb");

                    b.HasKey("Id");

                    b.HasIndex("CharacterClassId");

                    b.ToTable("CharacterClassTraits", (string)null);
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.Skill", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("KeyAbility")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<bool>("Untrained")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.Character", b =>
                {
                    b.HasOne("CharacterSheet.Models.MasterData.CharacterClass", "CharacterClass")
                        .WithMany()
                        .HasForeignKey("CharacterClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("CharacterSheet.Models.CharacterData.CreatureSize", "Size", b1 =>
                        {
                            b1.Property<long>("CharacterId")
                                .HasColumnType("bigint");

                            b1.Property<short>("Feet")
                                .HasColumnType("smallint");

                            b1.Property<float>("Inch")
                                .HasColumnType("real");

                            b1.HasKey("CharacterId");

                            b1.ToTable("Characters");

                            b1.WithOwner()
                                .HasForeignKey("CharacterId");
                        });

                    b.Navigation("CharacterClass");

                    b.Navigation("Size");
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.CharacterLevel", b =>
                {
                    b.HasOne("CharacterSheet.Models.CharacterData.Character", "Character")
                        .WithMany("Levels")
                        .HasForeignKey("CharacterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Character");
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.CharacterSkill", b =>
                {
                    b.HasOne("CharacterSheet.Models.CharacterData.Character", "Character")
                        .WithMany("Skills")
                        .HasForeignKey("CharacterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CharacterSheet.Models.MasterData.Skill", "Skill")
                        .WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Character");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClassSkill", b =>
                {
                    b.HasOne("CharacterSheet.Models.MasterData.CharacterClass", "CharacterClass")
                        .WithMany("ClassSkills")
                        .HasForeignKey("CharacterClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CharacterSheet.Models.MasterData.Skill", "Skill")
                        .WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CharacterClass");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClassTrait", b =>
                {
                    b.HasOne("CharacterSheet.Models.MasterData.CharacterClass", "CharacterClass")
                        .WithMany("Traits")
                        .HasForeignKey("CharacterClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CharacterClass");
                });

            modelBuilder.Entity("CharacterSheet.Models.CharacterData.Character", b =>
                {
                    b.Navigation("Levels");

                    b.Navigation("Skills");
                });

            modelBuilder.Entity("CharacterSheet.Models.MasterData.CharacterClass", b =>
                {
                    b.Navigation("ClassSkills");

                    b.Navigation("Traits");
                });
#pragma warning restore 612, 618
        }
    }
}
