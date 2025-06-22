using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Core.EmailHelper;
using SocialMedia2024.WebApi.Infrastructure.CommonService;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [AllowAnonymous]
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : HandleController
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly PasswordValidator<User> _passwordValidator;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IEmailHelper _emailHelper;
        private readonly IEmailTemplateReader _emailTemplateReader;
        private readonly IUserService _userService;

        public UserController(IUserService userService, IErrorCodeService errorService, IMapper mapper, 
                UserManager<User> userManager, PasswordHasher<User> passwordHasher, PasswordValidator<User> passwordValidator,
               IEmailHelper emailHelper, IEmailTemplateReader emailTemplateReader, ICloudinaryService cloudinaryService) 
            : base(errorService)
        {   
            _cloudinaryService = cloudinaryService;
            _emailHelper = emailHelper;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _userManager = userManager;
            _passwordValidator = passwordValidator;
            _emailTemplateReader = emailTemplateReader;
            _userService = userService;

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserVM userVM)
        {
            if(userVM == null)
            {
                return await ResponseError("Test");
            }

            var user = _mapper.Map<User>(userVM);

            //var validationPassword = await _passwordValidator.ValidateAsync(_userManager, user, userVM.Password);

            //if (!validationPassword.Succeeded) 
            //{
            //    return BadRequest(validationPassword.Errors);
            //}

            user.PasswordHash = _passwordHasher.HashPassword(user, userVM.Password);
            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded) 
            {
                string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                string url = Url.Action("ConfirmEmail", "User", new { userId = user.Id, tokenReset = token }, Request.Scheme);
                string body = await _emailTemplateReader.GetTemplate("Templates\\ConfirmEmail.html");
                body = string.Format(body, user.FirstName + " " + user.LastName, url);
                //await _emailHelper.SendMail(new Domain.SystemEntities.EmailRequest
                //{
                //    To = "dat120202@gmail.com",
                //    Subject = "Xác nhận đăng ký tài khoản",
                //    Content = body
                //});

                await _userManager.AddToRoleAsync(user, "User");
                return await ResponseSuccess(user, "CreateSuccesUser");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string tokenReset)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return BadRequest("1");
            }   
            
            if(user.EmailConfirmed)
            {
                return Ok("confirm");
            }

            var identytiResult = await _userManager.ConfirmEmailAsync(user, tokenReset);

            if (identytiResult.Succeeded)
            {
                return Ok("asdasd");
            }

            return BadRequest("failed");
        }

        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatarUser([FromForm] string userId, List<IFormFile> files)
        {
            if (files == null)
            {
                return BadRequest("No files provided or files are empty.");
            }

            var resultList = await _cloudinaryService.UploadImages(files);

            foreach (var result in resultList)
            {
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            foreach (var result in resultList)
            {
                await _userService.UpdateUserAvatar(userId, result.Url.ToString());
            }

            var urls = resultList.Select(r => r.Url.ToString()).ToList();
            return await ResponseSuccess(urls, "UploadAvatarSuccess");
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfileUser([FromQuery] string userId)
        {
            var user = await _userService.GetUserProfile(userId);
            return await ResponseSuccess(user, "");
        }
    } 
}
