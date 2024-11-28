// Disclaimer:
// This file may contain similarities to the course demos created by Baifan Zhou, 
// as these were used as learning tools to understand the framework and project setup. 
// All credit for similar code goes to Baifan Zhou.
using Microsoft.EntityFrameworkCore;
using FoodHub.DAL;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Retrieve the connection string from the configuration
var connectionString = builder.Configuration.GetConnectionString("ItemDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ItemDbContextConnection' not found.");

// Add services to the container
builder.Services.AddControllersWithViews();

// Configure the DbContext to use SQLite with the connection string
builder.Services.AddDbContext<ItemDbContext>(options => {
    options.UseSqlite(builder.Configuration["ConnectionStrings:ItemDbContextConnection"]);
});

// Add default identity services and configure them to use the DbContext
builder.Services.AddDefaultIdentity<IdentityUser>().AddEntityFrameworkStores<ItemDbContext>();

// Add singleton service for IActionContextAccessor
builder.Services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

// Add scoped service for IItemRepository
builder.Services.AddScoped<IItemRepository, ItemRepository>();

// Add Razor Pages and session services
builder.Services.AddRazorPages();
builder.Services.AddSession();

// Configure Serilog for logging
var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

// Exclude specific log events from being logged
loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                            e.Level == LogEventLevel.Information &&
                            e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    DBInit.Seed(app); // Seed the database in development environment
}

app.UseStaticFiles();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.MapDefaultControllerRoute();
app.MapRazorPages();
app.Run();