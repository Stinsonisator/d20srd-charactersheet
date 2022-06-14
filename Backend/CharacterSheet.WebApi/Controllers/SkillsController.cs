using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CharacterSheet.DataAccess;
using CharacterSheet.Models.MasterData;
using CharacterSheet.WebApi.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.WebApi.Controllers;

public class SkillsController : WebApiControllerBase
{
	private readonly DatabaseContext _databaseContext;

	public SkillsController(DatabaseContext databaseContext)
	{
		_databaseContext = databaseContext;
	}

	[HttpGet]
	public async Task<IEnumerable<Skill>> Get()
	{
		return await _databaseContext.Skills.ToListAsync().ConfigureAwait(false);
	}

	[HttpGet("{id:long}")]
	public async Task<Skill> Get([FromRoute] long id)
	{
		return await _databaseContext.Skills
			.FirstOrDefaultAsync(c => c.Id == id)
			.ConfigureAwait(false);
	}

	[HttpPost]
	public async Task<Skill> Post([FromBody] Skill skill)
	{
		_databaseContext.Entry(skill).State = EntityState.Added;
		await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
		return skill;
	}

	[HttpPut("{id:long}")]
	public async Task<Skill> Put([FromRoute] long id, [FromBody] Skill skill)
	{
		_databaseContext.Entry(skill).State = EntityState.Modified;
		await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
		return skill;
	}

	[HttpDelete("{id:long}")]
	public async Task<IActionResult> Delete([FromRoute] long id)
	{
		Skill character = await _databaseContext.Skills.FindAsync(id);
		if (character == null)
		{
			return NotFound();
		}

		_databaseContext.Skills.Remove(character);
		await _databaseContext.SaveChangesAsync();

		return Ok();
	}
}