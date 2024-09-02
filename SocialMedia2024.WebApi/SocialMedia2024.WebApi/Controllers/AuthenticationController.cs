using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Authentication.Service;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.ViewModel;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenHandler _tokenHandler;
        private readonly IUserTokenService _userTokenService;

        public AuthenticationController(IUserService userService, IUserTokenService userTokenService, ITokenHandler tokenHandler)
        {
            _userService = userService;
            _tokenHandler = tokenHandler;
            _userTokenService = userTokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginVM loginVM)
        {
            var user = await _userService.CheckLogin(loginVM.UserName, loginVM.Password);

            if (user == null) 
            { 
                return Unauthorized();
            }

            (string accessToken, DateTime expiredDateAccessToken) = await _tokenHandler.CreateAccessToken(user);
            (string code, string refreshToken, DateTime expiredDateRefreshToken) = await _tokenHandler.CreateRefreshToken(user);

            await _userTokenService.SaveToken(new Domain.SystemEntities.UserToken
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiredDateAccessToken = expiredDateAccessToken,
                ExpiredDateRefreshToken = expiredDateRefreshToken,
                UserId = user.Id,
                CodeRefreshToken = code

            });
            
            return Ok(new JwtVM
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                FullName = user.FirstName + " " + user.LastName,    
                Username = user.UserName
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenVM token)
        {
            if (token == null) return BadRequest("token is null");
            return Ok(_tokenHandler.ValidateRefreshToken(token.RefreshToken));
        }

    }
}
