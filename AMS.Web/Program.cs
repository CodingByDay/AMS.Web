using AMS.Web;
using AMS.Web.Interfaces;
using AMS.Web.Services;
using DevExpress.AspNetCore;
using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardWeb;
using Microsoft.Extensions.FileProviders;
using System.Reflection.PortableExecutable;
using WebApi.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();

IFileProvider? fileProvider = builder.Environment.ContentRootFileProvider;
IConfiguration? configuration = builder.Configuration;




builder.Services.AddRouting(options => options.LowercaseUrls = true);
// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddTransient<IBufferedFileUploadService, BufferedFileUploadLocalService>();

builder.Services.AddHostedService<RemoveExportService>();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});

builder.WebHost.UseSentry();


var app = builder.Build();





app.UseSentryTracing();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseRouting();
app.UseSession();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}");

app.Run();



