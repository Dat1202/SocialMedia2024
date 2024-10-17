using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Azure.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Middleware;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;

namespace SocialMedia2024.WebApi.Authentication.Service
{
    public class TokenHandler : ITokenHandler
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;

        public TokenHandler(IConfiguration configuration, IUserService userService, UserManager<User> userManager)
        {
            _userService = userService;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<(string, DateTime)> CreateAccessToken(User user)
        {
            DateTime expiredToken = DateTime.Now.AddHours(24);
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new Claim[]
            {
                  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                  new Claim(JwtRegisteredClaimNames.Iss, _configuration["TokenBear:Issuer"]),
                  new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                  new Claim(JwtRegisteredClaimNames.Aud, "SocialMedia"),
                  new Claim(JwtRegisteredClaimNames.Exp, expiredToken.ToString(), ClaimValueTypes.Integer64),
                  new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                  //new Claim("Email", user.Email, ClaimValueTypes.String),
                  new Claim("Username", user.UserName, ClaimValueTypes.String),
                  new Claim("UserId", user.Id, ClaimValueTypes.String),

            }.Union(roles.Select(x => new Claim(ClaimTypes.Role,x)));

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
            await _userManager.SetAuthenticationTokenAsync(user, "AccessTokenProvider", "AccessToken", accessToken);

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
                  new Claim("Username", user.UserName, ClaimValueTypes.String)
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
            await _userManager.SetAuthenticationTokenAsync(user, "RefreshTokenProvider", "RefreshToken", refreshToken);

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

            //if (identity.FindFirst("Username") == null)
            //{
            //    string username = identity.FindFirst("Username").Value;

            //    var  user = await _userService.FindByUsername(username);
            //    if (user == null) 
            //    {
            //        context.Fail("this token is invalid for user");
            //        return;
            //    }
            //}

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
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenBear:SignatureKey"])),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }
                , out _);

            if(claimPriciple == null) return new();

            string username = claimPriciple?.Claims?.FirstOrDefault(c => c.Type == "Username")?.Value;
            
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }
            var token = await _userManager.GetAuthenticationTokenAsync(user, "AccessTokenProvider", "AccessToken");
            if (string.IsNullOrEmpty(token))
            {
                throw new Exception("Access token not found for the user.");
            }
            if (!string.IsNullOrEmpty(token))
            {
                (string newAccessToken, DateTime createDate) = await CreateAccessToken(user);
                (string codeRefreshToken, string newRefreshToken, DateTime newCreateDate) = await CreateRefreshToken(user);

                return new JwtVM
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    FullName = user.FirstName + " " + user.LastName,
                    Username = user.UserName,
                    AccessTokenExpiredDate = createDate.ToString("dd-mm-yyyy hh:mm:ss")
                };
            }
            return new();
        }
    }
}
