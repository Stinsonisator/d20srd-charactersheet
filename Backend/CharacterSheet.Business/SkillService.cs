using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.DataAccess;
using CharacterSheet.DataAccess.Extensions;
using CharacterSheet.Models.MasterData;
using Microsoft.EntityFrameworkCore;

namespace SkillSheet.Business;

public class SkillService : ISkillService
{
	private readonly DatabaseContext _databaseContext;

	public SkillService(DatabaseContext databaseContext)
	{
		_databaseContext = databaseContext;
	}

	public async Task Add(Skill skill)
	{
		_databaseContext.Entry(skill).State = EntityState.Added;
		foreach (SkillSynergy skillSynergy in skill.OutgoingSkillSyngergies)
		{
			_databaseContext.Entry(skill).State = EntityState.Added;
		}
		await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
	}

	public async Task Delete(long id)
	{
		Skill skill = await _databaseContext.Skills.FindAsync(id).ConfigureAwait(false);
		if (skill == null)
		{
			throw new ArgumentNullException("entity");
		}

		_databaseContext.Skills.Remove(skill);
		await _databaseContext.SaveChangesAsync();
	}

	public async Task<Skill> Get(long id)
	{
		return await _databaseContext.Skills
			.Include(c => c.OutgoingSkillSyngergies)
			.ThenInclude(cc => cc.DestinationSkill)
			.FirstOrDefaultAsync(c => c.Id == id)
			.ConfigureAwait(false);
	}

	public async Task<IEnumerable<Skill>> GetSkills()
	{
		return await _databaseContext.Skills
			.Include(c => c.IncomingSkillSyngergies)
			.ThenInclude(s => s.SourceSkill)
			.ToListAsync().ConfigureAwait(false);
	}

	public async Task Update(Skill skill)
	{
		_databaseContext.Entry(skill).State = EntityState.Modified;
		await _databaseContext.SyncWithDatabase(skill, c => c.OutgoingSkillSyngergies, s => s.DestinationSkillId, true).ConfigureAwait(false);
		await _databaseContext.SaveChangesAsync().ConfigureAwait(false);
	}
}