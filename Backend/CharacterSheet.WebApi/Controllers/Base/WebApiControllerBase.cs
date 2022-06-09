using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CharacterSheet.WebApi.Controllers.Base;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public abstract class WebApiControllerBase : ControllerBase
{
}