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
// ...
builder.Services.AddScoped<DashboardConfigurator>((IServiceProvider serviceProvider) => {
    DashboardConfigurator configurator = new DashboardConfigurator();
    configurator.SetDashboardStorage(new DashboardFileStorage(fileProvider.GetFileInfo("").PhysicalPath));
    configurator.SetConnectionStringsProvider(new DashboardConnectionStringsProvider(configuration));
    return configurator;
});
builder.Services.AddDevExpressControls();



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

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}


app.UseDevExpressControls();
app.MapDashboardRoute("home/dashboard", "DefaultDashboard");
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



