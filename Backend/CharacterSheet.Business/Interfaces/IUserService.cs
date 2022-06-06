using System.Threading.Tasks;
using CharacterSheet.Models.Security;

namespace CharacterSheet.Business.Interfaces;

public interface IUserService
{
	Task<User> GetOrCreateUser(string userId);
}