using System.Linq;
using System.Threading.Tasks;
using CharacterSheet.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CharacterSheet.WebApi.MiddleWare;

public class IsUserOwner : IAsyncActionFilter
{
	private readonly ICharacterService _characterService;

	public IsUserOwner(ICharacterService characterService)
	{
		_characterService = characterService;
	}

	public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
	{
		bool executeNext = true;
		if (context.ActionArguments.ContainsKey("id") && context.ActionArguments["id"] is long id)
		{
			long userId = long.Parse(context.HttpContext.User.Claims.First(c => c.Type == "internalUserId").Value);
			executeNext = await _characterService.IsAllowed(id, userId);

			if (!executeNext)
			{
				context.Result = new ForbidResult();
			}
		}
		if (executeNext)
		{
			await next();
		}
	}
}
