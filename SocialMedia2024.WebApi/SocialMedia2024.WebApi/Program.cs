using Alachisoft.NCache.Caching.Distributed;
using Microsoft.EntityFrameworkCore;
using NLog.Extensions.Logging;
using NLog.Web;
using ProtoBuf.Extended.Meta;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Core;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Middleware;
using SocialMedia2024.WebApi.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SocialMedia2024DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SocialMediaConnention")));

builder.Services.AddSingleton<IDistributedCacheService, DistributedCacheService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITLMenuService, TLMenuService>();
builder.Services.AddScoped<IErrorCodeService, ErrorCodeService>();

builder.Services.AddNCacheDistributedCache(options =>
{
    options.CacheName = "SocialMedia2024";
    options.ExceptionsEnabled = true;
    options.EnableLogs = true;
});

builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.ClearProviders();
    loggingBuilder.AddNLog();
    loggingBuilder.SetMinimumLevel(LogLevel.Trace);
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
