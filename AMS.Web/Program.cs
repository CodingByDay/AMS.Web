using AMS.Web;
using AMS.Web.Interfaces;
using AMS.Web.Services;
using WebApi.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();



builder.Services.AddRouting(options => options.LowercaseUrls = true);
// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddTransient<IBufferedFileUploadService, BufferedFileUploadLocalService>();



builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});





var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseRouting();
app.UseSession();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Homepage}/{id?}");

app.Run();



