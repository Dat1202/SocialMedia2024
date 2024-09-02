using Alachisoft.NCache.Caching.Distributed;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using NLog.Extensions.Logging;
using NLog.Web;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Authentication.Service;
using SocialMedia2024.WebApi.Configuration;
using SocialMedia2024.WebApi.Core;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Middleware;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;
using System.Text;
using TokenHandler = SocialMedia2024.WebApi.Authentication.Service.TokenHandler;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SocialMedia2024DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SocialMediaConnention")));

builder.Services.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireDigit = true;
                }).
                AddEntityFrameworkStores<SocialMedia2024DbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddSingleton<IDistributedCacheService, DistributedCacheService>();
builder.Services.AddScoped<IDapperHelper, DapperHelper>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IErrorCodeService, ErrorCodeService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostActionService, PostActionService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IFriendService, FriendService>();
builder.Services.AddScoped<ITokenHandler, TokenHandler>();
builder.Services.AddScoped<IUserTokenService, UserTokenService>();
builder.Services.AddScoped<PasswordHasher<User>>();
builder.Services.AddScoped<PasswordValidator<User>>();

//token
var tokenBearConfig = builder.Configuration.GetSection("TokenBear");
var issuer = tokenBearConfig["Issuer"];
var audience = tokenBearConfig["Audience"];
var signatureKey = tokenBearConfig["SignatureKey"];

builder.Services.AddAutoMapper(typeof(AutoMapperConfig).Assembly);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidAudience = audience,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signatureKey))
        };
        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = context =>
            {
                var tokenHandler = context.HttpContext.RequestServices.GetRequiredService<ITokenHandler>();
                return tokenHandler.ValidateToken(context);
            },
            OnAuthenticationFailed = context =>
            {
                var result = JsonConvert.SerializeObject(new { message = "Authentication failed:", context.Exception.Message });
                return context.Response.WriteAsync(result);
            },
            OnChallenge = context =>
            {
                return Task.CompletedTask;
            },
            OnMessageReceived = context =>
            {
                return Task.CompletedTask;
            }
        };
    });

//cache
builder.Services.AddNCacheDistributedCache(options =>
{
    options.CacheName = "SocialMedia2024";
    options.ExceptionsEnabled = true;
    options.EnableLogs = true;
});

//log
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.ClearProviders();
    loggingBuilder.AddNLog();
    loggingBuilder.SetMinimumLevel(LogLevel.Trace);
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Sample.WebApiRestful",
        Version = "v1",
        Description = "This is Swagger WebAPI Restful"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Please input your token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
