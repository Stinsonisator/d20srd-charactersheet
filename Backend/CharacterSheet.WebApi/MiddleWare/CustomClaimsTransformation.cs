using CharacterSheet.Business.Interfaces;
using CharacterSheet.Models.Security;
using Microsoft.AspNetCore.Authentication;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;


namespace CharacterSheet.WebApi.MiddleWare;

public class CustomClaimsTransformation : IClaimsTransformation
{
	private readonly IUserService _userService;

	public CustomClaimsTransformation(IUserService userService)
	{
		_userService = userService;
	}

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
		if (!principal.HasClaim(claim => claim.Type == ClaimTypes.NameIdentifier))
		{
			throw new InvalidDataException($"No {ClaimTypes.NameIdentifier} claim in principal.");
		}
        ClaimsIdentity claimsIdentity = new ClaimsIdentity();
        string claimType = "internalUserId";
        if (!principal.HasClaim(claim => claim.Type == claimType))
        {
			User user = await _userService.GetOrCreateUser(principal.FindFirstValue(ClaimTypes.NameIdentifier));
			claimsIdentity.AddClaim(new Claim(claimType, user.Id.ToString()));
        }

        principal.AddIdentity(claimsIdentity);
        return principal;
    }
}
