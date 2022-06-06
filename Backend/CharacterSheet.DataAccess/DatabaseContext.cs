using System;
using System.Reflection;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.MasterData;
using CharacterSheet.Models.Security;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.DataAccess;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    
    public DbSet<Skill> Skills { get; set; }

    public DbSet<CharacterClass> CharacterClasses { get; set; }

    public DbSet<Character> Characters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
