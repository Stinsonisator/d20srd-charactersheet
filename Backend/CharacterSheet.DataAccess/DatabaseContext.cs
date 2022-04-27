using System;
using System.Reflection;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.DataAccess;

public class DatabaseContext : DbContext
{
    private string _dbPath;

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
        Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
        string path = Environment.GetFolderPath(folder);
        _dbPath = "charactersheet.db";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={_dbPath}");

    public DbSet<Skill> Skills { get; set; }

    public DbSet<Character> Characters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
