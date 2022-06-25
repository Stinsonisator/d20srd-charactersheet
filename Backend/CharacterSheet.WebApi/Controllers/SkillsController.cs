using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.DataAccess;
using CharacterSheet.Models.MasterData;
using CharacterSheet.WebApi.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.WebApi.Controllers;

public class SkillsController : WebApiControllerBase
{
	private readonly ISkillService _skillService;

	public SkillsController(ISkillService skillService)
	{
		_skillService = skillService;
	}

	[HttpGet]
	public async Task<IEnumerable<Skill>> Get()
	{
		return await _skillService.GetSkills().ConfigureAwait(false);
	}

	[HttpGet("{id:long}")]
	public async Task<Skill> Get([FromRoute] long id)
	{
		return await _skillService.Get(id).ConfigureAwait(false);
	}

	[HttpPost]
	public async Task<Skill> Post([FromBody] Skill skill)
	{
		await _skillService.Add(skill).ConfigureAwait(false);
		return skill;
	}

	[HttpPut("{id:long}")]
	public async Task<Skill> Put([FromRoute] long id, [FromBody] Skill skill)
	{
		await _skillService.Update(skill).ConfigureAwait(false);
		return skill;
	}

	[HttpDelete("{id:long}")]
	public async Task<IActionResult> Delete([FromRoute] long id)
	{
		try
		{
			await _skillService.Delete(id).ConfigureAwait(false);

		}
		catch (ArgumentNullException ex)
		{
			if (ex.ParamName == "entity")
			{
				return NotFound();
			}

			throw;
		}

		return Ok();
	}
}