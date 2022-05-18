using System.Collections.Generic;
using System.Threading.Tasks;
using CharacterSheet.DataAccess;
using CharacterSheet.Models.MasterData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharacterClassesController : ControllerBase
{
    private readonly DatabaseContext _databaseContext;

    public CharacterClassesController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    [HttpGet]
    public async Task<IEnumerable<CharacterClass>> Get()
    {
        return await _databaseContext.CharacterClasses.ToListAsync().ConfigureAwait(false);
    }

    [HttpGet("{id:long}")]
    public async Task<CharacterClass> Get([FromRoute] long id)
    {
        return await _databaseContext.CharacterClasses
            .Include(cc => cc.ClassSkills)
            .ThenInclude(ccs => ccs.Skill)
            .FirstOrDefaultAsync(c => c.Id == id)
            .ConfigureAwait(false);
    }

    [HttpPost]
    public async Task<CharacterClass> Post([FromBody] CharacterClass characterClass)
    {
        _databaseContext.Entry(characterClass).State = EntityState.Added;
        foreach (CharacterClassSkill classSkills in characterClass.ClassSkills)
        {
            _databaseContext.Entry(classSkills).State = EntityState.Added;
        }
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return characterClass;
    }

    [HttpPut("{id:long}")]
    public async Task<CharacterClass> Put([FromRoute] long id, [FromBody] CharacterClass characterClass)
    {
        _databaseContext.Entry(characterClass).State = EntityState.Modified;
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return characterClass;
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        CharacterClass character = await _databaseContext.CharacterClasses.FindAsync(id);
        if (character == null)
        {
            return NotFound();
        }

        _databaseContext.CharacterClasses.Remove(character);
        await _databaseContext.SaveChangesAsync();

        return Ok();
    }
}