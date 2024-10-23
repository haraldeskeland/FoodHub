using Microsoft.EntityFrameworkCore;
using FoodHub.DAL;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;


var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ItemDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ItemDbContextConnection' not found.");

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ItemDbContext>(options => {
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:ItemDbContextConnection"]);
});

builder.Services.AddDefaultIdentity<IdentityUser>().AddEntityFrameworkStores<ItemDbContext>();

builder.Services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

builder.Services.AddScoped<IItemRepository, ItemRepository>();

builder.Services.AddRazorPages();
builder.Services.AddSession();

var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                            e.Level == LogEventLevel.Information &&
                            e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    DBInit.Seed(app);
}

app.UseStaticFiles();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.MapDefaultControllerRoute();
app.MapRazorPages();
app.Run();
