using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly PasswordValidator<User> _passwordValidator;

        public UserController(UserManager<User> userManager, IMapper mapper, 
            PasswordHasher<User> passwordHasher, PasswordValidator<User> passwordValidator) 
        {
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _userManager = userManager;
            _passwordValidator = passwordValidator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserVM userVM)
        {
            if(userVM == null)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userVM);

            var validationPassword = await _passwordValidator.ValidateAsync(_userManager, user, userVM.Password);

            if (!validationPassword.Succeeded) 
            {
                return BadRequest(validationPassword.Errors);
            }

            user.PasswordHash = _passwordHasher.HashPassword(user, userVM.Password);
            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded) 
            { 
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Errors);
            }

        }
    }
}
