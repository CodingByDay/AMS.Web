namespace WebApi.Helpers;
using System.Net;
using System.Text.Json;
public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlerMiddleware> _logger; 

    public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
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
            _logger.LogError("Error: " + error?.Message + DateTime.Now);
            response.ContentType = "application/json";
            context.Response.Redirect($"/error/resolve?error={error?.Message}");     
        }
    }
}