using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;

namespace CharacterSheet.WebApi.MiddleWare;

public static class RedirectRequests
{
    public static void ToHttps(RewriteContext context)
    {
        HttpRequest request = context.HttpContext.Request;

        if (!request.Headers.TryGetValue("x-forwarded-proto", out StringValues forwardedProtocol) || forwardedProtocol != "http") return;
        StringBuilder newUrl = new StringBuilder()
            .Append("https://")
            .Append(new HostString(context.HttpContext.Request.Host.Host))
            .Append(request.PathBase)
            .Append(request.Path)
            .Append(request.QueryString);

        HttpResponse response = context.HttpContext.Response;
        response.StatusCode = StatusCodes.Status301MovedPermanently;
        context.Result = RuleResult.EndResponse;
        response.Headers[HeaderNames.Location] = newUrl.ToString();
    }
}