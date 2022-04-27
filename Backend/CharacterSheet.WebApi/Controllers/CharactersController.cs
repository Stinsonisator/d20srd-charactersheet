using System.Collections.Generic;
using System.Threading.Tasks;
using CharacterSheet.Models.CharacterData;
using CharacterSheet.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CharactersController : ControllerBase
{
    private readonly DatabaseContext _databaseContext;

    public CharactersController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    [HttpGet]
    public async Task<IEnumerable<Character>> Get()
    {
        return await _databaseContext.Characters.ToListAsync().ConfigureAwait(false);
    }

    [HttpGet("{id}")]
    public async Task<Character> Get([FromRoute] long id)
    {
        return await _databaseContext.Characters
            .Include(c => c.Skills)
                .ThenInclude(c => c.Skill)
            .Include(c => c.Levels)
            .FirstOrDefaultAsync(c => c.Id == id)
            .ConfigureAwait(false);
    }

    [HttpPost]
    public async Task<Character> Post([FromBody] Character character)
    {
        _databaseContext.Entry(character).State = EntityState.Added;
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return character;
    }

    [HttpPut("{id}")]
    public async Task<Character> Put([FromRoute] long id, [FromBody] Character character)
    {
        _databaseContext.Entry(character).State = EntityState.Modified;
        await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
        return character;
    }
}
