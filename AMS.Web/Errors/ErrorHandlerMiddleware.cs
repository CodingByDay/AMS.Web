namespace WebApi.Helpers;
using System.Net;
using System.Text.Json;
public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    public ErrorHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            context.Response.Redirect($"/error/resolve?error={error?.Message}");     
        }
    }
}