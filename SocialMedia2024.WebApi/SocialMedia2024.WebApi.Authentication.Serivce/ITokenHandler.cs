using Microsoft.AspNetCore.Authentication.JwtBearer;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Authentication.Service
{
    public interface ITokenHandler
    {
        Task ValidateToken(TokenValidatedContext context);
        Task<(string, DateTime)> CreateAccessToken(User user);
        Task<(string, string, DateTime)> CreateRefreshToken(User user);
        Task<JwtVM> ValidateRefreshToken(string refreshToken);
    }
}