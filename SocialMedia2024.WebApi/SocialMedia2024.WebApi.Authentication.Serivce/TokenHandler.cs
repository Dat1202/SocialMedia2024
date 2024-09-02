using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Azure.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;

namespace SocialMedia2024.WebApi.Authentication.Service
{
    public class TokenHandler : ITokenHandler
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IUserTokenService _userTokenService;

        public TokenHandler(IConfiguration configuration, IUserService userService, IUserTokenService userTokenService)
        {
            _userService = userService;
            _configuration = configuration;
            _userTokenService = userTokenService;
        }

        public async Task<(string, DateTime)> CreateAccessToken(User user)
        {
            DateTime expiredToken = DateTime.Now.AddMinutes(15);

            var claims = new Claim[]
            {
                  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                  new Claim(JwtRegisteredClaimNames.Iss, _configuration["TokenBear:Issuer"]),
                  new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.DateTime),
                  new Claim(JwtRegisteredClaimNames.Aud, "SocialMedia"),
                  new Claim(JwtRegisteredClaimNames.Exp, expiredToken.ToString(), ClaimValueTypes.DateTime),
                  new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                  new Claim("Username", user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenBear:SignatureKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenInfo = new JwtSecurityToken
            (
                issuer: _configuration["TokenBear:Issuer"],
                audience: _configuration["TokenBear:Audience"],
                claims: claims,
                notBefore: DateTime.Now,
                expires: expiredToken,
                credentials
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenInfo);

            return await Task.FromResult((accessToken, expiredToken));
        }

        public async Task<(string, string, DateTime)> CreateRefreshToken(User user)
        {
            DateTime expiredToken = DateTime.Now.AddHours(3);
            string code = Guid.NewGuid().ToString();

            var claims = new Claim[]
            {
                  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                  new Claim(JwtRegisteredClaimNames.Iss, _configuration["TokenBear:Issuer"]),
                  new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.DateTime),
                  new Claim(JwtRegisteredClaimNames.Exp, expiredToken.ToString(), ClaimValueTypes.DateTime),
                  new Claim(ClaimTypes.SerialNumber, code, ClaimValueTypes.String),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenBear:SignatureKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenInfo = new JwtSecurityToken
            (
                issuer: _configuration["TokenBear:Issuer"],
                audience: _configuration["TokenBear:Audience"],
                claims: claims,
                notBefore: DateTime.Now,
                expires: expiredToken,
                credentials
            );

            var refreshToken = new JwtSecurityTokenHandler().WriteToken(tokenInfo);

            return await Task.FromResult((code,refreshToken, expiredToken));
        }

        public async Task ValidateToken(TokenValidatedContext context)
        {
            var claims = context.Principal.Claims.ToList();

            if (claims.Count == 0 )
            {
                context.Fail("this token contain no in4");
                return;
            }

            var identity = context.Principal.Identity as ClaimsIdentity;

            if (identity.FindFirst(JwtRegisteredClaimNames.Iss) == null)
            {
                context.Fail("this token contain no in4");
                return;
            }

            if (identity.FindFirst("Username") == null)
            {
                string username = identity.FindFirst("Username").Value;

                var  user = await _userService.FindByUsername(username);
                if (user == null) 
                {
                    context.Fail("this token is invalid for user");
                    return;
                }
            }

            if (identity.FindFirst(JwtRegisteredClaimNames.Exp) == null)
            {
                var dateEx = identity.FindFirst(JwtRegisteredClaimNames.Exp);
            }
        }

        public async Task<JwtVM> ValidateRefreshToken(string refreshToken)
        {
            var claimPriciple = new JwtSecurityTokenHandler().ValidateToken(refreshToken,
                new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenBearer:SignatureKey"])),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }
                , out _);

            if(claimPriciple == null) return new();

            string code = claimPriciple.Claims.FirstOrDefault(c => c.Type == ClaimTypes.SerialNumber)?.Value;
            
            if (string.IsNullOrEmpty(code)) return new();


            UserToken userToken = await _userTokenService.CheckRefreshToken(code);
            if (userToken != null) 
            { 
                User user = await _userService.FindById(userToken.UserId);

                (string newAccessToken, DateTime createDate) = await CreateAccessToken(user);
                (string codeRefreshToken, string newRefreshToken, DateTime newCreateDate) = await CreateRefreshToken(user);

                return new JwtVM
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    FullName = user.FirstName + " " + user.LastName,
                    Username = user.UserName
                };
            }

            return new();
        }
    }
}
