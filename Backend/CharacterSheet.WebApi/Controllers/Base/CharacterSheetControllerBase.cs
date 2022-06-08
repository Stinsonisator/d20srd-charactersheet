using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CharacterSheet.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public abstract class CharacterSheetControllerBase : ControllerBase
{
}