using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using CharacterSheet.DataAccess;
using CharacterSheet.Models.Security;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.Business;

public class UserService : IUserService
{
	private readonly DatabaseContext _databaseContext;

	public UserService(DatabaseContext databaseContext)
	{
		_databaseContext = databaseContext;
	}

	public async Task<User> GetOrCreateUser(string userId) 
	{
		User user = await _databaseContext.Users.SingleOrDefaultAsync(u => u.UserId == userId);

		if (user == null)
		{
			user = new User
			{
				UserId = userId
			};

			_databaseContext.Users.Add(user);
			await _databaseContext.SaveChangesAsync();
		}
		
		return user;
	}
}
