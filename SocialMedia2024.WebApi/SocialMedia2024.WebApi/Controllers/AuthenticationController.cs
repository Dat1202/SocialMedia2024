﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Authentication.Service;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.ViewModel;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using System.Security.Claims;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;

namespace SocialMedia2024.WebApi.Controllers
{
    [AllowAnonymous]
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthenticationController : HandleController
    {
        private readonly IUserService _userService;
        private readonly ITokenHandler _tokenHandler;

        public AuthenticationController(IErrorCodeService errorService, IMapper mapper, IUserService userService, ITokenHandler tokenHandler) : base(errorService)
        {
            _userService = userService;
            _tokenHandler = tokenHandler;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM loginVM)
        {
            if(loginVM.Username.IsNullOrEmpty())
            {
                return await ResponseError("InvalidUsername");
            }
            if (loginVM.Password.IsNullOrEmpty())
            {
                return await ResponseError("InvalidPassword");
            }

            var user = await _userService.ValidateUser(loginVM.Username, loginVM.Password);

            if (user == null) 
            { 
                return await ResponseError("IncorrectUser");
            }

            //if (!user.EmailConfirmed)
            //{
            //    return BadRequest("asdwad");
            //}

            (string accessToken, DateTime expiredDateAccessToken) = await _tokenHandler.CreateAccessToken(user);
            (string code, string refreshToken, DateTime expiredDateRefreshToken) = await _tokenHandler.CreateRefreshToken(user);
            var token = new JwtVM
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                FullName = user.FirstName + " " + user.LastName,
                Username = user.UserName,
                AccessTokenExpiredDate = expiredDateAccessToken.ToString("dd-mm-yyyy hh:mm:ss")
            };
            return await ResponseSuccess(token, "LoginSuccess");
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenVM token)
        {
            if (token == null) return BadRequest("token is null");
            return await ResponseSuccess(await _tokenHandler.ValidateRefreshToken(token.RefreshToken), "RefreshToken");
        }

        [Authorize]
        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst("UserId")?.Value;
            var currentUser = await _userService.GetUserById(userId);
            return Ok(currentUser);
        }
    }
}
